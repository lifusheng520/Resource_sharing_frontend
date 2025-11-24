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

              <el-form-item :label="`${$t('forgetPassword.account')}`" prop="username">
                <el-input type="text" v-model="ruleForm.username"></el-input>
              </el-form-item>

              <el-form-item :label="`${$t('forgetPassword.newPassword')}`" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item :label="`${$t('forgetPassword.confirmPassword')}`" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item :label="`${$t('forgetPassword.varificationCode')}`" prop="verifyCode">
                <el-input type="text" v-model="ruleForm.verifyCode"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" :loading="this.needWaitting" v-on:click="sendEmail" round>
                  {{this.sendEmailButtionMessage}}
                </el-button>
              </el-form-item>

              <br>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">{{$t('forgetPassword.confirm')}}</el-button>
                <el-button @click="resetForm('ruleForm')">{{$t('forgetPassword.reset')}}</el-button>
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
            {required: true, message: this.$t('forgetPassword.rule1'), trigger: 'blur'},
            {min: 5, max: 10, message: this.$t('forgetPassword.rule2'), trigger: 'blur'}
          ],
          password: [
            {required: true, message: this.$t('forgetPassword.rule3'), trigger: 'blur'},
            {min: 6, max: 20, message: this.$t('forgetPassword.rule4'), trigger: 'blur'}
          ],
          checkPass: [
            {required: true, message: this.$t('forgetPassword.rule5'), trigger: 'blur'},
            {min: 6, max: 20, message: this.$t('forgetPassword.rule4'), trigger: 'blur'}
          ],
          verifyCode: [
            {required: true, message: this.$t('forgetPassword.rule6'), trigger: 'blur'},
            {min: 6, max: 6, message: this.$t('forgetPassword.rule7'), trigger: 'blur'}
          ]
        },
        needWaitting: false,
        sendEmailButtionMessage: this.$t('forgetPassword.sendCode')
      };
    },
    methods: {
      submitForm(formName) {
        // 验证表单
        if (!this.validateForm()) return;

        this.$axios.post('/user/updatePass', this.ruleForm).then(res => {
          let resData = res.data;
          console.log(resData);
        });

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      validateForm() {
        let ulen = this.ruleForm.username.length;
        let plen = this.ruleForm.password.length;
        let vlen = this.ruleForm.verifyCode.length;
        if (!ulen || !plen || !vlen) {
          this.$message.error(this.$t('forgetPassword.invalidForm'));
          return false;
        }
        if (!(ulen >= 5 && ulen <= 10))
          return false;
        if (!(plen >= 6 && plen <= 20))
          return false;
        if (this.ruleForm.password !== this.ruleForm.checkPass) {
          this.$message({
            message: this.$t('forgetPassword.passwordMismatch'),
            type: 'error'
          });
          return false;
        }
        return true;
      },
      sendEmail() {
        // 验证表单
        if (!this.ruleForm.username) {
          this.$message.error(this.$t('forgetPassword.rule1'));
          return;
        }
        const out_this = this;
        this.needWaitting = true;
        // 验证码发送计时器
        let seconds = 60;
        const timerHandle = window.setInterval(function () {
          out_this.sendEmailButtionMessage = seconds + out_this.$t('forgetPassword.sending');
          if (seconds <= 0) {
            out_this.needWaitting = false;
            out_this.sendEmailButtionMessage = out_this.$t('forgetPassword.sendCode');
            window.clearInterval(timerHandle);
          }
          seconds--;
        }, 1000);

        this.$axios.get(`/user/authEmail/${this.ruleForm.username}`).then(res => {
          let resData = res.data;
          console.log(resData);
          if (resData.code === 4006) {
            this.$message({
              message: resData.code + '~~~~' + resData.message + out_this.$t('forgetPassword.checkEmail'),
              type: 'success',
              duration: 3000
            });
          } else {
            this.$message.error(resData.code + '~~~' + resData.message);
            this.needWaitting = false;
          }
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
