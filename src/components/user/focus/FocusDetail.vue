<template>
  <div>
    <el-empty v-if="this.isEmpty" style="margin: 0;background: white;height: 700px" description="网络开小差了呢~~~"></el-empty>
    <div v-else>

      <div class="div-focus-user-list-box">

        <div class="div-focus-user-box-left">
          <el-button :disabled="isAvailablePage(-1) ? false : true"
                     v-on:click="getNextPageData(-1)" type="info" plain>
            <i class="el-icon-arrow-left"></i>
          </el-button>
        </div>

        <div v-if="!focusUserInfoList.length" style="width: 100%">
          <br><br>
          <p align="center">您还没有关注过的用户</p>
        </div>

        <div v-else class="div-focus-user-list">

          <div v-for="(item, index) in focusUserInfoList" :key="index">

            <div :class="item.focus_uid == currentSelectId ? 'div-focus-user-item-select' : 'div-focus-user-item'"
                 v-on:click="loadFocusUserResourceHandler(item.focus_uid)">

              <div class="div-focus-user-headIcon">
                <img :src="item.focusUserIcon" alt="">
              </div>

              <div align="center">
                {{item.focusUserName}}
              </div>

            </div>

          </div>

        </div>

        <div class="div-focus-user-box-right">
          <el-button :disabled="isAvailablePage(1) ? false : true"
                     v-on:click="getNextPageData(1)" type="info" plain>
            <i class="el-icon-arrow-right"></i>
          </el-button>
        </div>

      </div>

      <div class="blog-post">
        <div class="bg-img" style="margin-top: -200px">
          <img src="static/img/blog-post-bg.png" alt="">
        </div>
        <div class="container">

          <div class="row">

            <div style="margin-top: 20px" class="col-xl-6 col-lg-6 col-md-6"
                 v-for="(item, index) in resourceInfoList">
              <div class="single-blog">
                <div class="part-text">
                  <div class="user-img">
                    <img v-if="item.userInfo.headIcon" :src="item.userInfo.headIcon" alt="">
                    <img v-else src="static/ico/none.png" alt="">
                  </div>
                  <h3><a v-on:click="goResourceDetail(item.resource.id)">{{item.resource.origin_name}}</a></h3>
                  <h4>
                    <span><i class="el-icon-s-custom"></i>&nbsp;&nbsp;&nbsp;{{item.userInfo.username}} </span>
                  </h4>
                  <h4>
                    <span>隶属：{{item.resource.discipline}}</span>
                  </h4>
                  <h4>
                    <span>上传于：{{item.resource.upload_time}}</span>
                  </h4>
                  <div class="div_resource_description">
                    <!--                  {{item.resource.description.length > 35 ? item.resource.description.slice(0, 35) + '...' :-->
                    <!--                  item.resource.description}}sdfasfd sdf asdf s-->
                    {{item.resource.description}}
                  </div>
                </div>
                <div class="part-social">
                  <a v-on:click="resourceSupportHandler(item.resource.id)">
                    <span><i class="fas fa-thumbs-up"></i></span> {{item.resource.supportNumber}}
                  </a>
                  <a href="#"><span><i class="fas fa-star"></i></span>{{item.resource.favorite_number}}</a>
                  <a href="#"><span><i class="fas fa-cloud-download-alt"></i></span>{{item.resource.downloads}}次</a>
                  <a
                    :href="`http://localhost:8080/resource/download/${item.resource.disk_name}/${item.resource.id}/${item.resource.discipline}`"><span><i
                    class="fas fa-download"></i></span>下载</a>
                  <a v-on:click="goResourceDetail(item.resource.id)"> More</a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      <div align="center">
        <el-pagination background
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :page-size="resourcePageData.pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="resourcePageData.total">
        </el-pagination>
      </div>
      <br>

    </div>
  </div>
</template>

<script>
  export default {
    name: "FocusDetail",
    data() {
      return {
        isEmpty: false,
        focusUserInfoList: [],
        myPageData: {
          user_id: '',
          currentPage: 1,
          pageSize: 5,
          total: -1,
        },
        currentSelectId: '',
        resourceInfoList: [],
        resourcePageData: {
          user_id: '',
          currentPage: 1,
          pageSize: 10,
          total: -1,
        },

      }
    },
    created() {
      // 获取用户登录信息
      this.getLoginUserInfoByRouter();

      // 获取用户关注内容列表
      this.getUserFocusList();
    },
    methods: {
      // 获取关注列表
      getUserFocusList() {
        let out_this = this;
        this.$axios.post('/focus/getInfo', this.myPageData).then(response => {
          let resData = response.data;
          console.log(resData);

          // 请求成功
          if (resData.code == 6006) {
            out_this.focusUserInfoList = resData.data.pageList;
            out_this.myPageData.currentPage = resData.data.currentPage;
            out_this.myPageData.total = resData.data.total;
            out_this.focusUserInfoList = resData.data.pageList;

            if (!out_this.currentSelectId) {
              out_this.currentSelectId = out_this.focusUserInfoList[0].focus_uid;
              out_this.loadFocusUserResource(out_this.currentSelectId);
            }

          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }

        });
      },
      // 获取登录信息
      getLoginUserInfoByRouter() {
        let userId = this.$cookies.get('user_id');
        if (userId) {
          this.myPageData.user_id = userId;
          return userId;
        } else {
          this.$message.info('您还没有登录喔，请先登录再查看~~~');
          this.$router.push('/login');
          return false;
        }
      },
      // 获取下一页数据，dx：当前页的偏移量 +1、-1
      getNextPageData(dx) {
        // 修改当前页，通过增量dx
        this.myPageData.currentPage += dx;

        // 获取翻页的关注列表内容
        this.getUserFocusList();

      },
      // 判断是否还可以翻页, dx偏移量：1后翻页，-1前翻页
      isAvailablePage(dx) {
        let temp = this.myPageData.total / this.myPageData.pageSize;
        let len = Math.ceil(temp);
        let page = this.myPageData.currentPage + dx;
        if (page >= 1 && page <= len)
          return true;
        else
          return false;
      },
      //  加载用户资源处理函数
      loadFocusUserResourceHandler(focus_id) {
        this.resourcePageData.total = -1;
        this.resourcePageData.currentPage = -1;
        this.loadFocusUserResource(focus_id)
      },
      // 加载关注用户的资源
      loadFocusUserResource(focusUid) {
        console.log(focusUid);
        this.currentSelectId = focusUid;
        this.resourcePageData.user_id = focusUid;

        let out_this = this;
        this.$axios.post('/resource/server/getList', this.resourcePageData).then(response => {
          let resData = response.data;
          console.log(resData);

          if (resData.code == 6007) {

            out_this.resourcePageData.currentPage = resData.data.currentPage;
            out_this.resourcePageData.total = resData.data.total;
            out_this.resourcePageData.pageSize = resData.data.pageSize;
            out_this.resourceInfoList = resData.data.pageList;

          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }

        });

      },
      goResourceDetail(id) {
        this.$cookies.set('resource_id', id);
        this.$router.push('/detail');
      },
      // 每页的大小改变事件
      handleSizeChange(val) {
        this.resourcePageData.pageSize = val;
        this.loadFocusUserResource(this.currentSelectId);
      },
      // 翻页事件
      handleCurrentChange(val) {
        this.resourcePageData.currentPage = val;
        this.loadFocusUserResource(this.currentSelectId);
      },

      // 资源点赞处理函数
      resourceSupportHandler(resourceId) {
        // 获取登录信息
        let userId = this.getLoginUserInfoByRouter();
        if (!userId)
          return;

        let out_this = this;
        this.$axios.get(`/support/resource/${userId}/${resourceId}`).then(response => {
          let resData = response.data;
          console.log(resData);

          if (resData.code == 6051) {
            out_this.$message({
              message: resData.code + '~~~~' + resData.message,
              type: 'success',
              duration: 2000
            });
            // 点赞成功，将资源的点赞数+1
            out_this.setResourceSupportNumber(resourceId, 1);
          } else if (resData.code == 6052) {
            out_this.$message({
              message: resData.code + '~~~~' + resData.message,
              type: 'success',
              duration: 2000
            });
            // 取消成功，将资源的点赞数-1
            out_this.setResourceSupportNumber(resourceId, -1);
          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }

        });
      },

      // 给资源的点赞数量加上一个增量
      setResourceSupportNumber(resource_id, dx) {
        for (let i = 0; i < this.resourceInfoList.length; ++i) {
          if (this.resourceInfoList[i].resource.id == resource_id) {
            this.resourceInfoList[i].resource.supportNumber += dx;
            return;
          }
        }
      },

    }
  }
</script>

<style scoped>

  .div-focus-user-list-box {
    width: 80%;
    margin: 20px auto;
    position: relative;
    height: 140px;
    background: #E9EEF3;
  }

  .div-focus-user-list-box > div {
    display: inline-block;
    position: absolute;
  }

  .div-focus-user-list-box > div > .el-button {
    height: 100%;
    width: 100%;
  }

  .div-focus-user-list-box i {
    font-weight: bolder;
    font-size: 30px;
    margin-left: -15px;
  }

  .div-focus-user-box-left {
    vertical-align: middle;
    font-size: 30px;
    height: 100%;
    width: 4%;
    position: absolute;
  }

  .div-focus-user-box-right {
    right: 0px;
    width: 4%;
    height: 100%;
  }

  .div-focus-user-list {
    width: 92%;
    margin: 0px auto;
    left: 5%;
    height: 100%;
  }

  .div-focus-user-list > div {
    display: inline-block;
    margin: 0px auto;
    width: 20%;
    padding: 0px 10px;
    height: 100%;

  }

  .div-focus-user-item {
    margin: 0px 0px;
    height: 100%;
    cursor: pointer;
  }

  .div-focus-user-item-select {
    margin: 0px 0px;
    height: 100%;
    cursor: pointer;
    color: lightskyblue;
  }

  .div-focus-user-headIcon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin: 5px auto;
  }

</style>
