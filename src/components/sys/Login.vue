<template>

  <div>

    <PageTitle></PageTitle>

    <!-- login begin-->
    <div class="contact login">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-6 col-lg-6">
            <div class="section-title text-center">
              <h2>登&nbsp;录&nbsp;<span>你的账号</span></h2>
              <p>把你的分享想法付诸行动，进行全方位的投资。享受实在的便利和服务，您的资料管家~</p>
            </div>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-xl-6 col-lg-6">
            <el-form class="contact-form" :model="loginForm" :rules="rules">
              <div class="row">
                <div class="col-xl-12 col-lg-12">
                  <div class="form-group">

                    <el-form-item prop="username">
                      <label for="InputName">账&nbsp;号<span class="requred">*</span></label>
                      <el-input type="text" v-model="loginForm.username" class="form-control" id="InputName"
                                placeholder="Enter Your Account" required></el-input>
                    </el-form-item>

                  </div>
                </div>
                <div class="col-xl-12 col-lg-12">
                  <div class="form-group">

                    <el-form-item prop="password">
                      <label for="InputAmount">密&nbsp;码<span class="requred">*</span></label>
                      <el-input type="password" class="form-control" id="InputAmount" placeholder="Enter Your Password"
                                v-model="loginForm.password" required></el-input>
                    </el-form-item>

                  </div>
                </div>
                <div class="col-xl-12 col-lg-12">
                  <div class="form-group mb-0 checkbox">
                    <div class="form-check pl-0">
                      <input class="form-check-input" type="checkbox" id="gridCheck1" v-model="loginForm.remember">
                      <label class="form-check-label" for="gridCheck1">
                        记住密码
                      </label>
                    </div>
                  </div>
                </div>

                <div class="col-xl-12 col-lg-12">
                  <div class="row d-flex">
                    <div class="col-xl-6 col-lg-6">
                      <el-button class="login-button" @click="loginSubmit()">立&nbsp;即&nbsp;登&nbsp;录</el-button>
                    </div>
                    <div class="col-xl-6 col-lg-6 d-flex align-items-center">
                      <a v-on:click="goRegister" class="forgetting-password">没账号？去注册</a>
                      <a v-on:click="goForgetPassword" class="forgetting-password">忘记密码？</a>
                    </div>
                  </div>
                </div>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <!-- login end -->


  </div>

</template>

<script>

  import PageTitle from "./PageTitle";

  export default {
    name: "Login",
    components: {PageTitle},
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
          remember: false
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      // 获取本地存储中的登录数据
      let uname = localStorage.getItem('username');
      let pass = localStorage.getItem('password');
      let remember = localStorage.getItem('remember');

      // 结果都存在
      if (uname && pass && remember) {
        this.loginForm.username = uname;
        this.loginForm.password = pass;
        this.loginForm.remember = remember;
      }
    },
    methods: {
      loginSubmit() {
        let ulen = this.loginForm.username.length;
        let plen = this.loginForm.password.length;
        if (!ulen) {
          this.$message({
            message: '用户名不能为空~',
            type: 'error'
          });
          return;
        }

        if (!plen) {
          this.$message({
            message: '密码不能为空~',
            type: 'error'
          });
          return;
        }

        if (!(ulen >= 5 && ulen <= 10)) {
          this.$message({
            message: '用户名长度在 5 到 10 个字符~',
            type: 'error'
          });
        } else if (!(plen >= 6 && plen <= 20)) {
          this.$message({
            message: '密码长度在 6 到 20 个字符~',
            type: 'error'
          });
        } else {
          // 保存Vue的this对象，请求中的this为axios的this对象
          const _this = this;

          // 发起请求{headers:{'Content-Type': 'application/json;charset=UTF-8'}}
          this.$axios.post('/auth/login', this.$qs.stringify(this.loginForm), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(res => {
            let resdata = res.data;

            // 没有对应的用户信息
            if (!resdata.data) {
              this.$message({
                message: resdata.code + '~~ 用户名或密码错误 ~~' + resdata.message,
                type: 'error',
                center: true,
                duration: 2000
              });
            } else {
              this.$message({
                message: resdata.code + '~~~~  ' + resdata.message,
                type: 'success',
                center: true,
                duration: 2000
              });

              // 获取用户token
              let token = res.headers['token'];
              // 获取用户信息
              let userInfo = resdata.data;

              _this.$store.user_id = userInfo.id;
              _this.$store.username = userInfo.username;
              _this.$store.isEnable = userInfo.isEnable;
              _this.$store.roles = userInfo.roles;

              //  记住密码
              if (_this.loginForm.remember) {
                //  登录成功，将结果放入本地localStorage中（浏览器关闭下次可以继续访问）
                localStorage.setItem('username', userInfo.username);
                localStorage.setItem('password', _this.loginForm.password);
                localStorage.setItem('remember', _this.loginForm.remember);
              } else {
                //  登录成功，将本地结果删除
                localStorage.removeItem('username');
                localStorage.removeItem('password');
                localStorage.removeItem('remember');
              }

              //将结果放入sessionStorage中，并将其序列化
              // sessionStorage.setItem('userId', JSON.stringify(userInfo.id));

              _this.$cookies.set('username', userInfo.username, 60 * 30);
              _this.$cookies.set('user_id', userInfo.id, 60 * 30);
              _this.$cookies.set('user_icon', userInfo.headIcon, 60 * 30);

              // 跳转到首页
              _this.$router.push('/');
            }
          });

        }
      },
      goRegister: function () {
        this.$store.pageTitle = 'Register';
        this.$router.push('/register');
      },
      goForgetPassword: function () {
        this.$store.pageTitle = 'Forget Password';
        this.$router.push('/forgetpass');
      }
    }
  }
</script>

<style scoped>

</style>
