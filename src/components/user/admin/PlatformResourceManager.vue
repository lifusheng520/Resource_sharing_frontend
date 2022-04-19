<template>
  <div id="div_platform_resource_box">
    <div style="margin: 3%;width: 94%">

      <h3>平台资源</h3>

      <div class="div-top-operation-box">

        <div class="div-delete">
          <el-button v-show="this.resourceSelectList.length !== 0"
                     @click="deleteSelectResource"
                     type="danger" plain round>
            删 除
          </el-button>
        </div>

        <div class="div-search-form">
          <!--      搜索框表单-->
          <el-form :model="tablePageData" ref="searchForm" label-width="100px" style="width: 100%;"
                   align="right">
            <el-form-item>
              <el-input v-model="tablePageData.search" placeholder="请输入文件名"
                        style="width: 60%; margin-right: 20px"></el-input>
              <el-button type="primary" icon="el-icon-search" @click="searchResource" circle></el-button>
              <el-button type="info" @click="reloadResourceList" circle><i class="el-icon-refresh"></i></el-button>
            </el-form-item>
          </el-form>
        </div>

      </div>


      <el-table :data="tableDataList" @selection-change="handleSelectionChange" ref="multipleTable" style="width: 100%"
                :default-sort="{prop: 'resource.upload_time', order: 'descending'}">

        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="resource.upload_time" label="上传时间" sortable min-width="160"></el-table-column>
        <el-table-column prop="user.username" label="上传者" min-width="120"></el-table-column>
        <el-table-column prop="userInfo.name" label="姓名" min-width="120"></el-table-column>
        <el-table-column prop="resource.origin_name" label="文件名" min-width="300"></el-table-column>
        <el-table-column prop="resource.discipline" label="科目" min-width="120"></el-table-column>

        <el-table-column label="资源简介" min-width="100">
          <template slot-scope="scope">
            <el-popover placement="bottom"
                        title="资源介绍"
                        width="500" trigger="click"
                        :content="scope.row.resource.description">
              <el-button slot="reference">查看</el-button>
            </el-popover>
          </template>
        </el-table-column>

      </el-table>

      <div class="block" align="center">
        <br>
        <el-pagination
          background @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="tablePageData.currentPage" :page-size="tablePageData.pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="tablePageData.total">
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "PlatformResourceManager",
    data() {
      return {
        tablePageData: {
          search: '',
          currentPage: -1,
          pageSize: 10,
          total: -1,
        },
        tableDataList: [],
        resourceSelectList: [],

      }
    },
    created() {
      // 加载资源到表格中
      this.loadResourceList();
    },
    methods: {
      // 每页的大小改变事件
      handleSizeChange(val) {
        this.tablePageData.pageSize = val;
        this.loadResourceList();
      },
      // 翻页事件
      handleCurrentChange(val) {
        this.tablePageData.currentPage = val;
        this.loadResourceList();
      },
      // 选择发生变化时的事件
      handleSelectionChange() {
        // 将list清空
        this.resourceSelectList = [];

        // 添加资源id
        let selects = this.$refs.multipleTable.selection;
        // 有选中的添加到选择list中
        if (selects.length !== 0)
          for (let i = 0; i < selects.length; ++i)
            this.resourceSelectList.push(selects[i].resource.id);
      },
      // 取消选择
      cancelSelection(){
        this.$refs.multipleTable.clearSelection();
        this.selectCheckList = [];
      },

      // 加载资源到表格中
      loadResourceList() {
        let out_this = this;
        this.$axios.post('/platform/getResourceList', this.tablePageData).then(response => {
          let resData = response.data;
          console.log(resData);

          if (resData.code === 8006) {
            out_this.$message({
              message: resData.code + '~~~~' + resData.message,
              type: 'success',
              duration: 1500
            });

            out_this.tablePageData.currentPage = resData.data.currentPage;
            out_this.tablePageData.pageSize = resData.data.pageSize;
            out_this.tablePageData.total = resData.data.total;
            out_this.tableDataList = resData.data.pageList;

          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }

        });
      },
      // 搜索资源
      searchResource() {
        let content = this.tablePageData.search;
        if (!content) {
          this.$message.info('请输入搜索内容~~~');
          return;
        }

        // 重置分页参数
        this.tablePageData.currentPage = -1;
        this.tablePageData.total = -1;

        this.loadResourceList();
      },
      // 重新加载
      reloadResourceList() {
        this.tablePageData.currentPage = -1;
        this.tablePageData.total = -1;
        this.tablePageData.search = '';

        this.loadResourceList();
      },

      // 删除资源
      deleteSelectResource(){
        let out_this = this;
        this.$axios.post('/platform/deleteResourceByIds', this.resourceSelectList).then(response => {
          let resData = response.data;
          console.log(resData);

          if (resData.code === 8007) {
            out_this.$message({
              message: resData.code + '~~~~' + resData.message,
              type: 'success',
              duration: 1500
            });

            // 如果删除成功，重新加载表格数据
            out_this.tablePageData.currentPage = -1;
            out_this.tablePageData.total = -1;
            out_this.tablePageData.search = '';
            out_this.loadResourceList();

          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }

        });

        this.cancelSelection();
      },
    }
  }
</script>

<style scoped>
  #div_platform_resource_box {
    width: 100%;
  }

  .div-top-operation-box {
    width: 100%;
  }

  .div-top-operation-box > div {
    display: inline-block;
  }

  .div-delete {
    width: 20%;
  }

  .div-search-form {
    width: 69%;
  }


</style>
