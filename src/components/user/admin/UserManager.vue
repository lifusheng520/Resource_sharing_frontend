<template>
  <div id="div_user_manager_box">
    <el-empty v-if="userTableList.length === 0" style="margin: 20% auto" description="没有用户信息~~~"></el-empty>
    <div v-else>

      <h3>用户管理</h3>

      <div style="width: 100%;">

        <div style="width: 100%;" class="div-operation-button">
          <el-button @click="dialogFormVisible = true" icon="el-icon-plus" type="primary" size="small">
            添加用户
          </el-button>
          <el-button v-show="tableSelectList.length !== 0" @click="" type="danger" size="small" round>
            冻结账号
          </el-button>

          <el-dialog title="收货地址" width="500px" center :visible.sync="dialogFormVisible">

            <el-form :model="addUserForm" :rules="rules">

              <el-form-item label="用户名" prop="username">
                <el-input v-model="addUserForm.username" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="密码" prop="password">
                <el-input v-model="addUserForm.password" type="password" show-password autocomplete="off"></el-input>
              </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addUserHandler">确 定</el-button>
            </div>
          </el-dialog>
        </div>

        <!--        表格-->
        <el-table :data="userTableList" ref="multipleTable"
                  style="width: 100%;" @selection-change="handleSelectionChange"
                  :default-sort="{prop: 'create_time', order: 'descending'}">

          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="create_time" label="注册时间" sortable min-width="150"></el-table-column>
          <el-table-column prop="username" label="账号" min-width="110"></el-table-column>
          <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
          <el-table-column prop="enabled" label="状态" min-width="100">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.enabled === 1" type="success">使用中</el-tag>
              <el-tag v-else type="danger">已禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="email" label="绑定邮箱" min-width="150"></el-table-column>

          <el-table-column prop="roles" label="权限" min-width="100">
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
            {required: true, message: '账号不能为空', trigger: 'blur'},
            {min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'},
            {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
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
          this.$message.info('获取身份信息失败，请重新登录~~~');
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
          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }
        });
      },

      // 选择发生变化时的事件
      handleSelectionChange(val) {
        this.tableSelectList = val;
        console.log(val)
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
              message: resData.code + '~~~~' + resData.message,
              type: 'success',
              duration: 2000
            });

            // 重新加载账号信息list
            out_this.loadUserAccountInfoList();
          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }
        });


        this.dialogFormVisible = false
      },
      // 判断表单是否符合要求
      invalidForm() {
        let username = this.addUserForm.username;
        let password = this.addUserForm.password;
        if (username.replace(/\s*/g, '').length === 0) {
          this.$message.error('请输入正确的用户名');
          return false;
        }

        if (username.includes(' ')) {
          this.$message.error('用户名不能包含空格');
          return false;
        }

        if (password.replace(/\s*/g, '').length === 0) {
          this.$message.error('请输入正确的密码');
          return false;
        }

        if (password.includes(' ')) {
          this.$message.error('密码不能包含空格');
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
