<template>

  <!-- header 导航栏开始-->
  <div class="header">
    <div class="container">
      <div class="row justify-content-between d-flex">
        <div class="col-xl-2 col-lg-2 d-xl-flex d-lg-flex d-block align-items-center mobile-header">
          <div class="row d-flex">
            <div class="col-xl-12 col-lg-12 col-6 d-flex align-items-center">
              <div class="logo">
                <a href="index.html"><img src="static/img/logo.png" alt=""></a>
              </div>
            </div>
            <div class="col-xl-12 col-6 d-xl-none d-lg-none d-block">
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                      aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"><i class="fas fa-bars"></i></span>
              </button>
            </div>
          </div>
        </div>

        <div class="col-xl-16 col-lg-16 min-height-none">
          <div class="main-menu">
            <nav class="navbar navbar-expand-lg">
              <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul class="navbar-nav nav justify-content-center">
                  <li class="nav-item">
                    <a class="nav-link active" href="/">主页 <span class="sr-only">(current)</span></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="about.html">About</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="investment-plan.html">Investment Plan</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="faq.html">FAQ</a>
                  </li>
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                       aria-haspopup="true" aria-expanded="false">Blog</a>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="blog.html">Blog</a>
                      <a class="dropdown-item" href="blog-details.html">Single Blog</a>
                    </div>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="contact.html">Contact</a>
                  </li>

                </ul>
              </div>
            </nav>
          </div>
        </div>

        <div class="col-xl-2 col-lg-2 d-xl-flex d-lg-flex d-none align-items-center">

          <div>

            <div style="display: inline-block;">
              <el-avatar shape="circle" :size="40" src="static/ico/headIco.png" @error="errorHandler"></el-avatar>
            </div>
            <div id="div_username">
              <a id="a_username" v-on:click="goLogin" v-show="getLogin">登录</a>
              <a id="a_username" v-on:click="" v-show="!getLogin">{{user.username}}</a>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
  <!-- header 导航栏结束 -->


</template>

<script>

  export default {
    name: "Header",
    data() {
      return {
        user: {
          username: '登录'
        }
      }
    },
    created() {
      this.getUserInfo();
    },
    methods: {
      getUserInfo() {
        let name = this.$cookies.get('username');
        if (name !== null || ''.match(name))
          this.user.username = name;
      },
      goLogin: function () {
        // 如果当前路由是登录，不在进行路由跳转
        if (this.$route.path == "/login")
          return;

        this.$store.pageTitle = "Login";
        this.$router.push("/login");
      },
      errorHandler() {
        return true;
      }
    },
    computed: {
      getLogin: function () {
        return this.$cookies.get('username') === null;
      }
    }
  }
</script>

<style scoped>

  #div_username {
    color: white;
    font-size: 25px;
    display: inline-block;
    position: absolute;
    font-weight: bold;
  }

  #div_username > a {
    margin-left: 10px;
  }

</style>
