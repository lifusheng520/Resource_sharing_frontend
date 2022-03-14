<template>
  <div>
    <PageTitle></PageTitle>

    <!-- forgetPassword begin-->
    <div class="contact login">
      <div class="container">

        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-8">

            <el-form style="text-align: center" :model="ruleForm" status-icon :rules="rules" ref="ruleForm"
                     label-width="100px"
                     class="demo-ruleForm">

              <el-form-item label="账 号" prop="username">
                <el-input type="text" v-model="ruleForm.username"></el-input>
              </el-form-item>

              <el-form-item label="新的密码" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="验证码" prop="verifyCode">
                <el-input type="text" v-model="ruleForm.verifyCode"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" :loading="this.needWaitting" v-on:click="sendEmail" round>
                  {{this.sendEmailButtionMessage}}
                </el-button>
              </el-form-item>

              <br>
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
          checkPass: '',
          verifyCode: ''
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
          ],
          verifyCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {min: 6, max: 6, message: '长度为 6 个字符', trigger: 'blur'}
          ]
        },
        needWaitting: false,
        sendEmailButtionMessage: '发送验证码'
      };
    },
    methods: {
      submitForm(formName) {
        // 验证表单
        if (this.validateForm()) {
          this.$axios.post('/user/updatePass', this.ruleForm).then(res => {
            let resData = res.data;
            console.log(resData);
          });
        } else {
          this.$message.error('表单内容不符合规则~~~');
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      validateForm() {
        let ulen = this.ruleForm.username.length;
        let plen = this.ruleForm.password.length;
        let vlen = this.ruleForm.verifyCode.length;
        if (!ulen || !plen || !vlen) {
          this.$message.error('请完善表单内容~~~');
          return false;
        }
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
      },
      sendEmail() {
        // 验证表单
        if (!this.ruleForm.username) {
          this.$message.error('请填写账号~~~');
          return;
        }
        const out_this = this;
        this.needWaitting = true;
        this.$axios.get(`/user/authEmail/${this.ruleForm.username}`).then(res => {
          let resData = res.data;
          console.log(resData);
          if (resData.code === 4006) {
            this.$message({
              message: resData.code + '~~~~' + resData.message + '~~注意查收',
              type: 'success',
              duration: 1500
            });
          } else {
            this.$message.error(resData.code + '~~~' + resData.message);
            out_this.needWaitting = false;
          }
          // 验证码发送成功后的计时器
          this.needWaitting = true;
          let seconds = 60;
          const timerHandle = window.setInterval(function () {
            out_this.sendEmailButtionMessage = seconds + '秒后重新发送';
            if (seconds <= 0) {
              out_this.needWaitting = false;
              out_this.sendEmailButtionMessage = '发送验证码';
              window.clearInterval(timerHandle);
            }
            seconds--;
          }, 1000);
        });
      }
    }
  }
</script>

<style scoped>
  p {
    text-align: center;
  }
</style>
