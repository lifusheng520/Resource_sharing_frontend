<template>

  <!-- header 导航栏开始-->
  <div class="header">
    <div class="container">
      <div class="row justify-content-between d-flex">
        <div class="col-xl-2 col-lg-2 d-xl-flex d-lg-flex d-block align-items-center mobile-header">
          <div class="row d-flex">
            <div class="col-xl-12 col-lg-12 col-6 d-flex align-items-center">
              <div class="logo">
                <a v-on:click="goIndex"><img src="static/img/logo.png" alt=""></a>
              </div>
            </div>
            <div class="col-xl-12 col-6 d-xl-none d-lg-none d-block">
              <button class="navbar-toggler" type="button" data-toggle="collapse"
                      data-target="#navbarNavAltMarkup"
                      aria-controls="navbarNavAltMarkup" aria-expanded="false"
                      aria-label="Toggle navigation">
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
                    <a class="nav-link active" v-on:click="goIndex">主页 <span
                      class="sr-only">(current)</span></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" v-on:click="goRecommendation">资源推荐</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" v-on:click="goRank">贡献狂人</a>
                  </li>
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#"
                       role="button"
                       aria-haspopup="true" aria-expanded="false">数据图表</a>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="#">上传情况</a>
                      <a class="dropdown-item" href="#">下载情况</a>
                    </div>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">关注</a>
                  </li>

                </ul>
              </div>
            </nav>
          </div>
        </div>

        <div class="col-xl-2 col-lg-2 d-xl-flex d-lg-flex d-none align-items-center">

          <div>

            <div style="display: inline-block;">
              <el-avatar v-if="this.user.headIcon" shape="circle" :size="60" :src="this.user.headIcon"></el-avatar>
              <el-avatar v-else shape="circle" :size="60" src="static/ico/headIcon.png"></el-avatar>
            </div>
            <div id="div_username">

              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                       @select="handleSelect">
                <el-submenu index="1">
                  <template slot="title">
                    <span v-model="this.user.username">{{this.user.username}}</span>
                  </template>
                  <el-menu-item index="1-1" v-on:click="goPersonalCenter">个人空间</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                  <el-menu-item index="1-3" v-on:click="goLogin" v-if="!this.user.isLogin">登录
                  </el-menu-item>
                  <el-menu-item index="2-3" v-on:click="goLogout" v-else>退出</el-menu-item>
                  <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                  </el-submenu>
                </el-submenu>
              </el-menu>


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
          isLogin: false,
          username: '登录',
          headIcon: ''
        },
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    created: function () {
      this.setUserInfo();
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      setUserInfo() {
        let name = this.$cookies.get('username');
        if (name) {
          this.user.username = name;
          this.user.isLogin = true;
        }

        let headIcon = this.$cookies.get('user_icon');
        if (headIcon) {
          this.user.headIcon = headIcon;
        }
      },
      goIndex() {
        if (this.$route.path === '/') return;
        this.$router.push('/');
      },
      goRecommendation() {
        if (this.$route.path === '/recommend') return;
        this.$router.push('/recommend');
      },
      goRank() {
        if (this.$route.path === '/rank') return;
        this.$router.push('/rank');
      },
      goLogin: function () {
        // 如果当前路由是登录，不在进行路由跳转
        if (this.$route.path == "/login")
          return;

        this.$store.pageTitle = "Login";
        this.$router.push("/login");
      },
      goLogout: function () {
        // 保存Vue中this对象
        let _this = this;

        // 退出登录
        this.$axios.post('/auth/logout').then(res => {
          //  获取结果数据
          let resData = res.data;
          console.log(resData);

          if (!resData) {
            this.$message.error('退出登录失败~~');
          } else {
            this.$message({
              message: resData.code + '~~~~' + resData.message,
              type: 'success',
              center: true,
              duration: 2000
            });
          }

          // 清除用户cookies
          _this.$cookies.remove('user_id');
          _this.$cookies.remove('username');
          _this.$cookies.remove('user_icon');
          _this.$cookies.remove('userInfo_id');
          _this.user.username = '登录';
          _this.user.isLogin = false;
          _this.user.headIcon = '';

          if (_this.$route.path !== '/')
            _this.$router.push('/');
          else
            _this.$router.go(0);
        });
      },
      goPersonalCenter() {
        // 判断用户是否已经登录
        if (!this.$cookies.get('user_id')) {
          this.$message({
            message: '请先登录，你还没有登录喔~~',
            type: 'info',
            center: true,
            duration: 2000
          });
          return;
        }

        this.$store.pageTitle = "Personal Center";
        this.$router.push('/personal');
      },
    },
    computed: {}
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

  .el-menu-demo {
    background: none;
  }

  .el-menu-demo span {
    color: white;
  }

  .el-menu-demo span:hover {
    color: black;
  }

</style>
