<template>
  <div id="div_user_manager_box">
    <el-empty v-if="userTableList.length === 0" style="margin: 20% auto" :description="`${$t('userManager.withoutUserInfo')}`"></el-empty>
    <div v-else>

      <h3>{{$t('userManager.title')}}</h3>

      <div style="width: 100%;">

        <div style="width: 100%;">
          <el-button @click="dialogFormVisible = true" icon="el-icon-plus" type="primary" size="small">
            {{$t('userManager.addUser')}}
          </el-button>
          <el-button v-show="tableSelectList.length !== 0" @click="addLockOnUserAccount" type="danger" size="small"
                     round>
            {{$t('userManager.lockAccount')}}
          </el-button>
          <el-button v-show="tableSelectList.length !== 0" @click="unlockUserAccount" type="success" size="small"
                     round>
            {{$t('userManager.activateAccount')}}
          </el-button>

          <el-dialog :title="`${$t('userManager.addUserAccount')}`" width="500px" center :visible.sync="dialogFormVisible">

            <el-form :model="addUserForm" :rules="rules">

              <el-form-item :label="`${$t('userManager.username')}`" prop="username">
                <el-input v-model="addUserForm.username" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item :label="`${$t('userManager.password')}`" prop="password">
                <el-input v-model="addUserForm.password" type="password" show-password autocomplete="off"></el-input>
              </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">{{$t('userManager.cancel')}}</el-button>
              <el-button type="primary" @click="addUserHandler">{{$t('userManager.confirmation')}}</el-button>
            </div>
          </el-dialog>
        </div>

        <!--        表格-->
        <el-table :data="userTableList" ref="multipleTable"
                  style="width: 100%;" @selection-change="handleSelectionChange"
                  :default-sort="{prop: 'create_time', order: 'descending'}">

          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="create_time" :label="`${$t('userManager.registerDate')}`" sortable min-width="150"></el-table-column>
          <el-table-column prop="username" :label="`${$t('userManager.account')}`" min-width="110"></el-table-column>
          <el-table-column prop="name" :label="`${$t('userManager.alias')}`" min-width="100"></el-table-column>
          <el-table-column prop="enabled" :label="`${$t('userManager.state')}`" min-width="100">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.enabled === 1" type="success">
                {{$t('userManager.using')}}
              </el-tag>
              <el-tag v-else type="danger">
                <i class="fa fa-lock"></i>{{$t('userManager.locked')}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="email" :label="`${$t('userManager.email')}`" min-width="150"></el-table-column>

          <el-table-column prop="roles" :label="`${$t('userManager.privilege')}`" min-width="100">
            <template slot-scope="scope">
              <el-tag v-for="(item, index) in scope.row.roles" :key="index" type="danger">
                {{item}}
              </el-tag>
            </template>
          </el-table-column>

        </el-table>
      </div>

      <div class="block" align="center">
        <br>
        <el-pagination
          background @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="userPageData.currentPage" :page-size="userPageData.pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="userPageData.total">
        </el-pagination>
      </div>

    </div>
  </div>

</template>

<script>
  export default {
    name: "UserManager",
    data() {
      return {
        // 用户列表分页数据
        userPageData: {
          user_id: '',
          currentPage: -1,
          pageSize: 10,
          total: -1,
        },
        // 用户表格list
        userTableList: [],
        // 选中的内容list
        tableSelectList: [],

        // 添加用户表单
        addUserForm: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            {required: true, message: this.$t('userManager.rule1'), trigger: 'blur'},
            {min: 5, max: 10, message: this.$t('userManager.rule2'), trigger: 'blur'}
          ],
          password: [
            {required: true, message: this.$t('userManager.rule3'), trigger: 'blur'},
            {min: 6, max: 20, message: this.$t('userManager.rule4'), trigger: 'blur'}
          ],
        },
        dialogFormVisible: false,
        deleteButtonVisible: false,
      }
    },
    created() {
      // 获取登录的管理员信息
      this.getAdminLoginInfo();

      // 加载用户的账号信息
      this.loadUserAccountInfoList();

    },
    methods: {
      // 每页的大小改变事件
      handleSizeChange(val) {
        this.userPageData.pageSize = val;
        this.loadUserAccountInfoList();
      },
      // 翻页事件
      handleCurrentChange(val) {
        this.userPageData.currentPage = val;
        this.loadUserAccountInfoList();
      },
      // 获取登录的管理员信息
      getAdminLoginInfo() {
        let id = this.$cookies.get('user_id');
        if (id) {
          this.userPageData.user_id = id;
          return id;
        } else {
          this.$message.info(this.$t('sessionExpired'));
          return false;
        }
      },
      // 加载用户的账号信息
      loadUserAccountInfoList() {
        let out_this = this;
        this.$axios.post('/admin/getUserList', this.userPageData).then(response => {
          let resData = response.data;
          console.log(resData);
          if (resData.code === 8001) {
            out_this.userPageData.currentPage = resData.data.currentPage;
            out_this.userPageData.pageSize = resData.data.pageSize;
            out_this.userPageData.total = resData.data.total;
            out_this.userTableList = resData.data.pageList;
          } else if (resData.code == 1007) {
            out_this.$message.error(resData.code + '~~~~' + out_this.$t('withoutPrivilegeError'));
          } else {
            out_this.$message.error(resData.code + '~~~~' + out_this.$t('serverError'));
          }
        });
      },

      // 选择发生变化时的事件
      handleSelectionChange() {
        // 遍历选择列表，去除管理员权限选项
        for (let i = 0; i < this.$refs.multipleTable.selection.length; ++i) {
          let flag = false;
          for (let j = 0; j < this.$refs.multipleTable.selection[i].roles.length; ++j)
            if (this.$refs.multipleTable.selection[i].roles[j] === 'admin') {
              flag = true;
              break;
            }

          if (flag) {
            this.$refs.multipleTable.selection.splice(i, 1);
            this.$message.info(this.$t('userManager.insufficientPrivilege'));
          }
        }
        this.tableSelectList = this.$refs.multipleTable.selection;
      },
      //取消选择
      cancelSelectionHandler() {
        this.$refs.multipleTable.clearSelection();
        this.tableSelectList = [];
      },

      // 添加用户处理函数
      addUserHandler() {
        // 校验表单
        let val = this.invalidForm();
        if (!val)
          return;

        // 发起注册请求
        let out_this = this;
        this.$axios.post('/auth/register', this.addUserForm).then(response => {
          let resData = response.data;
          console.log(resData);
          if (resData.code === 1003) {
            out_this.$message({
              message: resData.code + '~~~~' + out_this.$t('userManager.registerSuccess'),
              type: 'success',
              duration: 2000
            });

            // 重新加载账号信息list
            out_this.loadUserAccountInfoList();
          } else {
            out_this.$message.error(resData.code + '~~~~' + out_this.$t('userManager.registerFailed'));
          }
        });

        this.cancelSelectionHandler();
        this.dialogFormVisible = false
      },
      // 判断表单是否符合要求
      invalidForm() {
        let username = this.addUserForm.username;
        let password = this.addUserForm.password;
        if (username.replace(/\s*/g, '').length === 0) {
          this.$message.error(this.$t('userManager.rule5'));
          return false;
        }

        if (username.includes(' ')) {
          this.$message.error(this.$t('userManager.rule6'));
          return false;
        }

        if (password.replace(/\s*/g, '').length === 0) {
          this.$message.error(this.$t('userManager.rule7'));
          return false;
        }

        if (password.includes(' ')) {
          this.$message.error(this.$t('userManager.rule8'));
          return false;
        }

        let nameLen = username.length;
        let passLen = password.length;
        if (!(nameLen >= 5 && nameLen <= 10))
          return false;
        if (!(passLen >= 6 && passLen <= 20))
          return false;

        return true;
      },

      // 冻结账号
      addLockOnUserAccount() {
        this.tableSelectList = this.clearRepeatedHandler(this.tableSelectList, 0);
        if(this.tableSelectList.length ===0){
          this.$message.info(this.$t('userManager.invalidSelection'));
          return;
        }

        let out_this = this;
        this.$axios.post('/admin/lockAccounts', this.tableSelectList).then(response => {
          let resData = response.data;
          console.log(resData);
          if (resData.code === 8002) {
            out_this.$message({
              message: resData.code + '~~~~  ' + out_this.$t('operationSuccess'),
              type: 'success',
              center: true,
              duration: 2000
            });

            // 根据后端返回的被冻结账号id，更新表格视图
            let lockIds = resData.data;
            for (let i = 0; i < lockIds.length; ++i)
              for (let j = 0; j < out_this.userTableList.length; ++j)
                if (lockIds[i] === out_this.userTableList[j].id)
                  out_this.userTableList[j].enabled = 0;

          } else {
            out_this.$message.error(resData.code + '~~~~' + out_this.$t('serverError'));
          }
        });

        this.cancelSelectionHandler();
      },
      // 解禁账号
      unlockUserAccount() {
        this.tableSelectList = this.clearRepeatedHandler(this.tableSelectList, 1);
        if(this.tableSelectList.length ===0){
          this.$message.info(this.$t('userManager.invalidSelection'));
          return;
        }

        let out_this = this;
        this.$axios.post('/admin/unlockAccounts', this.tableSelectList).then(response => {
          let resData = response.data;
          console.log(resData);
          if (resData.code === 8004) {
            out_this.$message({
              message: resData.code + '~~~~  ' + out_this.$t('operationSuccess'),
              type: 'success',
              center: true,
              duration: 2000
            });

            // 根据后端返回的激活账号id，更新表格视图
            let unlockIds = resData.data;
            for (let i = 0; i < unlockIds.length; ++i)
              for (let j = 0; j < out_this.userTableList.length; ++j)
                if (unlockIds[i] === out_this.userTableList[j].id)
                  out_this.userTableList[j].enabled = 1;

          } else {
            out_this.$message.error(resData.code + '~~~~' + out_this.$t('serverError'));
          }
        });

        this.cancelSelectionHandler();
      },
      // 将重复处理的内容清除,将账号状态不为val的去除
      clearRepeatedHandler(list, val) {
        let result = [];
        for (let i = 0; i < list.length; ++i)
          if (list[i].enabled !== val)
            result.push(list[i]);
        return result;
      },


    }
  }
</script>

<style scoped>

  #div_user_manager_box {
    width: 100%;
  }

  #div_user_manager_box > div {
    margin: 3%;
    width: 94%;
  }

</style>
