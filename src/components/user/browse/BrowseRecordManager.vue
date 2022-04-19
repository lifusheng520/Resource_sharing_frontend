<template>
  <div style="width: 100%">
    <div style="margin: 3%;width: 94%">

      <h3>我的足迹</h3>

      <div style="width: 100%;">

        <div style="height: 50px">

          <div>

            <el-button v-show="this.browseRecordSelection.length !== 0"
                       @click="checkAllHandler" type="danger" size="small" round>
              全选
            </el-button>
            <el-button v-show="this.browseRecordSelection.length !== 0"
                       @click="cancelSelection" type="danger" size="small" round>
              取消
            </el-button>
            <el-button v-show="this.browseRecordSelection.length !== 0"
                       @click="deleteBrowseRecord" type="danger" size="small" round>
              删除
            </el-button>
          </div>

        </div>

        <el-row :gutter="10" style="margin: 20px 0px;text-align: center">

            <el-col id="el-col-box" :span="6" v-for="(item, index) in browseRecordTableList" :key="index">
              <el-card>

                <div id="div-browse-checkbox">
                  <el-checkbox v-model="browseRecordSelection" :label="item.id">&nbsp;</el-checkbox>
                </div>

                <el-row>
                  <el-col :span="8">
                    <el-row>
                      <div class="div-head-icon">
                        <img v-if="item.headIcon" :src="item.headIcon" alt="">
                        <img v-else src="static/ico/none.png" alt="">
                      </div>
                    </el-row>

                    <el-row>{{item.name}}</el-row>
                  </el-col>

                  <el-col :span="16">
                    <div style="text-align: center; width: 100%;">
                      {{item.origin_name}}
                    </div>
                  </el-col>
                </el-row>

                <el-row style="margin-top: 10px;margin-bottom: -10px;">{{item.time}}</el-row>

                <div>
                </div>
              </el-card>
            </el-col>

        </el-row>
      </div>

      <div class="block" align="center">
        <br>
        <el-pagination
          background @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="browseRecordPageData.currentPage" :page-size="browseRecordPageData.pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="browseRecordPageData.total">
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "BrowseRecordManager",
    data() {
      return {
        browseRecordPageData: {
          user_id: '',
          currentPage: -1,
          pageSize: 10,
          total: -1,
        },
        browseRecordTableList: [],

        browseRecordSelection: [],
      }
    },
    created() {
      // 获取登录数据
      let userId = this.$cookies.get('user_id');
      if (userId) {
        this.browseRecordPageData.user_id = userId;
      } else {
        this.$message.info('请重新登录~~~');
        this.$router.push('/login');
      }

      // 加载浏览记录
      this.loadBrowseRecord();
    },
    methods: {
      // 每页的大小改变事件
      handleSizeChange(val) {
        this.browseRecordPageData.currentPage = -1;
        this.browseRecordPageData.total = -1;
        this.browseRecordPageData.pageSize = val;
        this.loadBrowseRecord();
      },
      // 翻页事件
      handleCurrentChange(val) {
        this.browseRecordPageData.currentPage = val;
        this.loadBrowseRecord();
      },
      // 全选事件
      checkAllHandler() {
        // // 遍历选择内容，将id存入browseRecordSelection中
        this.browseRecordSelection = [];
        let selection = this.browseRecordTableList;
        for (let i = 0; i < selection.length; ++i)
          this.browseRecordSelection.push(selection[i].id);
        console.log(this.browseRecordSelection)
      },
      // 取消选择
      cancelSelection() {
        this.browseRecordSelection = [];
      },

      // 加载浏览记录
      loadBrowseRecord() {
        let out_this = this;
        this.$axios.post('/browse/getList', this.browseRecordPageData).then(response => {
          let resData = response.data;
          console.log(resData);
          if (resData.code === 9001) {
            out_this.browseRecordPageData.currentPage = resData.data.currentPage;
            out_this.browseRecordPageData.pageSize = resData.data.pageSize;
            out_this.browseRecordPageData.total = resData.data.total;
            out_this.browseRecordTableList = resData.data.pageList;
          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }
        });
      },

      // 删除记录
      deleteBrowseRecord() {
        let out_this = this;
        this.$axios.post('/browse/delete', this.browseRecordSelection).then(response => {
          let resData = response.data;
          console.log(resData);
          if (resData.code === 9002) {
            out_this.$message({
              message: resData.code + '~~~~' + resData.message,
              type: 'success',
              duration: 2000
            });

            // 重新加载内容
            out_this.browseRecordPageData.currentPage = -1;
            out_this.browseRecordPageData.total = -1;
            out_this.loadBrowseRecord();
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

  .el-col {
    text-align: center;
  }

  .el-row {
    text-align: center;
  }

  #el-col-box {
    margin: 15px 0px;
  }

  #div-browse-checkbox {
    position: absolute;
    margin-top: -5px;
    margin-left: -5px;
  }

  .div-head-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0px auto;
  }

</style>
