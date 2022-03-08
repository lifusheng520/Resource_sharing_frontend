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
                <el-input v-model.number="ruleForm.username"></el-input>
              </el-form-item>

              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          username: '',
          pass: '',
          checkPass: ''
        },
        rules: {
          username: [
            {required: true, message: '账号不能为空', trigger: 'blur'},
            {min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur'}
          ],
          pass: [
            {validator: validatePass, trigger: 'blur'},
            {min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur'}
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
            alert('submit!');
            // 发起请求
            this.$axios.post('http://localhost:8080/register', this.ruleForm).then(res => {
              console.log(res);
            });



          } else {
            this.$message({
              message: '错误的提交！',
              type: 'error'
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    register: function () {
      // 获取用户名和密码


      // 向后端服务器发起注册请求 post


      this.$store.pageTitle = "Login";
      this.$router.push("/login");
    }
  }
</script>

<style scoped>

</style>
