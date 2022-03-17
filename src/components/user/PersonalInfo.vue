<template>
  <el-empty v-if="this.isEmpty" description="网络开小差了，请重新登录~~~"></el-empty>
  <div v-else id="div_personal_info">

    <!--    头像-->
    <p style="line-height: 15px">
      <el-avatar :size="140" @error="errorHandler">
        <img v-if="this.userInfo.headIcon" v-bind:src="this.userInfo.headIcon"/>
        <img v-else src="../../../static/img/none.png"/>
      </el-avatar>
      <br><br>
      <el-button type="primary" size="small" @click="iconDialogFormVisible = true">上传头像<i
        class="el-icon-upload el-icon--right"></i></el-button>
      <!-- Form -->
      <el-dialog title="上传头像" :visible.sync="iconDialogFormVisible">

        <el-form :model="iconForm">

          <el-upload
            class="upload-demo"
            drag name="file" with-credentials accept=".jpg,.png"
            :on-success="handleAvatarSuccess"
            :on-error="handleAvatarFail"
            :before-upload="beforeAvatarUpload"
            :action="'http://localhost:8080/user/uploadIcon/' + userInfo.id">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过10MB</div>
          </el-upload>

        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="iconDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="iconDialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </p>
    <!--    头像-->

    <!--    content description begin-->
    <div>
      <form action="" disabled>
        <el-descriptions class="margin-top" title="账号信息" :column="1" :size="size" border>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-s-check"></i>
              账号
            </template>
            <span v-if="this.userInfo.username">
              {{this.userInfo.username}}
            </span>
            <span v-else>未填写</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              姓名
            </template>
            <span v-if="this.userInfo.name">{{this.userInfo.name}}</span>
            <span v-else>未填写</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-question"></i>
              性别
            </template>
            <span v-if="this.userInfo.sex">{{this.userInfo.sex}}</span>
            <span v-else>未填写</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-lock"></i>
              账号状态
            </template>
            <span v-if="this.userInfo.enabled === 1">
              <el-button type="success" round size="mini" disabled>正常使用</el-button>
            </span>
            <span v-else>
              <el-button type="danger" round size="mini" disabled>封禁状态</el-button>
            </span>
          </el-descriptions-item>

          <el-descriptions-item :key="index" v-for="(role, index) in this.userInfo.roles">
            <template slot="label">
              <i class="el-icon-postcard"></i>
              系统权限-{{index + 1}}
            </template>
            <span v-if="role">{{role}}&nbsp;&nbsp;权限</span>
            <span v-else>未填写</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-date"></i>
              创建时间
            </template>
            <span v-if="this.userInfo.create_time">{{this.userInfo.create_time}}</span>
            <span v-else>未填写</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-connection"></i>
              安全邮箱
            </template>
            <span v-if="this.userInfo.email">
              {{this.userInfo.email}}
              <el-button style="margin-left: 60%;" type="success" size="mini" icon="el-icon-plus"
                         @click="centerDialogVisible = true">修改绑定</el-button>
            </span>
            <span v-else>
              未绑定
              <el-button style="margin-left: 60%;" type="success" size="mini" icon="el-icon-plus"
                         @click="centerDialogVisible = true">绑定</el-button>
            </span>
            <el-dialog title="绑定您的安全邮箱" :visible.sync="centerDialogVisible" width="40%" center>
              <p style="font-size: 15px;color: black">
                绑定安全邮箱作用于您的身份验证，不会拿您的邮箱做其他用途，请放心绑定~~~<br>例如：更改您的密码
              </p>
              <!--  form  -->
              <el-form :model="emailForm" label-width="100px" class="demo-dynamic">
                <el-form-item prop="email" label="邮箱" :rules="this.rules.email">
                  <el-input v-model="emailForm.email"></el-input>
                </el-form-item>
                <el-form-item class="demo-form-inline" prop="verifyCode" label="验证码" :rules="this.rules.verifyCode">
                  <el-input v-model="emailForm.verifyCode"></el-input>
                </el-form-item>
              </el-form>
              <p>
                <el-button type="primary" :loading="this.needWaitting" v-on:click="sendEmail">
                  {{this.sendEmailButtionMessage}}
                </el-button>
              </p>
              <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="bindEmail">确 定</el-button>
                  <el-button @click="centerDialogVisible = false">取 消</el-button>
                </span>
            </el-dialog>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class=""></i>
              联系地址
            </template>
            <span v-if="this.userInfo.address">{{this.userInfo.address}}</span>
            <span v-else>未填写</span>
          </el-descriptions-item>

        </el-descriptions>
        <p>
          <br>
          <el-button type="primary" size="small" @click="dialogFormVisible = true">修改我的信息<i
            class="el-icon-edit el-icon--right"></i></el-button>
          <!-- Form -->
          <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible">

            <el-form :model="updateForm">

              <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="updateForm.name" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="性别" :label-width="formLabelWidth">
                <el-radio-group v-model="updateForm.sex">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="联系地址" :label-width="formLabelWidth">
                <el-input v-model="updateForm.address" autocomplete="off">{{userInfo.address}}</el-input>
              </el-form-item>

            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="updateUserInfo(updateForm)">确 定</el-button>
              <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>

          </el-dialog>
        </p>
      </form>
    </div>
    <!--    content description end-->

  </div>
</template>

<script>
  export default {
    name: "PersonalInfo",
    data() {
      return {
        size: '',
        isEmpty: true,
        userInfo: {
          id: '',
          name: '',
          sex: '',
          username: '',
          address: '',
          email: '',
          create_time: '',
          enabled: '',
          headIcon: '',
          roles: []
        },
        dialogFormVisible: false,
        updateForm: {
          id: '',
          name: '',
          sex: '',
          address: ''
        },
        formLabelWidth: '120px',
        iconDialogFormVisible: false,
        iconForm: {
          name: ''
        },
        centerDialogVisible: false,
        emailForm: {
          id: '',
          email: '',
          verifyCode: ''
        },
        rules: {
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
          ],
          verifyCode: [
            {required: true, message: '请输入验证码', trigger: 'blur'}
          ]
        },
        needWaitting: false,
        sendEmailButtionMessage: '发送验证码'
      };
    },
    created() {
      //从cookies中获取用户名
      let username = this.$cookies.get('username');
      if (!username) {
        this.$message({
          message: '请先登录再查看喔~',
          type: 'warning'
        });
        this.$router.push('/');
      }
      let _this = this;
      //到数据库中请求用户数据
      this.$axios.get(`/user/getInfo/${username}`).then(res => {
        let resData = res.data;
        console.log(resData);
        if (!resData.data) {  // 未查询到用户数据
          this.$message({
            message: resData.code + '~~~~' + resData.message,
            type: 'success',
            duration: 5000
          });
          return;
        }
        let userInfo = resData.data;
        _this.userInfo.address = userInfo.address;
        _this.userInfo.create_time = userInfo.create_time;
        _this.userInfo.email = userInfo.email;
        _this.userInfo.enabled = userInfo.enabled;
        _this.userInfo.headIcon = userInfo.headIcon;
        _this.userInfo.id = userInfo.id;
        _this.userInfo.name = userInfo.name;
        _this.userInfo.roles = userInfo.roles;
        _this.userInfo.sex = userInfo.sex;
        _this.userInfo.username = userInfo.username;

        this.$message({
          message: resData.code + '~~~~' + resData.message,
          type: 'success',
          duration: 1500
        });
        _this.isEmpty = false;
      });
    },
    methods: {
      errorHandler() {
        return true
      },
      updateUserInfo(form) {
        //  关闭对话框
        this.dialogFormVisible = false;
        if (this.validForm(form)) {
          // 添加用户id
          form.id = this.userInfo.id;
          const _this = this;
          this.$axios.post('/user/updateInfo', form).then(res => {
            console.log(res);
            let resData = res.data;
            if (resData.code === 4001) {
              this.$message({
                message: resData.code + '~~~~' + resData.message,
                type: 'success',
                duration: 1500
              });

              _this.$router.go(0);
            } else {
              this.$message({
                message: resData.code + '~~~~' + resData.message,
                type: 'error',
                duration: 1500
              });
            }
          });
        }
      },
      validForm(form) {
        let name = form.name;
        let sex = form.sex;
        let address = form.address;
        if (!name) {
          this.$message.error('姓名不能为空~~');
          return false;
        }
        if (!sex) {
          this.$message.error('性别不能为空~~');
          return false;
        }
        if (!address) {
          this.$message.error('地址不能为空~~');
          return false;
        }
        return true;
      },
      handleAvatarSuccess(res, file) {
        if (res.code === 4003) {
          this.$message({
            message: res.code + '~~~~' + res.message,
            type: 'success',
            duration: 1500
          });
        }
        this.userInfo.headIcon = URL.createObjectURL(file.raw);
        console.log('------------->' + this.userInfo.headIcon)
      },
      handleAvatarFail(res, file) {
        this.$message.error(res.code + '~~~~' + res.message);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      sendEmail() {
        this.emailForm.id = this.userInfo.id;
        const out_this = this;
        this.needWaitting = true;
        if (this.validEmail(this.emailForm.email)) {
          this.$axios.post('/user/sendVerifyCode', this.emailForm).then(res => {
            let resData = res.data;
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
        } else {
          this.$message.error('请填写正确的邮箱~~~');
        }
      },
      bindEmail() {
        if (!this.emailForm.verifyCode) {
          this.$message.error('请输入验证码~~~');
          return;
        }
        if (!this.validEmail(this.emailForm.email)) {
          this.$message.error('请输入邮箱号~~~');
        } else {
          this.emailForm.id = this.userInfo.id;
          let out_this = this;
          this.$axios.post('/user/bindEmail', this.emailForm).then(res => {
            console.log(res.data);
            let resData = res.data;
            if (resData.code === 4009) {
              this.$message({
                message: resData.code + '~~~~' + resData.message,
                type: 'success',
                duration: 1500
              });
              out_this.$router.go(0);
            } else {
              this.$message({
                message: resData.code + '~~~~' + resData.message,
                type: 'error',
                duration: 1500
              });
            }
          });
        }
      },
      validEmail(email) {
        let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        return reg.test(email);
      }
    }
  }
</script>

<style scoped>
  p {
    text-align: center;
  }

  #div_personal_info {
    width: 90%;
    margin: 5% auto;
  }

</style>
