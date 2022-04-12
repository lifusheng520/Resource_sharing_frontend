<template>
  <div id="div_favourite_folder_box">
    <el-empty v-if="this.folderTableData.length === 0" style="margin: 20% auto"
              description="啥也没有哇~~~"></el-empty>
    <div v-else style="margin: 3%; width: 94%">

      <div>
        <h3>收藏夹管理</h3>
        <br>

        <!-- Form -->
        <el-button type="primary" size="small" @click="dialogFormVisible = true">新建收藏夹</el-button>

        <el-dialog center title="新建收藏夹" :visible.sync="dialogFormVisible">
          <el-form :model="newFolderForm">
            <el-form-item label="收藏夹名称">
              <el-input v-model="newFolderForm.folder_name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="newFolderHandler">确 定</el-button>
          </div>
        </el-dialog>

      </div>
      <div v-show="this.folderSelectList.length !== 0" class="div-operation-button">
        <el-popover placement="top"
                    width="200" trigger="click" v-model="visible">

          <p>删除收藏夹后，收藏夹的收藏内容也会一并全部删除，确定删除吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button v-on:click="deleteFavouriteFolders" type="primary" size="mini" @click="visible = false">
              确定
            </el-button>
          </div>

          <el-button slot="reference" type="danger" size="small" plain>
            删 除
          </el-button>
        </el-popover>
        <el-button v-on:click="cancelSelect" size="small" plain>取 消</el-button>
      </div>

      <el-table
        ref="multipleTable"
        :data="folderTableData"
        tooltip-effect="dark"
        style="width: 100%"
        :default-sort="{prop: 'time', order: 'descending'}"
        @selection-change="handleSelectionChange">

        <el-table-column type="selection" width="55"></el-table-column>

        <el-table-column prop="time" label="时间" sortable width="100">
          <template slot-scope="scope">
            {{timeFormat(scope.row.time)}}
          </template>
        </el-table-column>

        <el-table-column prop="time" label="创建于" sortable width="130">
          <template slot-scope="scope">
            {{getTimePass(scope.row.time)}}
          </template>
        </el-table-column>

        <el-table-column prop="folder_name" label="收藏夹名称" width="320"></el-table-column>
        <el-table-column prop="resourceNumber" label="收藏量" sortable width="100"></el-table-column>

      </el-table>

      <div class="block" align="center">
        <br>
        <el-pagination
          background @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="folderPageData.currentPage" :page-size="folderPageData.pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="folderPageData.total">
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "FavouriteFolderManager",
    data() {
      return {
        // 收藏夹翻页数据
        folderPageData: {
          user_id: '',
          currentPage: -1,
          total: -1,
          pageSize: 10
        },
        // 表格中的收藏夹数据
        folderTableData: [],
        folderSelectList: [],
        visible: false,
        dialogFormVisible: false,
        // 新建收藏夹表单
        newFolderForm: {
          user_id: '',
          folder_name: '',
        },
      }
    },
    created() {
      // 获取登录信息
      this.getLoginUserInfo();

      // 加载用户的收藏夹信息
      this.loadFavouriteFolderInfoList();
    },
    methods: {
      // 选中的内容处理函数
      handleSelectionChange() {
        let select = this.removeDefaultFolder();
        this.folderSelectList = select;
      },
      // 去除默认收藏夹
      removeDefaultFolder() {
        let k = -1;
        for (let i = 0; i < this.$refs.multipleTable.selection.length; ++i)
          if ('默认收藏夹' === this.$refs.multipleTable.selection[i].folder_name) {
            k = i;
            break;
          }
        if (k != -1) {
          this.$refs.multipleTable.selection.splice(k, 1);
          this.$message.info('默认收藏夹不能操作喔~~');
          return this.$refs.multipleTable.selection;
        }
        return this.$refs.multipleTable.selection;
      },
      // 改变每页的大小时的事件
      handleSizeChange(val) {
        this.folderPageData.pageSize = val;
        this.loadFavouriteFolderInfoList();
      },
      // 改变当前页码的事件
      handleCurrentChange(val) {
        this.folderPageData.currentPage = val;
        this.loadFavouriteFolderInfoList();
      },
      // 获取登录用户信息
      getLoginUserInfo() {
        let userId = this.$cookies.get('user_id');
        if (userId) {
          this.folderPageData.user_id = userId;

        } else {
          this.$message.info('请先登录再查看~~~');
          this.$router.push('/login');
        }
      },
      // 加载用户收藏夹信息
      loadFavouriteFolderInfoList() {
        let out_this = this;
        this.$axios.post('/favourite/getFolders', this.folderPageData).then(response => {
          let resData = response.data;
          console.log(resData);
          if (resData.code === 7015) {
            out_this.folderPageData.currentPage = resData.data.currentPage;
            out_this.folderPageData.pageSize = resData.data.pageSize;
            out_this.folderPageData.total = resData.data.total;
            out_this.folderTableData = resData.data.pageList;
          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }
        });
      },
      // 判断时间距离现在已经过去多久
      getTimePass(timeStamp) {
        let now = new Date().getTime();
        let gap = now - timeStamp;
        let result;
        // 计算间隔了多少秒
        let gapTime = parseInt(gap / 1000);
        if (gapTime < 60)
          result = '不到1分钟前';
        // 计算间隔了多少分钟
        gapTime = parseInt(gapTime / 60);
        if (!result && gapTime < 60)
          result = gapTime + '分钟前';
        // 计算间隔了多少小时
        let hours = parseInt(gapTime / 60);
        let min = gapTime % 60;
        if (!result && hours < 24)
          result = hours + '小时' + min + '分钟前';
        // 计算间隔了多少天
        let days = parseInt(hours / 24);
        hours = hours % 24;
        if (!result && days < 30)
          result = days + '天' + hours + '小时前';
        // 计算年
        let years = new Date().getFullYear() - new Date(timeStamp).getFullYear();
        // 计算月
        let month = new Date().getMonth() - new Date(timeStamp).getMonth();
        month = Math.abs(month);
        if (!result && years > 0 && month > 0)
          result = years + '年' + month + '月前';
        if (!result && years > 0 && month === 0)
          result = years + '年前';
        if (!result && years === 0 && month > 0)
          result = month + '月前';
        return result;
      },
      // 格式化时间
      timeFormat(timeStamp) {
        let date = new Date(timeStamp);

        let year = date.getFullYear(),
          month = date.getMonth() + 1,//月份是从0开始的
          day = date.getDate(),
          hour = date.getHours(),
          min = date.getMinutes(),
          sec = date.getSeconds();

        let formatTime = year + '-' +
          (month < 10 ? '0' + month : month) + '-' +
          (day < 10 ? '0' + day : day) + ' ' +
          (hour < 10 ? '0' + hour : hour) + ':' +
          (min < 10 ? '0' + min : min) + ':' +
          (sec < 10 ? '0' + sec : sec);

        return formatTime;
      },
      // 删除收藏夹
      deleteFavouriteFolders() {
        console.log(this.folderSelectList);
        let out_this = this;
        this.$axios.post('/favourite/deleteFolders', this.folderSelectList).then(response => {
          let resData = response.data;
          console.log(resData);
          if (resData.code === 7016) {
            out_this.$message({
              message: resData.code + '~~~~  ' + resData.message,
              type: 'success',
              center: true,
              duration: 2000
            });

            // 重新加载收藏夹list
            out_this.folderPageData.currentPage = -1;
            out_this.folderPageData.total = -1;
            out_this.loadFavouriteFolderInfoList();
          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }

        });
      },
      // 取消选择
      cancelSelect() {
        this.folderSelectList = [];
        this.$refs.multipleTable.clearSelection();
      },
      // 添加收藏夹
      newFolderHandler() {
        this.dialogFormVisible = false;
        // 获取用户id
        let userId = this.$cookies.get('user_id');
        if (!userId) {
          this.$message.info('获取您的登录信息失败，请重新登录试试');
          return 0;
        }
        if (!this.newFolderForm.folder_name) {
          this.$message.info('收藏夹名称不能为空喔');
          return 0;
        }
        this.newFolderForm.user_id = userId;

        // 添加收藏夹请求
        let out_this = this;
        this.$axios.post('/favourite/addFolder', this.newFolderForm).then(response => {
          let resData = response.data;
          if (resData.code == 7006) { // 添加成功
            out_this.$message({
              message: resData.code + '~~~~' + resData.message,
              type: 'success',
              duration: 2000
            });
            // 重新加载收藏夹列表
            out_this.folderPageData.currentPage = -1;
            out_this.folderPageData.total = -1;
            out_this.loadFavouriteFolderInfoList();
          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }
        });

        // 重置表单数据
        this.newFolderForm.folder_name = '';
      },
    }
  }
</script>

<style scoped>

  #div_favourite_folder_box {
    width: 100%;
  }

  .div-operation-button {
    text-align: right;
    position: relative;
    width: 100%;
    margin-top: -32px;
  }

</style>
