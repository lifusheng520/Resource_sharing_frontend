<template>
  <div>

    <PageTitle></PageTitle>

    <!-- register begin-->
    <div class="contact login">
      <div class="container">

        <div class="row justify-content-center">
          <div class="col-xl-6 col-lg-6">
            <div class="section-title text-center">
              <h2>{{$t('register.register')}}&nbsp;<span>{{$t('register.register')}}你的账号</span></h2>
              <p>{{$t('register.introduction')}}</p>
            </div>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-8">

            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                     class="demo-ruleForm">

              <el-form-item :label="`${$t('register.account')}`" prop="username">
                <el-input type="text" v-model="ruleForm.username"></el-input>
              </el-form-item>

              <el-form-item :label="`${$t('register.password')}`" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item :label="`${$t('register.confirmPassword')}`" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">{{$t('register.registerButton')}}</el-button>
                <el-button @click="resetForm('ruleForm')">{{$t('register.reset')}}</el-button>
              </el-form-item>

            </el-form>

          </div>
        </div>
      </div>
    </div>
    <!-- register end -->


  </div>
</template>

<script>
  import PageTitle from "./PageTitle";

  export default {
    name: "Register",
    components: {PageTitle},
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('register.rule1')));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('register.rule2')));
        } else if (value !== this.ruleForm.password) {
          callback(new Error(this.$t('register.rule3')));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          username: '',
          password: '',
          checkPass: ''
        },
        rules: {
          username: [
            {required: true, message: this.$t('register.rule4'), trigger: 'blur'},
            {min: 5, max: 10, message: this.$t('register.rule5'), trigger: 'blur'}
          ],
          password: [
            {validator: validatePass, trigger: 'blur'},
            {min: 6, max: 20, message: this.$t('register.rule6'), trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let _this = this;
            // 发起注册请求
            this.$axios.post('/auth/register', this.ruleForm).then(res => {
              let resData = res.data;
              // 请求成功
              if (resData) {
                // 判断状态码
                if (resData.code === 1003) { // 注册成功
                  _this.$message({
                    message: resData.code + '~~~~' + _this.$t('register.registerSuccess'),
                    type: 'success'
                  });

                  // 注册成功，跳转登录页面
                  _this.$store.pageTitle = "Login";
                  _this.$router.push("/login");

                } else if (resData.code === 1004) {
                  _this.$message.error(resData.code + _this.$t('register.registerFailed'));
                } else if (resData.code === 1005) {
                  _this.$message({
                    message: resData.code + '~~~~' + _this.$t('register.accountExists'),
                    type: 'error'
                  });
                }
              } else {
                // 注册失败，不做跳转
                _this.$message.error(_this.$t('register.errorOccurred'));
              }
            });
          } else {
            _this.$message.error(_this.$t('register.errorSubmit'));
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
