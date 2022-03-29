<template>
  <div id="div_comment_table">
    <el-empty v-if="this.isEmpty" style="margin: 20% auto" description="网络开小差了，请重新登录~~~"></el-empty>
    <div v-else style="margin: 3%; width: 100%">


      <h3>评论管理</h3>

      <el-form :model="commentPageData" ref="searchForm" label-width="100px" style="width: 100%;margin: 10px auto"
               align="right">
        <el-form-item>
          <template>
            <el-popconfirm title="确定删除选中的内容吗？" @confirm="deleteListOfComment(multipleSelection)"
                           @cancel="toggleSelection">
              <el-button slot="reference" v-show="hadSelected" type="danger" style="margin-left: 20px" round>删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-form-item>
      </el-form>

      <h5>红色标记为违规的评论</h5>

      <el-table :data="commentTableData" @selection-change="handleSelectionChange" ref="multipleTable"
                :row-class-name="tableRowClassName" style="width: 100%;"
                :default-sort="{prop: 'time', order: 'descending'}">

        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="time" label="评论时间" sortable min-width="100"></el-table-column>

        <el-table-column label="判定" min-width="80">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.isIllegal == 1" type="danger">违规</el-tag>
            <el-tag v-else type="success">正常</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="resource_name" label="对应资源名" sortable min-width="200"></el-table-column>
        <el-table-column prop="support_number" label="点赞数" sortable min-width="100"></el-table-column>

        <el-table-column label="回复" min-width="150px">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.to_name" type="info">{{'@' + scope.row.to_name}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="content" label="内容" sortable min-width="300"></el-table-column>

        <el-table-column label="操作" min-width="100px" fixed="right">
          <template slot-scope="scope">

            <el-popconfirm title="确定删除选中的内容吗？" @confirm="deleteRow(scope.row)"
                           @cancel="toggleSelection">
              <el-button slot="reference" type="text" plain>删除</el-button>
            </el-popconfirm>

            <el-button @click="goCommentDetailPage(scope.row)" type="text" plain>查看</el-button>
          </template>
        </el-table-column>

      </el-table>

      <div class="block" align="center">
        <br>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="commentPageData.currentPage" :page-size="commentPageData.pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="commentPageData.total">
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "CommentManager",
    data() {
      return {
        isEmpty: false,
        commentTableData: [],
        multipleSelection: [],
        commentPageData: {
          user_id: '',
          currentPage: -1,
          total: -1,
          pageSize: 10
        },
        hadSelected: false,
      }
    },
    created: function () {
      this.getCommentList();
    },
    methods: {
      // 改变每页的大小时的事件
      handleSizeChange(val) {
        this.commentPageData.pageSize = val;
        this.getCommentList();
      },
      // 改变当前页码的事件
      handleCurrentChange(val) {
        this.commentPageData.currentPage = val;
        this.getCommentList();
      },
      getCommentList() {
        let isLogin = this.getLoginInfo();
        if (!isLogin) return;

        let out_this = this;

        this.$axios.post('/comment/manager', this.commentPageData).then(response => {
          let resData = response.data;
          console.log(resData);

          if (resData.code === 5005) {
            this.$message({
              message: resData.code + '~~~~  ' + resData.message,
              type: 'success',
              center: true,
              duration: 2000
            });

            out_this.commentTableData = resData.data.pageList;
            out_this.commentPageData.currentPage = resData.data.currentPage;
            out_this.commentPageData.total = resData.data.total;
            out_this.commentPageData.pageSize = resData.data.pageSize;

          } else {
            this.$message.error(resData.code + '~~~~  ' + resData.message);
          }

        });

      },
      /**
       * 多选绑定事件
       * @param val 选中的项，包含项中的值
       */
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.hadSelected = true;
        if (val.length == 0)
          this.hadSelected = false;
      },
      //  取消选择
      toggleSelection() {
        this.$refs.multipleTable.clearSelection();
        this.multipleSelection = [];
      },
      // 删除单行数据
      deleteRow(row) {
        this.deleteListOfComment([].concat(row));
      },
      // 删除多选的数据
      deleteListOfComment(list) {
        // console.log(list)

        let out_this = this;
        this.$axios.post('/comment/delete', list).then(res => {
          let resData = res.data;
          console.log(resData);

          if (resData.code === 5006) {
            this.$message({
              message: resData.code + '~~~~  ' + resData.message,
              type: 'success',
              center: true,
              duration: 2000
            });

            out_this.$router.go(0);
          } else {
            this.$message.error(resData.code + '~~~~  ' + resData.message);
          }
        });
      },
      // 查看评论内容
      goCommentDetailPage(val) {
        // 清除cookies中原来的资源id
        this.$cookies.remove('resource_id');
        this.$cookies.set('resource_id', val.resource_id);
        this.$router.push('/detail');
      },
      getLoginInfo() {
        let userId = this.$cookies.get('user_id');
        if (!userId) {
          this.$message({
            message: '请先登录再查看喔~',
            type: 'warning'
          });
          this.isEmpty = true;
          return false;
        }
        this.commentPageData.user_id = userId;
        return true;
      },
      tableRowClassName({row, index}) {
        if (row.isIllegal == 1) {
          return 'warning-row';
        } else {
          return 'success-row';
        }
        return '';
      }
    }
  }
</script>

<style>

  #div_comment_table {
    width: 95%;
  }

  .el-table .warning-row {
    background: RGBA(253, 245, 230, 0.5);
  }

  .el-table .success-row {
    background: RGBA(240, 249, 235, 0.5);
  }


</style>
