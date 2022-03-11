<template>
  <div>
    <PageTitle></PageTitle>

    <!-- forgetPassword begin-->
    <div class="contact login">
      <div class="container">

        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-8">

            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                     class="demo-ruleForm">

              <el-form-item label="账 号" prop="username">
                <el-input type="text" v-model="ruleForm.username"></el-input>
              </el-form-item>

              <el-form-item label="新的密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="重复确认" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确 认 修 改</el-button>
                <el-button @click="resetForm('ruleForm')">重 置</el-button>
              </el-form-item>

            </el-form>

          </div>
        </div>
      </div>
    </div>
    <!-- forgetPassword end -->

  </div>
</template>

<script>
  import PageTitle from './PageTitle'

  export default {
    name: "ForgetPassword",
    components: {PageTitle},
    data() {
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
            {required: true, message: '请输入新的密码', trigger: 'blur'},
            {min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur'}
          ],
          checkPass: [
            {required: true, message: '请确认新的密码', trigger: 'blur'},
            {min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        // 验证表单
        if (!this.validateForm()) return;


      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      validateForm() {
        let ulen = this.ruleForm.username.length;
        let plen = this.ruleForm.password.length;
        if (!ulen && !plen)
          return false;
        if (!(ulen >= 5 && ulen <= 10))
          return false;
        if (!(plen >= 6 && plen <= 10))
          return false;
        if (this.ruleForm.password !== this.ruleForm.checkPass) {
          this.$message({
            message: '两次输入的密码不一致~~',
            type: 'error'
          });
          return false;
        }
        return true;
      }
    }
  }
</script>

<style scoped>

</style>
