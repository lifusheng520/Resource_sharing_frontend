<template>
  <div id="div_comment_table">
    <el-empty v-if="this.isEmpty" style="margin: 20% auto" :description="`${$t('sessionExpired')}`"></el-empty>
    <div v-else style="margin: 3%; width: 100%">


      <h3>{{$t('commentManager.title')}}</h3>

      <el-form :model="commentPageData" ref="searchForm">
        <el-form-item>
          <template>
            <el-popconfirm :title="`${$t('commentManager.confirmPrompt')}`" @confirm="deleteListOfComment(multipleSelection)"
                           @cancel="toggleSelection">
              <el-button slot="reference" v-show="hadSelected" type="danger" style="margin-left: 20px" round>{{$t('delete')}}
              </el-button>
            </el-popconfirm>
          </template>
        </el-form-item>
      </el-form>

      <div id="bigger-box"></div>

      <el-table :data="commentTableData" @selection-change="handleSelectionChange" ref="multipleTable"
                :row-class-name="tableRowClassName" style="width: 100%;"
                :default-sort="{prop: 'time', order: 'descending'}">

        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="time" :label="`${$t('date')}`" sortable min-width="100"></el-table-column>

        <el-table-column :label="`${$t('commentManager.judgement')}`" min-width="80">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.isIllegal == 1" type="danger">
              {{$t('commentManager.inappropriate')}}
            </el-tag>
            <el-tag v-else type="success">
              {{$t('commentManager.appropriate')}}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="resource_name" :label="`${$t('commentManager.resourceName')}`" sortable min-width="200"></el-table-column>
        <el-table-column prop="support_number" :label="`${$t('commentManager.supportNumber')}`" sortable min-width="100"></el-table-column>

        <el-table-column :label="`${$t('commentManager.reply')}`" min-width="150px">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.to_name" type="info">{{'@' + scope.row.to_name}}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="content" :label="`${$t('commentManager.content')}`" sortable min-width="300"></el-table-column>

        <el-table-column :label="`${$t('commentManager.operation')}`" min-width="100px" fixed="right">
          <template slot-scope="scope">

            <el-popconfirm :title="`${$t('commentManager.confirmPrompt')}`" @confirm="deleteRow(scope.row)"
                           @cancel="toggleSelection">
              <el-button slot="reference" type="text" plain>{{$t('delete')}}</el-button>
            </el-popconfirm>

            <el-button @click="goCommentDetailPage(scope.row)" type="text" plain>{{$t('commentManager.browse')}}</el-button>
          </template>
        </el-table-column>

      </el-table>

      <div class="block" align="center">
        <br>
        <el-pagination
          background @size-change="handleSizeChange" @current-change="handleCurrentChange"
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
            out_this.commentTableData = resData.data.pageList;
            out_this.commentPageData.currentPage = resData.data.currentPage;
            out_this.commentPageData.total = resData.data.total;
            out_this.commentPageData.pageSize = resData.data.pageSize;

          } else {
            out_this.$message.error(resData.code + '~~~~  ' + out_this.$t('serverError'));
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
            out_this.$message({
              message: resData.code + '~~~~  ' + out_this.$t('deleteSuccess'),
              type: 'success',
              center: true,
              duration: 2000
            });

            out_this.getCommentList();
          } else {
            this.$message.error(resData.code + '~~~~  ' + out_this.$t('serverError'));
          }
        });

        this.toggleSelection();
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
            message: this.$t('sessionExpired'),
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
      }
    }
  }
</script>

<style scoped>

  #div_comment_table {
    width: 95%;
  }

  .el-table {
    margin-top: 20px;
  }

  .el-table .warning-row {
    background: RGBA(253, 245, 230, 0.5);
  }

  .el-table .success-row {
    background: RGBA(240, 249, 235, 0.5);
  }

  .el-form {
    position: absolute;
    margin-left: 0px;
  }
  .el-form-item{
    margin: 0px;
  }

  #bigger-box {
    height: 20px;
  }


</style>
