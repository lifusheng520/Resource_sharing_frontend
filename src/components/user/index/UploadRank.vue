<template>
  <div>
    <!-- 排行 begin-->
    <div class="transaction">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-8">
            <div class="section-title text-center">
              <h2>全场资源贡献最佳 <span> MVP</span> 排行</h2>
              <p>优秀不值一提，你必须达到完美！这是属于你的show time，
                你的表现将惊艳全场。旁人说你的表现真的show啊，
                你永远不知道你是真的show，还是真的二，哈哈哈哈~~~~</p>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-xl-12 col-lg-12">
            <div class="transaction-area">

              <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="deposit" role="tabpanel" aria-labelledby="home-tab">

                  <table class="table">

                    <thead align="center">

                    <tr>
                      <th scope="col">TOP</th>
                      <th scope="col">用户</th>
                      <th scope="col">贡献资源</th>
                      <th scope="col"></th>
                    </tr>

                    </thead>
                    <tbody>

                    <tr v-for="(item, index) in rankList" align="center">
                      <td>{{index + 1}}</td>
                      <th scope="row" class="d-flex">
                        <div class="user-img">
                          <img v-if="item.headIcon" :src="item.headIcon" alt="">
                          <img v-else src="static/ico/none.png" alt="">
                        </div>
                        <span>{{item.username}}</span>
                      </th>
                      <td>{{item.resourceNumbers}}</td>
                      <td>
                        <el-button v-on:click="focusEvent(item.user_id)"
                                   :type="isFocus(item.user_id) ? 'danger' : 'info'"
                                   round>
                          <i class="el-icon-plus"></i> 关注
                        </el-button>
                      </td>
                    </tr>

                    </tbody>
                  </table>

                </div>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!-- 排行 end -->

  </div>
</template>

<script>
  export default {
    name: "UploadRank",
    data() {
      return {
        rankList: [],
        // 用户已关注列表
        focusIdList: [],
        focusForm: {
          userId: '',
          focusUserId: '',
        },
      }
    },
    created() {
      let out_this = this;
      this.$axios.get('/rank/upload').then(res => {
        let resData = res.data;
        console.log(resData);
        if (resData.code == 4025)
          out_this.rankList = resData.data;
      });

      let userId = this.$cookies.get('user_id');
      if (userId) {
        this.getUserFocusInfoList(userId);
      }

    },
    methods: {
      // 关注按钮的触发事件
      focusEvent(focusUid) {
        // 检查登录信息
        let hasLogin = this.getUserLoginInfo();
        if (!hasLogin)
          return;

        // 判断是否是自己
        if (this.focusForm.userId == focusUid) {
          this.$message.warning('不能自己关注自己喔~~~');
          return;
        }

        // 判断是否已经关注过了，如果已经关注过了则取消关注
        if (this.isFocus(focusUid)) {
          // 已经关注过了，则取消关注
          this.deleteFocus(focusUid);
        } else {
          // 否则没添加过关注，则去添加关注请求
          this.addFocus(focusUid);
        }

      },
      deleteFocus(focusUid) {
        this.focusForm.focusUserId = focusUid;
        // 发起取消关注请求
        let out_this = this;
        this.$axios.post('/focus/cancel', this.focusForm).then(response => {
          let resData = response.data;
          console.log(resData);

          if (resData.code == 6004) {
            out_this.$message({
              message: resData.code + '~~~~' + resData.message,
              type: 'success',
              duration: 2000
            });

            // 删除已关注列表中的对应信息
            out_this.deleteFocusListItem(resData.data);
          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }

        });
      },
      // 添加关注
      addFocus(focusUid) {
        // 添加关注的id
        this.focusForm.focusUserId = focusUid;
        // 发起关注用户请求
        let out_this = this;
        this.$axios.post('/focus/add', this.focusForm).then(response => {
          let resData = response.data;
          console.log(resData);

          if (resData.code == 6001) {
            out_this.$message({
              message: resData.code + '~~~~' + resData.message,
              type: 'success',
              duration: 2000
            });
            //  将关注成功的id加入用户关注的列表
            out_this.focusIdList.push(resData.data.focus_uid);
          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }
        });

      },
      // 获取登录信息
      getUserLoginInfo() {
        let userId = this.$cookies.get("user_id");
        if (userId) {
          this.focusForm.userId = userId;
          return true;
        } else {
          this.$message.info('您还没有登录~~~');
          this.$router.push('/login');
          return false;
        }
      },
      // 获取用户的关注信息
      getUserFocusInfoList(user_id) {
        let out_this = this;
        this.$axios.get(`/focus/getList/${user_id}`).then(response => {
          let resData = response.data;
          console.log(resData);

          if (resData.code === 6003) {
            out_this.setFocusIdList(resData.data);
          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }
        });

      },
      // 设置用户的关注列表
      setFocusIdList(valueList) {
        console.log(valueList);
        for (let i = 0; i < valueList.length; ++i) {
          this.focusIdList.push(valueList[i].focus_uid);
        }
      },
      // 判断是否已经关注
      isFocus(id) {
        for (let i = 0; i < this.focusIdList.length; ++i) {
          if (this.focusIdList[i] == id) {
            return true;
          }
        }
        return false;
      },
      // 将id从已关注列表中删除
      deleteFocusListItem(id) {
        for (let i = 0; i < this.focusIdList.length; ++i) {
          if (this.focusIdList[i] == id) {
            this.focusIdList.splice(i, 1);
            return;
          }
        }
      }

    }
  }
</script>

<style scoped>


</style>
