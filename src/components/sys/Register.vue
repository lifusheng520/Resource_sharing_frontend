<template>
  <div>

    <PageTitle></PageTitle>

    <!-- register begin-->
    <div class="contact login">
      <div class="container">

        <div class="row justify-content-center">
          <div class="col-xl-6 col-lg-6">
            <div class="section-title text-center">
              <h2>注&nbsp;册&nbsp;<span>你的账号</span></h2>
              <p>把你的分享想法付诸行动，进行全方位的投资。享受实在的便利和服务，您的资料管家~</p>
            </div>
          </div>
        </div>

        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-8">

            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                     class="demo-ruleForm">

              <el-form-item label="账号" prop="username">
                <el-input type="text" v-model="ruleForm.username"></el-input>
              </el-form-item>

              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立 即 注 册</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
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
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
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
            {required: true, message: '账号不能为空', trigger: 'blur'},
            {min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur'}
          ],
          password: [
            {validator: validatePass, trigger: 'blur'},
            {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
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
                    message: resData.code + '~~~~' + resData.message,
                    type: 'success'
                  });

                  // 注册成功，跳转登录页面
                  _this.$store.pageTitle = "Login";
                  _this.$router.push("/login");

                } else if (resData.code === 1004) {
                  _this.$message.error(resData.code + '~~注册失败~~');
                } else if (resData.code === 1005) {
                  _this.$message({
                    message: resData.code + '~~~~' + resData.message,
                    type: 'error'
                  });
                }
              } else {
                // 注册失败，不做跳转
                _this.$message.error('注册错误，请重新注册~~');
              }
            });
          } else {
            _this.$message.error('错误的提交~~');
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
