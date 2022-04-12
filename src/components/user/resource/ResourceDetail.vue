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
                               :type="isFocus(UserAndResource.resource.user_id) ? 'danger' : 'info'" round>
                      {{isFocus(UserAndResource.resource.user_id) ? '取消' : '关 注'}}
                    </el-button>
                  </div>

                  <h3><a href="#">{{UserAndResource.resource.origin_name}}</a></h3>
                  <h4>
                    <span class="admin"><i class="el-icon-s-custom"></i>用户：{{UserAndResource.userInfo.username}}</span>
                  </h4>
                  <h4>
                    <span class="date">上传于：{{UserAndResource.resource.upload_time}}</span>
                  </h4>
                  <h4>
                    <span class="category">隶属：{{UserAndResource.resource.discipline}}</span>
                  </h4>
                  <p>资料介绍: <br>
                    {{UserAndResource.resource.description}}
                  </p>
                </div>

                <div class="part-social">
                  <a v-on:click="resourceSupportHandler(UserAndResource.resource.id)">
                    <span><i class="fas fa-thumbs-up"></i></span> {{UserAndResource.resource.supportNumber}}
                  </a>
                  <a><span><i class="fas fa-download"></i></span> {{UserAndResource.resource.downloads}}次</a>

                  <a v-on:click="resourceFavouriteHandler(UserAndResource.resource.id)">
                    <span><i class="fas fa-heart"></i> {{UserAndResource.resource.favorite_number}}</span>
                  </a>

                  <el-dialog title="选择收藏夹" center :visible.sync="favouriteShow" width="400px">
                    <div class="infinite-list-wrapper" style="overflow:auto;height: 250px">
                      <table>
                        <el-checkbox-group v-model="selectList">
                          <tr v-for="(item, index) in folderList" :key="index">
                            <td>
                              <el-checkbox v-if="folderIsContain(item.folder_name)" checked :label="item">
                                {{item.folder_name}}
                              </el-checkbox>
                              <el-checkbox v-else :label="item">
                                {{item.folder_name}}
                              </el-checkbox>
                            </td>
                          </tr>
                        </el-checkbox-group>
                      </table>
                    </div>

                    <div>
                      <el-button v-on:click="showAddFolder=!showAddFolder" icon="el-icon-plus"
                                 style="width: 100%;font-size: 18px;" plain>新建收藏夹
                      </el-button>
                    </div>
                    <div v-show="showAddFolder" style="margin-top: 15px;">
                      <el-input v-model="addFolderForm.folder_name" type="text"
                                placeholder="最多输入20个字符" maxlength="20">
                        <template slot="append">
                          <el-button v-on:click="addFolderHandler" type="primary" plain>新 建</el-button>
                        </template>
                      </el-input>
                    </div>

                    <div slot="footer" class="dialog-footer">
                      <el-button @click="cancelAddEvent">取 消</el-button>
                      <el-button type="primary" @click="addFavourite">确 定</el-button>
                    </div>
                  </el-dialog>

                  <a
                    :href="`http://localhost:8080/resource/download/${UserAndResource.resource.disk_name}/${UserAndResource.resource.id}/${UserAndResource.resource.discipline}`"><span><i
                    class="fas fa-cloud-download-alt"></i> 下载</span></a>
                  <a v-on:click="copyURLVisible = !copyURLVisible"><span><i class="fas fa-share"></i></span> 分享</a>
                  <a hidden></a>
                </div>

                <el-popover placement="right" title="下载URL：" width="100%"
                            v-model="copyURLVisible" trigger="click">
                  <p>
                    {{`http://localhost:8080/resource/download/${UserAndResource.resource.disk_name}/${UserAndResource.resource.id}/${UserAndResource.resource.discipline}`}}</p>
                  <div>
                    <el-button type="primary" size="mini"
                               @click="copyURL(`http://localhost:8080/resource/download/${UserAndResource.resource.disk_name}/${UserAndResource.resource.id}/${UserAndResource.resource.discipline}`)">
                      复制URL
                    </el-button>
                    <el-button size="mini" type="primary" @click="copyURLVisible = false">取消</el-button>
                  </div>
                </el-popover>

              </div>

              <!--              发布评论-->
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
        copyURLVisible: false,
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
        // 回复对话框显示
        showReply: false,
        // 关注列表
        focusList: [],
        // 关注表单
        focusForm: {
          user_id: '',
          focusUserId: '',
        },
        // 收藏表单
        favouriteForm: {
          user_id: '',
          resource_id: '',
          folder_id: '',
          folder: '',
        },
        // 收藏夹列表
        folderList: [],
        //选择列表
        selectList: [],
        // 收藏夹显示
        favouriteShow: false,
        favouriteFormLabelWidth: '120px',
        // 新建收藏夹表单
        addFolderForm: {
          user_id: '',
          folder_name: '',
        },
        // 新建收藏夹显示
        showAddFolder: false,
        // 收藏记录
        favouriteRecord: [],

      }
    },
    created() {
      let resourceId = this.$cookies.get('resource_id');
      if (!resourceId) {
        this.isEmpty = true;
        return;
      }

      this.commentInfo.resource_id = resourceId;
      this.getCommentUserId();
      this.getResourceDetailInfo();
      this.getCommentContentList();

      if (this.focusForm.user_id)
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
        for (let i = 0; i < this.focusList.length; ++i) {
          if (this.focusList[i] == id) {
            return true;
          }
        }
        return false;
      },
      // 取消关注
      deleteFocus(focusUid) {
        this.focusForm.focusUserId = focusUid;
        // 发起取消关注请求
        let out_this = this;
        this.$axios.post('/focus/cancel', this.focusForm).then(response => {
          let resData = response.data;

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
          return userId;
        } else {
          this.$message.info('您还没有登录~~~');
          this.$router.push('/login');
          return false;
        }
      },
      // 加载评论
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
      getCommentUserId() {
        let userId = this.$cookies.get('user_id');
        if (userId) {
          this.commentInfo.user_id = userId;
        }
      },
      // 获取资源详情
      getResourceDetailInfo() {
        let out_this = this;
        this.$axios.get(`/resource/server/detail/${this.commentInfo.resource_id}`).then(res => {
          let resData = res.data;
          console.log(resData);

          if (resData.code === 4028) {
            out_this.UserAndResource.resource = resData.data.resource;
            out_this.UserAndResource.userInfo = resData.data.userInfo;
          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }
        });

      },
      // 获取评论区内容列表
      getCommentContentList() {
        let out_this = this;
        this.$axios.get(`/comment/load/${this.commentInfo.resource_id}`).then(response => {
          let resData = response.data;

          if (resData.code === 5004) {
            out_this.commentContentList = resData.data;
          } else {
            this.$message.error(resData.code + '~~~~' + resData.message);
          }

        });

      },
      // 添加评论处理函数
      addComment() {
        let temp = this.commentInfo.content.replace(/\s*/g, '');
        if (!temp) {
          this.$message.info('请先输入你的评论再发布哟~~~');
          return;
        }
        this.commentInfo.content = temp;

        this.sendComment();

      },
      // 回复评论
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
      // 发送评论
      sendComment(to) {
        this.getCommentUserId();
        if (!this.commentInfo.user_id) {
          this.$message.info('请先登录再发布你的评论哟~~~');
          return;
        }
        this.commentInfo.to_id = to;

        let out_this = this;
        console.log(this.commentInfo);
        this.$axios.post('/comment/add', this.commentInfo).then(response => {
          let resData = response.data;

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
            out_this.getCommentContentList();
        });

        this.replyHideEvent();
      },
      goLogin() {
        this.$router.push('/login');
      },
      // 回复内容复位
      replyHideEvent() {
        this.replyContent = '';
        this.commentInfo.content = '';
        return true;
      },
      // 资源点赞处理函数
      resourceSupportHandler(resourceId) {
        // 获取登录信息
        let userId = this.getUserLoginInfo();
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
        this.UserAndResource.resource.supportNumber += dx;
      },
      // 资源收藏处理函数
      resourceFavouriteHandler(resourceId) {
        // 获取用户登录信息，并设置收藏表单参数
        let userId = this.getUserLoginInfo();
        if (!userId)
          return;
        this.favouriteForm.user_id = userId;
        this.favouriteForm.resource_id = resourceId;
        this.favouriteShow = true;

        // 获取已收藏记录
        this.getFavouriteRecord(userId, resourceId);

        // 获取用户的收藏文件夹列表
        if (!this.folderList.length) {
          this.getFavouriteFolderList(userId);
        }
      },
      // 获取用户收藏文件夹列表
      getFavouriteFolderList(userId) {
        let out_this = this;
        this.$axios.get(`/favourite/getFolders/${userId}`).then(response => {
          let resData = response.data;

          if (resData.code == 7005) {
            out_this.folderList = resData.data;
          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }
        });
      },
      // 添加收藏夹
      addFolderHandler() {
        // 获取用户id
        this.addFolderForm.user_id = this.getUserLoginInfo();
        if (!this.addFolderForm.user_id)
          return 0;
        if (!this.addFolderForm.folder_name) {
          this.$message.info('收藏夹名称不能为空喔');
          return 0;
        }
        // 添加收藏夹请求
        let out_this = this;
        this.$axios.post('/favourite/addFolder', this.addFolderForm).then(response => {
          let resData = response.data;
          if (resData.code == 7006) { // 添加成功
            out_this.$message({
              message: resData.code + '~~~~' + resData.message,
              type: 'success',
              duration: 2000
            });
            // 将刚刚添加的收藏夹加入到list
            out_this.folderList.push(resData.data);
            out_this.showAddFolder = false;
          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }
        });
      },
      // 添加收藏
      addFavourite() {
        console.log(this.selectList);
        let out_this = this;
        this.$axios.post('/favourite/add', {
          'selectFoldersList': this.selectList,
          'favourite': this.favouriteForm
        }).then(response => {
          let resData = response.data;
          console.log(resData);
          if (resData.code == 7006) { // 添加成功
            out_this.$message({
              message: resData.code + '~~~~' + resData.message,
              type: 'success',
              duration: 2000
            });
          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }
        });

        this.cancelAddEvent();
      },
      // 取消收藏的事件
      cancelAddEvent() {
        this.favouriteShow = false;
      },
      // 获取已经收藏的记录
      getFavouriteRecord(user_id, resource_id) {
        let out_this = this;
        this.$axios.get(`/favourite/getRecord/${user_id}/${resource_id}`).then(response => {
          let resData = response.data;
          console.log(resData);

          if (resData.code == 7009) {
            out_this.favouriteRecord = resData.data;
          }
        });
      },
      // 判断收藏夹是否处于收藏记录中
      folderIsContain(val) {
        for (let i = 0; i < this.favouriteRecord.length; ++i)
          if (this.favouriteRecord[i] == val)
            return true;
        return false;
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
