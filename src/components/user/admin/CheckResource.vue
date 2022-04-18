<template>
  <div id="div_check_resource_box">
    <div>

      <h3>资源审批</h3>

      <div style="width: 100%;">

        <div class="div-top-check-resource-operation-box">

          <div class="div-check-resource-delete">
            <el-button v-show="this.selectCheckList.length !== 0"
                       @click="passCheckHandler" type="danger" size="small" round>
              通过审批
            </el-button>
            <el-button v-show="this.selectCheckList.length !== 0"
                       @click="deleteCheckResourceHandler" type="danger" size="small" round>
              删除
            </el-button>
          </div>

          <div class="div-check-resource-search-form">
            <!--      搜索框表单-->
            <el-form :model="checkResourcePageData" ref="searchForm" label-width="100px" style="width: 100%;"
                     align="right">
              <el-form-item>
                <el-input v-model="checkResourcePageData.search" placeholder="请输入文件名"
                          style="width: 60%; margin-right: 20px"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="loadCheckResourceBySearch" circle></el-button>
                <el-button type="info" @click="reloadCheckResourceList" circle><i class="el-icon-refresh"></i>
                </el-button>
              </el-form-item>
            </el-form>
          </div>

        </div>

        <!--        表格-->
        <el-table :data="checkResourceTableList" ref="multipleTable"
                  style="width: 100%;" @selection-change="handleSelectionChange"
                  :default-sort="{prop: 'upload_time', order: 'descending'}">

          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="upload_time" label="上传时间" sortable min-width="150"></el-table-column>
          <el-table-column label="状态" min-width="100">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.state === '审批中'" type="danger">
                <i class="el-icon-loading"></i>待审批
              </el-tag>
              <el-tag v-else type="info">{{scope.row.state}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="origin_name" label="文件名" min-width="350"></el-table-column>
          <el-table-column prop="discipline" label="学科" min-width="120"></el-table-column>

          <el-table-column label="" min-width="120" fixed="right">
            <template slot-scope="scope">
              <el-button v-if="supportVideoType(scope.row.type)"
                         v-on:click="playVideoHandler(scope.row.id)" slot="reference">
                <i class="fa fa-play-circle fa-2x"></i></el-button>
              <span v-else>不支持的格式</span>
            </template>
          </el-table-column>

          <el-table-column label="资源介绍" min-width="100">
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                title="资源介绍"
                width="500"
                trigger="click"
                :content="scope.row.description">
                <el-button slot="reference">查看介绍</el-button>
              </el-popover>
            </template>
          </el-table-column>

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

      <el-dialog title="视频审批" :visible.sync="videoDialogVisible"
                 @close="closeDialogHandler" width="90%" center>
        <!-- video begin-->
        <div class="video">
          <div class="container">

            <div class="row">
              <div class="col-xl-12 col-lg-12">
                <div class="part-video">
                  <img src="assets/img/about-video.jpg" alt="">
                  <video id="video-check-resource" controls :src="videoHostURL"/>
                </div>

              </div>
            </div>
          </div>
        </div>
        <!-- video end -->
      </el-dialog>

    </div>
  </div>
</template>

<script>
  export default {
    name: "CheckResource",
    data() {
      return {
        checkResourcePageData: {
          search: '',
          currentPage: -1,
          pageSize: 10,
          total: -1,
        },
        // 表格数据
        checkResourceTableList: [],
        selectCheckList: [],

        videoDialogVisible: false,
        videoHostURL: '',
      }
    },
    created() {
      // 加载需要审批的资源
      this.loadCheckResourceList();
    },
    methods: {
      // 每页的大小改变事件
      handleSizeChange(val) {
        this.checkResourcePageData.currentPage = -1;
        this.checkResourcePageData.total = -1;
        this.checkResourcePageData.pageSize = val;
        this.loadCheckResourceList();
      },
      // 翻页事件
      handleCurrentChange(val) {
        this.checkResourcePageData.currentPage = val;
        this.loadCheckResourceList();
      },
      // 选择发生变化时的事件
      handleSelectionChange() {
        // 遍历选择内容，将id存入selectCheckList中
        let selection = this.$refs.multipleTable.selection;
        if (selection.length !== 0)
          for (let i = 0; i < selection.length; ++i)
            this.selectCheckList.push(selection[i].id);
        else
          this.selectCheckList = [];
        console.log(this.selectCheckList)
      },
      // 取消选择
      cancelSelection(){
        this.$refs.multipleTable.clearSelection();
      },

      //加载需要审批的资源
      loadCheckResourceList() {
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
      // 搜索加载资源
      loadCheckResourceBySearch() {
        this.checkResourcePageData.currentPage = -1;
        this.checkResourcePageData.total = -1;

        this.loadCheckResourceList();
      },
      // 刷新表格
      reloadCheckResourceList() {
        this.checkResourcePageData.currentPage = -1;
        this.checkResourcePageData.total = -1;
        this.checkResourcePageData.search = '';

        this.loadCheckResourceList();
      },


      // 通过审批
      passCheckHandler() {
        let out_this = this;
        this.$axios.post('/platform/passResourceCheck', this.selectCheckList).then(response => {
          let resData = response.data;
          console.log(resData);
          if (resData.code === 8009) {
            out_this.$message({
              message: resData.code + '~~~~' + resData.message,
              type: 'success',
              duration: 1500
            });

            // 更新表格数据
            out_this.checkResourcePageData.currentPage = -1;
            out_this.checkResourcePageData.total = -1;
            out_this.loadCheckResourceList();
          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }
        });

        this.cancelSelection();
      },
      // 删除审批的资源
      deleteCheckResourceHandler() {
        let out_this = this;
        this.$axios.post('/platform/deleteCheckResource', this.selectCheckList).then(response => {
          let resData = response.data;
          console.log(resData);
          if (resData.code === 8007) {
            out_this.$message({
              message: resData.code + '~~~~' + resData.message,
              type: 'success',
              duration: 1500
            });

            // 更新表格数据
            out_this.checkResourcePageData.currentPage = -1;
            out_this.checkResourcePageData.total = -1;
            out_this.loadCheckResourceList();
          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }
        });

        this.cancelSelection();
      },

      // 播放视频处理函数
      playVideoHandler(resourceId) {
        this.videoDialogVisible = true;
        this.videoHostURL = `http://localhost:8080/resource/server/getVideo/${resourceId}`;
      },
      // 关闭对话框处理函数
      closeDialogHandler() {
        let myVideo = document.getElementById('video-check-resource');    //对应video标签的ID
        myVideo.pause();
      },
      // 判断是否为支持的视频格式
      supportVideoType(type) {
        if (type === 'mp4')
          return true;
        if (type === 'webm')
          return true;
        if (type === 'ogg')
          return true;
        return false;
      }

    },

  }
</script>

<style scoped>

  #div_check_resource_box {
    width: 100%;
  }

  #div_check_resource_box > div {
    margin: 3%;
    width: 94%;
  }

  .div-top-check-resource-operation-box {
    width: 100%;
  }

  .div-top-check-resource-operation-box > div {
    display: inline-block;
  }

  .div-check-resource-delete {
    width: 30%;
  }

  .div-check-resource-search-form {
    width: 69%;
  }

  .part-video{
    border-radius: 10px;
  }

</style>
