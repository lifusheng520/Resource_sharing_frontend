<template>

  <!-- header 导航栏开始-->
  <div class="header">

    <div class="container">
      <div class="row justify-content-between d-flex">

        
        <div class="col-xl-16 col-lg-16 min-height-none">
          <div class="main-menu">
            <nav class="navbar navbar-expand-lg">
              <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul class="navbar-nav nav justify-content-center">
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#"
                       role="button" v-on:mouseover="showLangMenu = true"
                       aria-haspopup="true" aria-expanded="false">En&nbsp;/&nbsp中</a>
                    <div class="dropdown-menu" v-show="showLangMenu">
                      <a class="dropdown-item" v-on:click="changeLang('zh')">中文</a>
                      <a class="dropdown-item" v-on:click="changeLang('en')">English</a>
                    </div>
                  </li>

                </ul>
              </div>
            </nav>
          </div>
        </div>
        


        <div id="website-icon" class="col-xl-2 col-lg-2 d-xl-flex d-lg-flex d-block align-items-center mobile-header">
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
                <ul id="menu-item" class="navbar-nav nav justify-content-center">
                  <li class="nav-item">
                    <a class="nav-link active" v-on:click="goIndex">{{ $t('header.home') }} <span
                      class="sr-only">(current)</span></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" v-on:click="goRecommendation">{{ $t('header.recommendation') }}</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" v-on:click="goRank">{{ $t('header.contribution') }}</a>
                  </li>
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#"
                       role="button"
                       aria-haspopup="true" aria-expanded="false">{{ $t('header.statistics') }}</a>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" v-on:click="goUploadData">{{ $t('header.uploadDetails') }}</a>
                      <a class="dropdown-item" v-on:click="goDownloadData">{{ $t('header.downloadDetails') }}</a>
                    </div>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" v-on:click="goFocusDetail">{{ $t('header.focus') }}</a>
                  </li>

                  <li class="nav-item dropdown">
                    <div>
                      <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#"
                        role="button" aria-haspopup="true" aria-expanded="false"
                        :style="`position: relative; ${this.language == 'zh' ? 'text-align: right; padding-left: 50%;' : 'text-align: right; padding-right: 45%;'}`">

                        <img :src="this.user.headIcon" width="52px" height="52px" id="user-avatar" 
                            style="border-radius: 50%; position: absolute; top: 50%; left: 0; transform: translate(40%, -50%);" />
                      </a>
                      <div class="dropdown-menu">
                        <a class="dropdown-item" v-on:click="goPersonalCenter">{{ $t('header.dashboard') }}</a>
                        <a class="dropdown-item"  v-if="!this.user.isLogin" v-on:click="goLogin">{{ $t('header.login') }}</a>
                        <a class="dropdown-item" v-else v-on:click="goLogout">{{ $t('header.logout') }}</a>
                      </div>
                    </div>
                  </li>

                </ul>
              </div>
            </nav>
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
        activeIndex2: '1',
        showLangMenu: false,
        language: this.$i18n.locale
      }
    },
    created: function () {
      this.setUserInfo();
    },
    mounted() {
      // 监听更新头像事件
      this.$root.$on('updateHeadIconEvent', (newHeadIcon) => {
        this.user.headIcon = newHeadIcon;
        
        let avatarElement = document.getElementById("user-avatar");
        avatarElement.src = newHeadIcon;   
      });
    },
    methods: {
      setUserInfo() {
        let name = this.$cookies.get('username');
        if (name) {
          this.user.username = name;
          this.user.isLogin = true;
        }

        let headIcon = this.$cookies.get('user_icon');

        if (headIcon) {
          this.user.headIcon = headIcon;
        } else {
          this.user.headIcon = '/static/ico/headIcon.png';
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
        this.$store.pageTitle = this.$t('header.rank');
        this.$router.push('/rank');
      },
      goLogin() {
        // 如果当前路由是登录，不在进行路由跳转
        if (this.$route.path == "/login")
          return;

        this.$store.pageTitle = "Login";
        this.$router.push("/login");
      },
      goUploadData() {
        if (this.$route.path == "/uploadData")
          return;

        this.$store.pageTitle = "上传分析";
        this.$router.push("/uploadData");
      },
      goDownloadData() {
        if (this.$route.path == "/downloadData")
          return;

        this.$store.pageTitle = "下载分析";
        this.$router.push("/downloadData");
      },
      goFocusDetail() {
        if (this.$route.path == '/focus')
          return;
        this.$store.pageTitle = "我的关注12";
        this.$router.push("/focus");
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
            this.$message.error(this.$t('header.networkError'));
          } else {
            this.$message({
              message: resData.code + '~~~~' + _this.$t('header.logoutSuccess'),
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
            message: this.$t('header.loginFirst'),
            type: 'info',
            center: true,
            duration: 2000
          });
          return;
        }

        this.$store.pageTitle = "Personal Center";
        this.$router.push('/personal');
      },
      changeLang(lang) {
        this.$i18n.locale = lang;
        localStorage.setItem('locale', lang);  // 保存选择，下次打开还是这个语言
        this.showLangMenu = false;

        this.language = lang;
      }
    },
    computed: {}
  }
</script>

<style scoped>

  .el-menu-demo {
    background: none;
  }

  .el-menu-demo span {
    color: white;
  }

  .el-menu-demo span:hover {
    color: black;
  }

  #language-switch {
  color: white;
  margin-top: 15px;
  }

  #website-icon {
    padding: 0;
  }

</style>