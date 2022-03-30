<template>
  <div>

    <!-- page-title 页面标题开始-->
    <div class="page-title">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-8">
            <div class="page-title-content">
              <h1>{{UserAndResource.resource.origin_name}}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- page-title 页面标题结束 -->

    <el-empty v-if="this.isEmpty" style="margin: 0;background: white;height: 700px" description="网络开小差了呢~~~"></el-empty>

    <div v-else>

      <!-- 资源详情 begin-->
      <div class="blog-post single-blog-post">
        <div class="bg-img">
          <img src="static/img/blog-post-bg.png" alt="">
        </div>

        <div class="container">
          <div class="row">

            <div class="col-xl-12 col-lg-12">
              <div class="single-blog blog-details">

                <div class="part-text">

                  <div class="user-img">
                    <img v-if="UserAndResource.userInfo.headIcon"
                         :src="UserAndResource.userInfo.headIcon" alt="">
                    <img v-else src="static/ico/headIcon.png" alt="">
                  </div>

                  <div id="div-focus-button">
                    <el-button v-on:click="focusHandler(UserAndResource.resource.user_id)" icon="el-icon-plus"
                               :type="isFocus(UserAndResource.resource.user_id) ? 'danger' : 'info'" round> 关 注
                    </el-button>
                  </div>

                  <h3><a href="#">{{UserAndResource.resource.origin_name}}</a></h3>
                  <h4>
                    <span class="admin"><i class="el-icon-s-custom"></i>用户：{{UserAndResource.userInfo.username}}</span>
                  </h4>
                  <h4>
                    <span class="category">隶属：{{UserAndResource.resource.discipline}}</span>
                  </h4>
                  <h4>
                    <span class="date">上传于：{{UserAndResource.resource.upload_time}}</span>
                  </h4>
                  <p>资料介绍: <br>
                    {{UserAndResource.resource.description}}
                  </p>
                </div>

                <div class="part-social">
                  <a href="#"><span><i class="fas fa-download"></i></span> {{UserAndResource.resource.downloads}}次</a>
                  <a href="#"><span><i class="fas fa-heart"></i></span> {{UserAndResource.resource.favorite_number}}</a>
                  <a
                    :href="`http://localhost:8080/resource/download/${UserAndResource.resource.disk_name}/${UserAndResource.resource.id}/${UserAndResource.resource.discipline}`"><span><i
                    class="fas fa-cloud-download-alt"></i> 下载</span></a>
                  <a v-on:click="visible = !visible"><span><i class="fas fa-share"></i></span> 分享</a>
                  <a hidden></a>
                </div>

                <el-popover placement="right" title="下载URL：" width="100%"
                            v-model="visible" trigger="click">
                  <p>
                    {{`http://localhost:8080/resource/download/${UserAndResource.resource.disk_name}/${UserAndResource.resource.id}/${UserAndResource.resource.discipline}`}}</p>
                  <div>
                    <el-button type="primary" size="mini"
                               @click="copyURL(`http://localhost:8080/resource/download/${UserAndResource.resource.disk_name}/${UserAndResource.resource.id}/${UserAndResource.resource.discipline}`)">
                      复制URL
                    </el-button>
                    <el-button size="mini" type="primary" @click="visible = false">取消</el-button>
                  </div>
                </el-popover>

              </div>

              <div class="div-comment-input">

                <div class="div-comment-input-icon">
                  <img v-if="UserAndResource.userInfo.headIcon"
                       :src="UserAndResource.userInfo.headIcon" alt="">
                  <img v-else src="static/ico/headIcon.png" alt="">
                </div>

                <div class="div-comment-input-content" v-if="commentInfo.user_id">
                  <el-input type="textarea"
                            :autosize="{ minRows: 5, maxRows: 5}"
                            placeholder="蹭蹭热度也要注意你的言辞喔"
                            v-model="commentInfo.content">
                  </el-input>
                </div>

                <div v-else class="div-comment-input-login">
                  <p>请先
                    <el-button v-on:click="goLogin" size="mini" type="primary" plain>登录</el-button>
                    再发表评论
                  </p>
                </div>

                <div class="div-comment-input-button">
                  <el-button v-on:click="addComment" type="info" plain>发布评论</el-button>
                </div>

              </div>

              <!--              评论区-->
              <div class="div-comment-outer">

                <div class="div-comment-header">
                  <div>评论列表</div>
                </div>

                <div class="div-comment-item">

                  <div class="infinite-list-wrapper div-comment-content-box" style="overflow:auto">

                    <ul class="list" v-infinite-scroll="loadComment" infinite-scroll-disabled="disabled">
                      <li v-for="(item, index) in commentContentList">

                        <div class="div-comment-content-inline">

                          <div class="div-comment-content-icon">
                            <img v-if="commentContentList[index].headIcon" :src="commentContentList[index].headIcon"
                                 alt="">
                            <img v-else src="static/ico/ico.png">
                          </div>

                          <div style="width: 90%">
                            <div class="div-comment-content-head">

                              <div>
                                <div class="div-comment-content-name">{{commentContentList[index].name}}</div>
                                <div class="div-comment-content-time">{{commentContentList[index].time}}</div>
                              </div>
                              <div class="div-comment-content-support">
                                <p>
                                  <i class="fas fa-thumbs-up"></i>{{commentContentList[index].support_number}}
                                </p>
                              </div>

                            </div>

                            <div class="div-comment-content">
                              <span v-if="commentContentList[index].to_name">回复</span>
                              <span id="comment-to-name-span" v-if="commentContentList[index].to_name">{{'@' + commentContentList[index].to_name}}</span>
                              <span v-if="commentContentList[index].to_name">:</span>
                              {{commentContentList[index].content}}
                            </div>

                            <div align="right">
                              <el-popover @hide="replyHideEvent" placement="left"
                                          :title="'回复：' + commentContentList[index].name" width="400"
                                          trigger="click">
                                <el-input type="textarea" placeholder="请输入内容" autosize
                                          v-model="replyContent" maxlength="200"
                                          show-word-limit>
                                </el-input>
                                <p align="right">
                                  <el-button v-on:click="replyComment(commentContentList[index].user_id)"
                                             icon="el-icon-s-promotion"
                                             size="medium"
                                             type="primary" plain>发送
                                  </el-button>
                                </p>

                                <el-button size="mini" type="primary" slot="reference"
                                           plain>回复
                                </el-button>
                              </el-popover>
                            </div>

                          </div>

                        </div>

                        <el-divider content-position="left"></el-divider>

                      </li>
                    </ul>
                    <br>
                    <p v-if="loading">加载中...</p>
                    <p v-if="noMore">没有更多了</p>
                    <el-empty v-if="commentContentList.length == 0" description="还没人发现这个地方，快来占个楼吧~~~"></el-empty>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <!-- 资源详情 end -->

    </div>

  </div>
</template>

<script>
  export default {
    name: "ResourceDetail",
    data() {
      return {
        isEmpty: false,
        UserAndResource: {
          resource: '',
          userInfo: ''
        },
        visible: false,
        commentInfo: {
          resource_id: '',
          user_id: '',
          to_id: '',
          content: '',
        },
        replyContent: '',
        commentContentList: [],
        count: 0,
        loading: false,
        // 关注列表
        focusList: [],
        // 关注表单
        focusForm: {
          user_id: '',
          focusUserId: '',
        }

      }
    },
    created() {
      let resourceId = this.$cookies.get('resource_id');
      if (!resourceId) {
        this.isEmpty = true;
        return;
      }

      this.commentInfo.resource_id = resourceId;
      this.getLoginInfo();
      this.getResourceDetailInfo();
      this.getCommentContentList();

      this.getUserFocusInfoList(this.focusForm.user_id);

    },
    computed: {
      noMore() {
        return this.count <= this.commentContentList.length;
      },
      disabled() {
        return this.loading || this.noMore
      }
    },
    methods: {
      // 关注按钮的触发事件
      focusHandler(focusUid) {
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
      // 判断是否已经关注
      isFocus(id) {
        console.log(this.focusList);
        for (let i = 0; i < this.focusList.length; ++i) {
          if (this.focusList[i] == id) {
            return true;
          }
        }
        return false;
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
            out_this.focusList.push(resData.data.focus_uid);
          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }
        });

      },
      // 将id从已关注列表中删除
      deleteFocusListItem(id) {
        for (let i = 0; i < this.focusList.length; ++i) {
          if (this.focusList[i] == id) {
            this.focusList.splice(i, 1);
            return;
          }
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
        for (let i = 0; i < valueList.length; ++i) {
          this.focusList.push(valueList[i].focus_uid);
        }
      },
      // 获取登录信息
      getUserLoginInfo() {
        let userId = this.$cookies.get('user_id');
        if (userId) {
          this.focusForm.userId = userId;
          return true;
        } else {
          this.$message.info('您还没有登录~~~');
          this.$router.push('/login');
          return false;
        }
      },


      loadComment() {
        this.loading = true;
        setTimeout(() => {
          this.count++;
          this.loading = false;
        }, 1000)

      },
      copyURL(content) {
        let aux = document.createElement("input");
        aux.setAttribute("value", content);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
        this.$message({
          message: '复制成功',
          type: 'success',
          duration: 1500
        });
      },
      getLoginInfo() {
        let userId = this.$cookies.get('user_id');
        if (userId) {
          this.commentInfo.user_id = userId;
          this.focusForm.user_id = userId;
        } else {
          this.$message.info('你还没有登录喔~~~');
          this.goLogin();
        }

      },
      getResourceDetailInfo() {
        let out_this = this;
        this.$axios.get(`/resource/server/detail/${this.commentInfo.resource_id}`).then(res => {
          let resData = res.data;
          console.log(resData);

          if (resData.code === 4028) {
            out_this.UserAndResource.resource = resData.data.resource;
            out_this.UserAndResource.userInfo = resData.data.userInfo;
          }
        });

      },
      getCommentContentList() {
        let out_this = this;
        this.$axios.get(`/comment/load/${this.commentInfo.resource_id}`).then(response => {
          let resData = response.data;
          console.log(resData);

          if (resData.code === 5004) {
            out_this.commentContentList = resData.data;
          } else {
            this.$message.error(resData.code + '~~~~' + resData.message);
          }

        });

      },
      addComment() {
        let temp = this.commentInfo.content.replace(/\s*/g, '');
        if (!temp) {
          this.$message.info('请先输入你的评论再发布哟~~~');
          return;
        }
        this.commentInfo.content = temp;

        this.sendComment();

      },
      replyComment(to) {
        if (to) {
          let tempReply = this.replyContent.replace(/\s*/g, '');
          if (!tempReply) {
            this.$message.info('请先输入回复内容再发布哟~~~');
            return;
          }
          this.replyContent = tempReply;
          this.commentInfo.content = this.replyContent;
        }

        this.sendComment(to);

      },
      sendComment(to) {
        this.getLoginInfo();
        if (!this.commentInfo.user_id) {
          this.$message.info('请先登录再发布你的评论哟~~~');
          return;
        }
        this.commentInfo.to_id = to;

        let out_this = this;
        console.log(this.commentInfo);
        this.$axios.post('/comment/add', this.commentInfo).then(response => {
          let resData = response.data;
          console.log(resData);

          let success = false;
          if (resData.code === 5003) {
            out_this.$message({
              message: resData.code + '~~~~' + resData.message,
              type: 'warning',
              duration: 2000
            });
            success = true;

          } else if (resData.code === 5001) {
            out_this.$message({
              message: resData.code + '~~~~' + resData.message,
              type: 'success',
              duration: 2000
            });

            success = true;

          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }

          if (success)
            out_this.$router.go(0);

        });

        this.replyHideEvent();

      },
      goLogin() {
        this.$router.push('/login');
      },
      replyHideEvent() {
        this.replyContent = '';
        this.commentInfo.content = '';
      }
    }
  }
</script>

<style scoped>

  #div-focus-button {
    position: absolute;
    top: 0px;
    text-align: right;
    width: 90%;
  }

  .div-comment-outer {
    height: 800px;
    overflow-y: auto;
    border: 2px solid #575f84;
    border-radius: 20px;
    background: white;
  }

  .div-comment-header {
    width: 90%;
    margin: 0px auto;
    border-bottom: 2px solid #b9bbbe;
    height: 100px;
    position: relative;
    vertical-align: bottom;
  }

  .div-comment-header > div {
    margin-left: -10px;
  }

  .div-comment-item {
    width: 90%;
    margin: 0px auto;
  }

  .div-comment-header > div {
    position: absolute;
    bottom: 10px;
    left: 3%;
    width: 100%;
    font-size: 24px;
  }

  .div-comment-input {
    height: 150px;
    margin: 15px auto;
    background: #e9e9ee;
    border-radius: 25px;
    overflow: hidden;
  }

  .div-comment-input div {
    display: inline-block;
  }

  .div-comment-input-icon {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin: 15px 40px;
    overflow: hidden;
  }

  .div-comment-input-content {
    width: 60%;
    height: 150px;
    vertical-align: top;
    padding: 15px 0px;
    margin: auto 2%;
  }

  .div-comment-input-login {
    background: white;
    border-radius: 20px;
    width: 60%;
    height: 100px;
    vertical-align: top;
    padding: 30px 0px;
    margin: 25px 2%;
    text-align: center;
  }

  .div-comment-input-button {
    width: 12%;
    height: 150px;
    vertical-align: top;
    padding: 50px 0px;
  }

  .div-comment-content-box {
    height: 660px;
    margin: 15px auto;
    border-radius: 25px;

  }

  .div-comment-content-inline {
    width: 95%;
    margin-left: 20px;
  }

  .div-comment-content-inline > div {
    display: inline-block;
  }

  .div-comment-content-icon {
    width: 8%;
    height: 8%;
    margin: 0px;
    vertical-align: top;
  }

  .div-comment-content-head {
    width: 100%;
  }

  .div-comment-content-head > div {
    display: inline-block;
    width: 49%;
  }

  .div-comment-content-name {
    padding-left: 20px;
    font-size: 22px;
    font-weight: bold;
    color: #0b0b0b;
  }

  .div-comment-content-time {
    padding-left: 20px;
    margin-top: 0px;
    font-size: 14px;
    color: #5a6268;
  }

  .div-comment-content-support {
    vertical-align: top;
    margin-top: 20px;
    text-align: right;
    color: #5a6268;

  }

  .div-comment-content {
    width: 100%;
    padding-left: 20px;
    padding-top: 10px;
    margin-bottom: 10px;
  }

  #comment-to-name-span {
    padding-left: 5px;
    padding-right: 5px;
    color: #00afe9;
    font-weight: bolder;
    font-size: 16px;
  }


</style>
