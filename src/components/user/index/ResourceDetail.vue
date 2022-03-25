<template>
  <div>

    <!-- page-title 页面标题开始-->
    <div class="page-title">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-8">
            <div class="page-title-content">
              <h1>资源名：XXX</h1>
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
                    <img src="static/img/post-admin.png" alt="">
                  </div>
                  <h3><a href="#">资源名+点击下载</a></h3>
                  <h4>
                    <span class="admin">By 用户角色 </span>
                  </h4>
                  <h4>
                    <span class="category">隶属：XXX </span>
                  </h4>
                  <h4>
                    <span class="date">上传于：XXX</span>
                  </h4>
                  <p>资料介绍: <br>
                    We are full service Digital Marketing Agency all the tools you need for inbound success. With this
                    module theres no
                    need to go another Digital
                    Marketing Agency all the tools you need for inbound success. With this module theres no need to go
                    another day. We are
                    full Marketing Agency
                    all the tools you need for inbound success. With this module theres no need to go another day.</p>

                </div>
                <div class="part-social">
                  <a href="#"><span><i class="fas fa-download"></i></span> 25</a>
                  <a href="#"><span><i class="fas fa-heart"></i></span> 480</a>
                  <a href="#"><span><i class="fas fa-share"></i></span> 分享</a>
                  <a hidden></a>
                </div>
              </div>

              <!--              评论区-->
              <div style="background: white">
                <span>头上一片晴天，心中一个想念</span>
                <el-divider content-position="left">少年包青天</el-divider>
                <span>饿了别叫妈, 叫饿了么</span>
                <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
                <span>为了无法计算的价值</span>
                <el-divider content-position="right">阿里云</el-divider>
<!--                <el-divider v-for="i in count" content-position="right">阿里云</el-divider>-->

                <div class="infinite-list-wrapper pagelist" style="overflow:auto">
                  <ul class="list" v-infinite-scroll="load">
                    <li v-for="i in count" class="list-item">{{ i }}</li>
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
        loading: false

      }
    },
    created() {
      let resourceId = this.$cookies.get('resource_id');
      console.log(resourceId);
    },
    computed: {
      noMore () {
        return this.count >= 20
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
    methods: {
      load () {
        this.loading = true
        setTimeout(() => {
          this.count += 2
          this.loading = false
        }, 2000)
      }
    }
  }
</script>

<style scoped>

  .pagelist{
    height: 700px;
    overflow-y: auto;
  }

</style>
