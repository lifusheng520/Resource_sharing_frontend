<template>

  <div id="div_personal_info">

    <el-empty v-if="this.isEmpty" style="margin: 20%" :description="emptyDescriptionContent"></el-empty>
    <div v-else>

      <!--    头像-->
      <p style="line-height: 15px">
        <el-avatar :size="140" @error="errorHandler">
          <img v-if="this.userInfo.headIcon" v-bind:src="this.userInfo.headIcon"/>
          <img v-else src="static/img/none.png"/>
        </el-avatar>
        <br><br>
        <el-button type="primary" size="small" @click="iconDialogFormVisible = true">
          {{$t('personalInfo.avatarUpload')}}<i class="el-icon-upload el-icon--right"></i>
        </el-button>
        <!-- Form -->
        <el-dialog :title="`${$t('personalInfo.avatarUpload')}`" :visible.sync="iconDialogFormVisible">

          <el-form :model="iconForm">

            <el-upload
              class="upload-demo"
              drag name="file" with-credentials accept=".jpg,.png"
              :on-success="handleAvatarSuccess"
              :on-error="handleAvatarFail"
              :before-upload="beforeAvatarUpload"
              :action="`${backendURL}/user/uploadIcon/` + userInfo.id">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                {{$t('personalInfo.uploadPrompt')}}<em>{{$t('personalInfo.clickUpload')}}</em>
              </div>
              <div class="el-upload__tip" slot="tip">{{$t('personalInfo.avatarUploadNotice')}}</div>
            </el-upload>

          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button @click="iconDialogFormVisible = false">{{$t('cancelButton')}}</el-button>
            <el-button type="primary" @click="iconDialogFormVisible = false">{{$t('confirmButton')}}</el-button>
          </div>
        </el-dialog>
      </p>
      <!--    头像-->

      <!--    content description begin-->    
      <div>
        <form action="" disabled>
          <el-descriptions class="margin-top" :title="`${$t('personalInfo.accountInfo')}`" :column="1" :size="size" border>

            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-s-check"></i>
                {{$t('personalInfo.account')}}
              </template>
              <span v-if="this.userInfo.username">
              {{this.userInfo.username}}
            </span>
              <span v-else>{{$t('personalInfo.uninputed')}}</span>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                {{$t('personalInfo.alias')}}
              </template>
              <span v-if="this.userInfo.name">{{this.userInfo.name}}</span>
              <span v-else>{{$t('personalInfo.uninputed')}}</span>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-question"></i>
                {{$t('personalInfo.gender')}}
              </template>
              <span v-if="this.userInfo.sex">{{this.userInfo.sex == '男' ? this.$t('personalInfo.boy') : this.$t('personalInfo.girl')}}</span>
              <span v-else>{{$t('personalInfo.uninputed')}}</span>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-lock"></i>
                {{$t('personalInfo.accountState')}}
              </template>
              <span v-if="this.userInfo.enabled === 1">
              <el-button type="success" round size="mini" disabled>{{$t('personalInfo.using')}}</el-button>
            </span>
              <span v-else>
              <el-button type="danger" round size="mini" disabled>{{$t('personalInfo.locked')}}</el-button>
            </span>
            </el-descriptions-item>

            <el-descriptions-item :key="index" v-for="(role, index) in this.userInfo.roles">
              <template slot="label">
                <i class="el-icon-postcard"></i>
                {{$t('personalInfo.system') + $t('personalInfo.privilege')}} - {{index + 1}}
              </template>
              <span v-if="role">{{role}}&nbsp;&nbsp;{{$t('personalInfo.privilege')}}</span>
              <span v-else>{{$t('personalInfo.uninputed')}}</span>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-date"></i>
                {{$t('personalInfo.createDate')}}
              </template>
              <span v-if="this.userInfo.create_time">{{this.userInfo.create_time}}</span>
              <span v-else>{{$t('personalInfo.uninputed')}}</span>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-connection"></i>
                {{$t('personalInfo.bindedEmail')}}
              </template>
              <span v-if="this.userInfo.email">
              {{userInfo.email}}
              <el-button style="margin-left: 60%;" type="success" size="mini" icon="el-icon-plus"
                         @click="centerDialogVisible = true">{{$t('personalInfo.modifyBinding')}}</el-button>
            </span>
              <span v-else>
              {{$t('personalInfo.unbinded')}}
              <el-button style="margin-left: 60%;" type="success" size="mini" icon="el-icon-plus"
                         @click="centerDialogVisible = true">{{$t('personalInfo.bind')}}</el-button>
            </span>
              <el-dialog :title="`${$t('personalInfo.bind')}`" :visible.sync="centerDialogVisible" width="40%" center>
                <p style="font-size: 15px;color: black">
                  {{$t('personalInfo.bindingEmailNotice1')}}<br>
                  {{$t('personalInfo.bindingEmailNotice2')}}
                </p>
                <!--  form  -->
                <el-form :model="emailForm" label-width="100px" class="demo-dynamic">
                  <el-form-item prop="email" :label="`${$t('personalInfo.email')}`" :rules="this.rules.email">
                    <el-input v-model="emailForm.email"></el-input>
                  </el-form-item>
                  <el-form-item class="demo-form-inline" prop="verifyCode" :label="`${$t('personalInfo.verifyCode')}`" :rules="this.rules.verifyCode">
                    <el-input v-model="emailForm.verifyCode"></el-input>
                  </el-form-item>
                </el-form>
                <p>
                  <el-button type="primary" :loading="this.needWaitting" v-on:click="sendEmail">
                    {{sendEmailButtionMessage}}
                  </el-button>
                </p>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="bindEmail">{{$t('confirmButton')}}</el-button>
                  <el-button @click="centerDialogVisible = false">{{$t('cancelButton')}}</el-button>
                </span>
              </el-dialog>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <i class=""></i>
                {{$t('personalInfo.contact')}}
              </template>
              <span v-if="this.userInfo.address">{{userInfo.address}}</span>
              <span v-else>{{$t('personalInfo.uninputed')}}</span>
            </el-descriptions-item>

          </el-descriptions>
          <p>
            <br>
            <el-button type="primary" size="small" @click="dialogFormVisible = true">
              {{$t('personalInfo.modifyInfo')}}
              <i class="el-icon-edit el-icon--right"></i>
            </el-button>
            <!-- Form -->
            <el-dialog :title="`${$t('personalInfo.modifyInfo')}`" :visible.sync="dialogFormVisible">

              <el-form :model="updateForm">

                <el-form-item :label="`${$t('personalInfo.alias')}`" :label-width="formLabelWidth">
                  <el-input v-model="updateForm.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item :label="`${$t('personalInfo.gender')}`" :label-width="formLabelWidth">
                  <el-radio-group v-model="updateForm.sex">
                    <el-radio :label="`${$t('personalInfo.boy')}`"></el-radio>
                    <el-radio :label="`${$t('personalInfo.girl')}`"></el-radio>
                  </el-radio-group>
                </el-form-item>

                <el-form-item :label="`${$t('personalInfo.contact')}`" :label-width="formLabelWidth">
                  <el-input v-model="updateForm.address" autocomplete="off">{{userInfo.address}}</el-input>
                </el-form-item>

              </el-form>

              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="updateUserInfo(updateForm)">
                  {{$t('confirmButton')}}
                </el-button>
                <el-button @click="dialogFormVisible = false">
                  {{$t('cancelButton')}}
                </el-button>
              </div>

            </el-dialog>
          </p>
        </form>
      </div>
      <!--    content description end-->


    </div>

  </div>
</template>

<script>
  export default {
    name: "PersonalInfo",
    data() {
      return {
        backendURL: this.$axios.defaults.baseURL,
        size: '',
        isEmpty: true,
        emptyDescriptionContent: '',
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
            {required: true, message: this.$t('personalInfo.rule1'), trigger: 'blur'},
            {type: 'email', message: this.$t('personalInfo.rule11'), trigger: ['blur', 'change']}
          ],
          verifyCode: [
            {required: true, message: this.$t('personalInfo.rule2'), trigger: 'blur'}
          ]
        },
        needWaitting: false,
        sendEmailButtionMessage: this.$t('personalInfo.sendEmailButton')
      };
    },
    created() {
      //从cookies中获取用户名
      let username = this.$cookies.get('username');
      if (!username) {
        this.$message({
          message: this.$t('sessionExpired'),
          type: 'warning'
        });
        this.isEmpty = true;
        this.$router.push('/');
      }
      let _this = this;
      //到数据库中请求用户数据
      this.$axios.get(`/user/getInfo/${username}`).then(res => {
        let resData = res.data;
        console.log(resData);
        if (!resData.data) {  // 未查询到用户数据
          _this.$message({
            message: resData.code + '~~~~' + _this.$t('serverError'),
            type: 'warning',
            duration: 2000
          });
          _this.emptyDescriptionContent = resData.code + ' ~~~~ ' + _this.$t('serverError');
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
            //console.log(res);
            let resData = res.data;
            if (resData.code === 4001) {
              
              _this.$router.go(0);
            } else {
              _this.$message({
                message: resData.code + '~~~~' + _this.$t('serverError'),
                type: 'error',
                duration: 1500
              });
            }
          });
        }
      },
      validForm(form) {
        let name = form.name.replace(/\s*/g, '');
        let sex = form.sex;
        let address = form.address.replace(/\s*/g, '');
        if (!name) {
          this.$message.error(this.$t('personalInfo.rule3'));
          return false;
        }
        if (!sex) {
          this.$message.error(this.$t('personalInfo.rule4'));
          return false;
        }
        if (!address) {
          this.$message.error(this.$t('personalInfo.rule5'));
          return false;
        }
        return true;
      },
      handleAvatarSuccess(res, file) {
        //console.log(file.response)
        this.userInfo.headIcon = file.response.data;

        this.$cookies.set('user_icon', file.response.data);

        this.$root.$emit('updateHeadIconEvent', file.response.data);
      },
      handleAvatarFail(res, file) {
        this.$message.error(res.code + '~~~~' + this.$t('serverError'));
      },
      beforeAvatarUpload(file) {
        console.log(file.type);
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error(this.$t('personalInfo.errorMessage1'));
        }
        if (!isLt2M) {
          this.$message.error(this.$t('personalInfo.errorMessage1'));
        }
        return isJPG && isLt2M;
      },
      sendEmail() {
        this.emailForm.id = this.userInfo.id;
        const out_this = this;
        if (this.validEmail(this.emailForm.email)) {
          // 验证码发送计时器
          this.needWaitting = true;
          let seconds = 60;
          const timerHandle = window.setInterval(function () {
            out_this.sendEmailButtionMessage = seconds + out_this.$t('personalInfo.suspendSending');
            if (seconds <= 0) {
              out_this.needWaitting = false;
              out_this.sendEmailButtionMessage = out_this.$t('personalInfo.sendEmailButton');
              window.clearInterval(timerHandle);
            }
            seconds--;
          }, 1000);

          this.$axios.post('/user/sendVerifyCode', this.emailForm).then(res => {
            let resData = res.data;
            if (resData.code === 4006) {
              out_this.$message({
                message: resData.code + ' ~~~~ ' + out_this.$t('personalInfo.sendingSuccess'),
                type: 'success',
                duration: 1500
              });
            } else {
              out_this.$message.error(resData.code + ' ~~~ ' + out_this.$t('serverError'));
              out_this.needWaitting = false;
              window.clearInterval(timerHandle);
            }
          });
        } else {
          this.$message.error(this.$t('personalInfo.rule11'));
        }
      },
      bindEmail() {
        if (!this.emailForm.verifyCode) {
          this.$message.error(this.$t('personalInfo.rule2'));
          return;
        }
        if (!this.validEmail(this.emailForm.email)) {
          this.$message.error(this.$t('personalInfo.rule1'));
        } else {
          this.emailForm.id = this.userInfo.id;
          let out_this = this;
          this.$axios.post('/user/bindEmail', this.emailForm).then(res => {
            //console.log(res.data);
            let resData = res.data;
            if (resData.code === 4009) {
              
              out_this.$router.go(0);
            } else {
              this.$message({
                message: resData.code + ' ~~~~ ' + out_this.$t('personalInfo.bindingFailed'),
                type: 'error',
                duration: 1500
              });
            }
          });
        }
      },
      validEmail(email) {
        let reg = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
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
