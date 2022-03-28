<template>
  <div id="content_div">
    <el-empty v-if="this.isEmpty" style="margin: 20%" description="网络开小差了，请重新登录~~~"></el-empty>
    <div v-else>

      <h3><strong>忘记密码</strong></h3><br>

      <p>如果还没有绑定邮箱请先绑定你的安全邮箱，修改密码需要邮箱验证本人身份</p><br><br>

      <div style="width: 380px;margin: 0px auto">
        <el-form :model="user" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

          <el-form-item label="新密码" prop="password">
            <el-input v-model="user.password"></el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="user.checkPass"></el-input>
          </el-form-item>

          <el-form-item label="验证码" prop="verifyCode">
            <el-input v-model="user.verifyCode" style="width: 30%"></el-input>
            <el-button style="margin-left: 10%" type="primary" :loading="this.needWaitting" v-on:click="sendEmail"
                       round>
              {{this.sendEmailButtionMessage}}
            </el-button>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
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
          callback(new Error('请再次输入密码'));
        } else if (value !== this.user.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        isEmpty: true,
        sendEmailButtionMessage: '发送',
        needWaitting: false,
        user: {
          username: '',
          password: '',
          checkPass: '',
          verifyCode: ''
        },
        rules: {
          verifyCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'},
            {min: 6, max: 6, message: '验证码长度在 6 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'},
            {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
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
        this.$message.warning('登录信息已失效，请重新登录~~~~');
        this.isEmpty = true;
      }
    },
    methods: {
      submitForm(formName) {
        this.user.password = this.user.password.replace(/\s*/g, '');
        this.user.checkPass = this.user.checkPass.replace(/\s*/g, '');
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/user/updatePass', this.user).then(res => {
              let resData = res.data;
              if (resData.code === 1010) {
                this.$message({
                  message: resData.code + '~~~~' + resData.message,
                  type: 'success',
                  duration: 3000
                });
              } else {
                this.$message({
                  message: resData.code + '~~~~' + resData.message,
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
            out_this.sendEmailButtionMessage = seconds + '秒后重新发送';
            if (seconds <= 0) {
              out_this.needWaitting = false;
              out_this.sendEmailButtionMessage = '发送';
              window.clearInterval(timerHandle);
            }
            --seconds;
          }, 1000);

          this.$axios.get(`/user/authEmail/${this.user.username}`).then(res => {
            let resData = res.data;
            console.log(res.data);
            if (resData.code === 4006) {
              this.$message({
                message: resData.code + '~~~~' + resData.message + '~~注意查收',
                type: 'success',
                duration: 3000
              });

            } else {
              this.$message.error(resData.code + '~~~' + resData.message);
              this.needWaitting = false;
            }
          });
        } else {
          this.$message.error('获取用户信息失败~~~');
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
