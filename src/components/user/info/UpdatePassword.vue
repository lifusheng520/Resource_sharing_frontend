<template>
  <div id="content_div">
    <el-empty v-if="this.isEmpty" style="margin: 20%" :description="`${$t('notFound404')}`"></el-empty>
    <div v-else>

      <h3><strong>{{$t('updatePassword.title')}}</strong></h3><br>

      <p>{{$t('updatePassword.notice')}}</p><br><br>

      <div style="width: 380px;margin: 0px auto">
        <el-form :model="user" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

          <el-form-item :label="`${$t('updatePassword.newPassword')}`" prop="password">
            <el-input v-model="user.password"></el-input>
          </el-form-item>

          <el-form-item :label="`${$t('updatePassword.confirmPassword')}`" prop="checkPass">
            <el-input v-model="user.checkPass"></el-input>
          </el-form-item>

          <el-form-item :label="`${$t('updatePassword.verifyCode')}`" prop="verifyCode">
            <el-input v-model="user.verifyCode" style="width: 30%"></el-input>
            <el-button style="margin-left: 10%" type="primary" :loading="this.needWaitting" v-on:click="sendEmail"
                       round>
              {{this.sendEmailButtionMessage}}
            </el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">{{$t('submitButton')}}</el-button>
            <el-button @click="resetForm('ruleForm')">{{$t('resetButton')}}</el-button>
          </el-form-item>

        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "UpdatePassword",
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('updatePassword.rule1')));
        } else if (value !== this.user.password) {
          callback(new Error(this.$t('updatePassword.rule11')));
        } else {
          callback();
        }
      };
      return {
        isEmpty: true,
        sendEmailButtionMessage: this.$t('updatePassword.sendEmailButtion'),
        needWaitting: false,
        user: {
          username: '',
          password: '',
          checkPass: '',
          verifyCode: ''
        },
        rules: {
          verifyCode: [
            {required: true, message: this.$t('updatePassword.rule2'), trigger: 'blur'},
            {min: 6, max: 6, message: this.$t('updatePassword.rule21'), trigger: 'blur'}
          ],
          password: [
            {required: true, message: this.$t('updatePassword.rule3'), trigger: 'blur'},
            {min: 6, max: 20, message: this.$t('updatePassword.rule31'), trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'},
            {min: 6, max: 20, message: this.$t('updatePassword.rule31'), trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      let uname = this.$cookies.get('username');
      if (uname) {
        this.user.username = uname;
        this.isEmpty = false;
      } else {
        this.$message.warning(this.$t('sessionExpired'));
        this.isEmpty = true;
      }
    },
    methods: {
      submitForm(formName) {
        this.user.password = this.user.password.replace(/\s*/g, '');
        this.user.checkPass = this.user.checkPass.replace(/\s*/g, '');

        let out_this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/user/updatePass', this.user).then(res => {
              let resData = res.data;
              if (resData.code === 1010) {
                out_this.$message({
                  message: resData.code + ' ~~~~ ' + out_this.$t('updateSuccess'),
                  type: 'success',
                  duration: 3000
                });
              } else {
                this.$message({
                  message: resData.code + ' ~~~~ ' + out_this.$t('serverError'),
                  type: 'error',
                  duration: 3000
                });
              }
            });
          }
        });
      },
      sendEmail() {
        const out_this = this;
        // 如果用户名有效
        if (this.user.username) {
          // 验证码发送成功后的计时器
          this.needWaitting = true;
          let seconds = 60;
          const timerHandle = window.setInterval(function () {
            out_this.sendEmailButtionMessage = seconds + out_this.$t('updatePassword.suspendSending');
            if (seconds <= 0) {
              out_this.needWaitting = false;
              out_this.sendEmailButtionMessage = out_this.$t('updatePassword.sendEmailButtion');
              window.clearInterval(timerHandle);
            }
            --seconds;
          }, 1000);

          this.$axios.get(`/user/authEmail/${this.user.username}`).then(res => {
            let resData = res.data;
            // console.log(res.data);
            if (resData.code === 4006) {
              out_this.$message({
                message: resData.code + ' ~~~~ ' + out_this.$t('updatePassword.sendingSuccess'),
                type: 'success',
                duration: 3000
              });
            
            } else if (resData.code == 4011) {
              out_this.$message({
                message: resData.code + ' ~~~~ ' + out_this.$t('updatePassword.emailNotExist'),
                type: 'warning',
                duration: 3000
              });
              window.clearInterval(timerHandle);
              out_this.needWaitting = false;
            } else {
              out_this.$message.error(resData.code + ' ~~~ ' + out_this.$t('serverError'));
              out_this.needWaitting = false;
              window.clearInterval(timerHandle);
            }
          });
        } else {
          this.$message.error(this.$t('sessionExpired'));
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  #content_div {
    text-align: center;
    width: 90%;
    margin: 15% auto;
  }
</style>
