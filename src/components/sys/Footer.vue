<template>

  <div>
    <!-- footer  页脚开始-->
    <footer class="footer mt-0 investment-page">
      <div class="container">
        <div class="row">
          <div class="col-xl-5 col-lg-5 col-md-6">
            <div class="about-area">
              <a v-on:click="goIndexPage">
                <img src="static/img/logo.png" alt="">
              </a>
              <p>我们是提供资源共享的网上分享平台，您需要的学习资源都可以在本站查找。有了本站提供的服务，您就不需要为查找资源发愁了！</p>
            </div>
            <div class="social">
              <a href="#"><i class="fab fa-qq"></i></a>
              <a href="#"><i class="fab fa-weixin"></i></a>
              <a href="#"><i class="fab fa-apple"></i></a>
              <a href="#"><i class="fab fa-linux"></i></a>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6">
            <div class="links">
              <h3>友情链接</h3>
              <ul>
                <li>
                  <a href="#">首页</a>
                </li>
                <li>
                  <a href="#">哔哩哔哩</a>
                </li>
                <li>
                  <a href="#">中国大学MOOC</a>
                </li>
                <li>
                  <a href="#">Google</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-6">
            <div class="links">
              <h3>关于我们</h3>
              <ul>
                <li>
                  <a href="#">开发人员</a>
                </li>
                <li>
                  <a href="#">系统介绍</a>
                </li>
                <li>
                  <a href="#">联系我们</a>
                </li>
                <li>
                  <a href="#">技术支持</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-6">
            <div class="address">
              <h3>联系我们</h3>
              <ul>
                <li>
                  湖南省张家界市永定区子午路吉<br/>
                  首大学张家界校区
                </li>
                <li>
                  1992968196@qq.com
                </li>
                <li>
                  QQ:1992968196
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-12 col-lg-12 text-center">
            <div class="copyright">
              <p>© 2022. 保留版权所有 <a href="#" title="baigei.com">白给网</a>&nbsp;&nbsp;|&nbsp;&nbsp;隐私政策</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
    <!-- footer  页脚结束 -->
  </div>

</template>

<script>

  export default {
    name: "Footer",
    methods: {
      goIndexPage(){
        if (this.$route.path != '/'){
          this.$router.push('/');
        }
      }
    }
  }
</script>

<style scoped>

</style>
