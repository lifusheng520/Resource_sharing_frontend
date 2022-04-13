<template>
  <div id="div_check_resource_box">
    <div>

      <h3>资源审批</h3>

      <div style="width: 100%;">

        <div style="width: 100%;" class="div-operation-button">
          <el-button @click="" icon="el-icon-plus" type="primary" size="small">
            添加用户
          </el-button>

        </div>

        <!--        表格-->
        <el-table :data="checkResourceTableList" ref="multipleTable"
                  style="width: 100%;" @selection-change="handleSelectionChange"
                  :default-sort="{prop: 'create_time', order: 'descending'}">

          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="create_time" label="注册时间" sortable min-width="150"></el-table-column>


        </el-table>
      </div>

      <div class="block" align="center">
        <br>
        <el-pagination
          background @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="checkResourcePageData.currentPage" :page-size="checkResourcePageData.pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="checkResourcePageData.total">
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "CheckResource",
    data() {
      return {
        checkResourcePageData: {
          currentPage: -1,
          pageSize: 10,
          total: -1,
        },
        // 表格数据
        checkResourceTableList: [],
      }
    },
    created() {
      // 加载需要审批的资源
      this.loadCheckResourceList();
    },
    methods: {
      // 每页的大小改变事件
      handleSizeChange(val) {
        this.checkResourcePageData.pageSize = val;
        // this.loadUserAccountInfoList();
      },
      // 翻页事件
      handleCurrentChange(val) {
        this.checkResourcePageData.currentPage = val;
        // this.loadUserAccountInfoList();
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
            this.$message.info('对管理员的操作已经取消');
          }
        }
        this.tableSelectList = this.$refs.multipleTable.selection;
      },

      //加载需要审批的资源
      loadCheckResourceList(){
        let out_this = this;
        this.$axios.post('/platform/getCheckResourceList', this.checkResourcePageData).then(response => {
          let resData = response.data;
          console.log(resData);
          if (resData.code === 8008) {
            out_this.checkResourcePageData.currentPage = resData.data.currentPage;
            out_this.checkResourcePageData.pageSize = resData.data.pageSize;
            out_this.checkResourcePageData.total = resData.data.total;
            out_this.checkResourceTableList = resData.data.pageList;
          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }
        });

      },


    }
  }
</script>

<style scoped>

  #div_check_resource_box {
    width: 100%;
  }

  #div_user_manager_box > div {
    margin: 3%;
    width: 94%;
  }

</style>
