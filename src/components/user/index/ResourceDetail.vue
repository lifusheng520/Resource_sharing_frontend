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
                  <h3><a href="#">{{UserAndResource.resource.origin_name}}</a></h3>
                  <h4>
                    <span class="admin"><i class="el-icon-s-custom"></i>用户：{{UserAndResource.userInfo.name}}</span>
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
                  <a><span><i class="fas fa-cloud-download-alt"></i> 下载</span></a>
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

                <div class="div-comment-input-content">
                  <el-input type="textarea" rows="5"
                            placeholder="蹭蹭热度也要注意你的言辞喔"
                            v-model="commentInfo.content">
                  </el-input>
                </div>

                <div class="div-comment-input-button">
                  <el-button type="info" plain>发布评论</el-button>
                </div>

              </div>

              <!--              评论区-->
              <div class="div-comment-outer">

                <div class="div-comment-header">
                  <div>评论列表</div>
                </div>

                <div class="infinite-list-wrapper" style="overflow:auto">

                  <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
                    <li v-for="i in count" class="list-item">{{ i }}</li>
                    <span>头上一片晴天，心中一个想念</span>
                    <el-divider content-position="left">少年包青天</el-divider>
                    <span>饿了别叫妈, 叫饿了么</span>
                    <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
                    <span>为了无法计算的价值</span>
                    <el-divider content-position="right">阿里云</el-divider>
                  </ul>
                  <p v-if="loading">加载中...</p>
                  <p v-if="noMore">没有更多了</p>
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
        count: 10,
        loading: false,
        UserAndResource: {
          resource: '',
          userInfo: ''
        },
        visible: false,
        userId: '',
        commentInfo: {
          resource_id: '',
          user_id: '',
          to_id: '',
          content: '',
        }

      }
    },
    created() {
      let resourceId = this.$cookies.get('resource_id');
      if (!resourceId) {
        this.isEmpty = true;
        return;
      }
      console.log(resourceId);
      let out_this = this;
      this.$axios.get(`/resource/server/detail/${resourceId}`).then(res => {
        let resData = res.data;
        console.log(resData);

        if (resData.code === 4028) {
          out_this.UserAndResource.resource = resData.data.resource;
          out_this.UserAndResource.userInfo = resData.data.userInfo;
          // out_this.$cookies.remove('resource_id');
        }
      });

      this.userId = this.$cookies.get('user_id');

    },
    computed: {
      noMore() {
        return this.count >= 20
      },
      disabled() {
        return this.loading || this.noMore
      }
    },
    methods: {
      load() {
        this.loading = true;
        setTimeout(() => {
          this.count += 2;
          this.loading = false
        }, 2000)
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
    }
  }
</script>

<style scoped>
  .div-comment-outer {
    height: 700px;
    overflow-y: auto;
    border: 2px solid #b9bbbe;
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
    position: absolute;
    bottom: 10px;
    left: 3%;
    width: 100%;
    font-size: 24px;
  }

  .div-comment-input {
    /*border: 1px red solid;*/
    height: 150px;
    margin: 15px auto;
    background: #e9e9ee;
    border-radius: 25px;
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
    /*border: 1px yellow solid;*/
    width: 550px;
    height: 150px;
    vertical-align: top;
    padding: 15px 0px
  }

  .div-comment-input-button {
    /*border: 1px yellow solid;*/
    width: 150px;
    height: 150px;
    vertical-align: top;
    padding: 50px 30px;
  }

</style>
