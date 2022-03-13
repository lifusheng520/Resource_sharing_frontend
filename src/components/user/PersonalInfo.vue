<template>
  <div id="div_personal_info">

    <!--    头像-->
    <p style="line-height: 15px">
      <el-avatar :size="140" @error="errorHandler">
        <img v-if="this.userInfo.headIcon" v-bind:src="this.userInfo.headIcon"/>
        <img v-else src="../../../static/img/none.png"/>
      </el-avatar>
      <br><br>
      <el-button type="primary" size="small" @click="this.iconDialogFormVisible = true">上传头像<i class="el-icon-upload el-icon--right"></i></el-button>
    </p>
    <!-- Form -->
      <el-dialog title="收货地址" :visible.sync="this.iconDialogFormVisible">
      <el-form :model="iconForm">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="iconForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="iconDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="this.iconDialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
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
            <span v-if="this.userInfo.create_time">{{formatTime(this.userInfo.create_time)}}</span>
            <span v-else>未填写</span>
          </el-descriptions-item>

          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-connection"></i>
              安全邮箱
            </template>

            <span v-if="this.userInfo.email">{{this.userInfo.email}}</span>
            <span v-else>
              未绑定
              <el-button style="margin-left: 40px;" type="success" size="mini" icon="el-icon-plus">绑定</el-button>
            </span>

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
          <el-dialog title="收货地址" :visible.sync="dialogFormVisible">

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
        }
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
      });
    },
    methods: {
      errorHandler() {
        return true
      },
      formatTime(timeMill) {  // 格式化时间戳
        let date = new Date(timeMill);
        let year = date.getFullYear();
        let mon = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        return year + '-' + mon + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
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
