<template>
  <div class="outer-box">

    <div class="div-menu-box">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo">
        <el-menu-item v-for="(item, index) in folderMenuData"
                      v-on:click="menuHandler(item.folder_name)"
                      :index="(index + 1).toString()" :key="index">
          <i class="el-icon-lightning"></i>
          <span>{{item.folder_name.length > 8 ? item.folder_name.slice(0, 8) + ' ...' : item.folder_name}}</span>
        </el-menu-item>

      </el-menu>
    </div>

    <div class="div-content-box">

      <div class="div-content-head">
        <h3><i class="el-icon-cloudy"></i> {{favouritePageData.folder_name}}</h3>
        <el-divider></el-divider>
      </div>

      <div class="div-content-body">

        <div>
          <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <el-button v-on:click="cancelFavouriteHandler()" type="primary" size="mini" v-show="checkAll" plain>
            取消收藏
          </el-button>
          <el-button v-on:click="moveFavouriteHandler()" type="primary" size="mini" v-show="checkAll" plain>
            移动
          </el-button>
          <el-button v-on:click="copyFavouriteHandler()" type="primary" size="mini" v-show="checkAll" plain>
            复制
          </el-button>
        </div>

        <el-empty v-if="!this.favouriteTableData.length" style="margin: 10% auto"
                  description="啥也没有呀~~~"></el-empty>

        <div v-else>
          <div class="blog-post">
            <div class="bg-img" style="margin-top: -150px">
              <img src="static/img/blog-post-bg.png" alt="">
            </div>
            <div class="container">

              <el-checkbox-group v-model="selectFavouriteList" @change="selectChangeHandler">

                <div class="row">

                  <div style="margin-top: 20px" class="col-xl-4 col-lg-4 col-md-6"
                       v-for="(item, index) in favouriteTableData" :key="index">
                    <div class="single-blog">

                      <div class="div-content-checkBox">
                        <el-checkbox :label="item.favourite.id" v-show="checkAll">&nbsp;</el-checkbox>
                      </div>

                      <div class="part-text">
                        <div class="user-img">
                          <img v-if="item.userInfo.headIcon" :src="item.userInfo.headIcon" alt="">
                          <img v-else src="static/ico/none.png" alt="">
                        </div>
                        <h3><a
                          v-on:click="goResourceDetail(item.favourite.resource_id)">{{item.resource.origin_name}}</a>
                        </h3>
                        <h4>
                          <span><i class="el-icon-s-custom"></i>&nbsp;&nbsp;&nbsp;{{item.userInfo.name}} </span>
                        </h4>
                        <h4>
                          <span>收藏于：{{item.favourite.time}}</span>
                        </h4>
                        <h4><span>介绍：</span></h4>
                        <div class="div_resource_description">
                          <!--                  {{item.resource.description.length > 35 ? item.resource.description.slice(0, 35) + '...' :-->
                          <!--                  item.resource.description}}sdfasfd sdf asdf s-->
                          {{item.resource.description}}
                        </div>
                      </div>
                      <div class="part-social">
                        <a v-on:click="cancelFavouriteHandler(item.favourite.id)">
                          <span><i class="fas fa-times-circle"></i></span> 取消收藏
                        </a>
                        <a v-on:click="moveFavouriteHandler(item.favourite.id)">
                          <span><i class="fas fa-arrows-alt"></i></span> 移动
                        </a>
                        <a v-on:click="copyFavouriteHandler(item.favourite.id)">
                          <span><i class="fas fa-copy"></i></span> 复制
                        </a>
                        <a hidden> More</a>
                      </div>
                    </div>
                  </div>

                </div>
              </el-checkbox-group>

              <!--            dialog-->
              <el-dialog :title="favouriteDialogTitle" center :visible.sync="favouriteDialogShow" width="400px">

                <p align="center" style="font-size: 16px"> {{dialogFolderSelect.folder_name}}</p>

                <div class="infinite-list-wrapper" style="overflow:auto;height: 200px">
                  <table>
                    <el-radio-group v-model="dialogFolderSelect">
                      <tr v-for="(item, index) in folderMenuData" :key="index">
                        <td>
                          <el-radio v-if="item.folder_name == favouritePageData.folder_name" disabled :label="item">
                            {{item.folder_name}}
                          </el-radio>
                          <el-radio v-else :label="item">
                            {{item.folder_name}}
                          </el-radio>
                        </td>
                      </tr>
                    </el-radio-group>
                  </table>
                </div>

                <div>
                  <el-button v-on:click="showAddFolder=!showAddFolder" icon="el-icon-plus"
                             style="width: 100%;font-size: 18px;" plain>新建收藏夹
                  </el-button>
                </div>
                <div v-show="showAddFolder" style="margin-top: 15px;">
                  <el-input v-model="addFolderForm.folder_name" type="text"
                            placeholder="最多输入20个字符" maxlength="20">
                    <template slot="append">
                      <el-button v-on:click="addFolderHandler" type="primary" plain>新 建</el-button>
                    </template>
                  </el-input>
                </div>

                <div slot="footer" class="dialog-footer">
                  <el-button @click="cancelAddEvent">取 消</el-button>
                  <el-button type="primary" @click="sendRequestHandler">确 定</el-button>
                </div>
              </el-dialog>

            </div>
          </div>

          <div class="block" align="center">
            <br>
            <el-pagination
              background @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="favouritePageData.currentPage" :page-size="favouritePageData.pageSize"
              layout="total, sizes, prev, pager, next, jumper" :total="favouritePageData.total">
            </el-pagination>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "FavouriteManager",
    data() {
      return {
        // 收藏夹数据
        folderMenuData: [],
        // 分页数据
        favouritePageData: {
          user_id: '',
          folder_name: '默认收藏夹',
          currentPage: -1,
          total: -1,
          pageSize: 10,
        },
        // 收藏表格数据
        favouriteTableData: [],
        // 选中的收藏id列表
        selectFavouriteList: [],
        checkAll: false,
        // 收藏对话框显示
        favouriteDialogShow: false,
        // 收藏对话框标题
        favouriteDialogTitle: '',
        // 显示添加收藏夹
        showAddFolder: false,
        // 对话框选择的收藏夹
        dialogFolderSelect: '',
        // 新建收藏夹表单
        addFolderForm: {
          user_id: '',
          folder_name: '',
        },

      }
    },
    created() {
      // 获取登录信息
      this.getLoginInfo();

      // 获取收藏夹列表
      this.getFavouriteFolderList(this.favouritePageData.user_id);

      // 获取默认收藏夹内容'
      this.getFavouriteList();
    },
    methods: {
      //  菜单处理函数
      menuHandler(val) {
        this.favouritePageData.folder_name = val;
        this.getFavouriteList();
        // 重置选择list
        this.selectFavouriteList = [];
        this.checkAll = false;
      },
      // 获取登录信息
      getLoginInfo() {
        let userId = this.$cookies.get('user_id');
        if (userId) {
          this.favouritePageData.user_id = userId;
          return userId;
        } else {
          this.$message.info('请登录重试~~');
          this.$router.push('/login');
          return false;
        }
      },
      // 获取收藏夹列表
      getFavouriteFolderList(userId) {
        let out_this = this;
        this.$axios.get(`/favourite/getFolders/${userId}`).then(response => {
          let resData = response.data;
          if (resData.code == 7005) {
            out_this.folderMenuData = resData.data;
          }
        });

      },
      // 获取收藏夹内容
      getFavouriteList() {
        let out_this = this;
        this.$axios.post('/favourite/get', this.favouritePageData).then(response => {
          let resData = response.data;

          if (resData.code == 7010) {
            out_this.favouritePageData.currentPage = resData.data.currentPage;
            out_this.favouritePageData.total = resData.data.total;
            out_this.favouritePageData.pageSize = resData.data.pageSize;
            out_this.favouriteTableData = resData.data.pageList;
          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }
        });
      },
      // 取消收藏
      cancelFavouriteHandler(id) {
        // 如果是具体的取消收藏，添加id到list
        if (id) {
          this.handleCheckAllChange(false);
          this.selectFavouriteList.push(id);
        }

        if (this.selectFavouriteList.length === 0) {
          this.$message.info('请先选择需要取消的内容~~~');
          return;
        }

        let out_this = this;
        this.$axios.post('/favourite/cancel', this.selectFavouriteList).then(response => {
          let resData = response.data;

          // 取消收藏成功
          if (resData.code == 7001) {
            out_this.$message({
              message: resData.code + '~~~~' + resData.message,
              type: 'success',
              duration: 2000
            });

            // 重新获取收藏内容
            out_this.getFavouriteList();
          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }
        });

        this.cancelSelection();
      },
      // 移动收藏内容 处理函数
      moveFavouriteHandler(id) {
        // 单项移动收藏
        if (id) {
          this.handleCheckAllChange(false);
          this.selectFavouriteList.push(id);
        }

        this.favouriteDialogTitle = '你正在移动1个项到';
        this.favouriteDialogShow = true;
      },
      // 移动收藏内容请求
      moveFavourite() {

        if (this.selectFavouriteList.length === 0) {
          this.$message.info('请先选择需要移动的内容~~~');
          return;
        }

        let out_this = this;
        this.$axios.post('/favourite/move', {
          selectList: this.selectFavouriteList,
          selectFolder: this.dialogFolderSelect
        }).then(response => {
          let resData = response.data;

          // 移动收藏成功
          if (resData.code == 7011) {
            out_this.$message({
              message: resData.code + '~~~~' + resData.message,
              type: 'success',
              duration: 2000
            });

            // 重新获取收藏内容
            out_this.getFavouriteList();
          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }
        });
        this.cancelSelection();
      },
      // 复制收藏内容 处理函数
      copyFavouriteHandler(id) {
        // 单项移动收藏
        if (id) {
          this.handleCheckAllChange(false);
          this.selectFavouriteList.push(id);
        }

        this.favouriteDialogTitle = '你正在复制1个项到';
        this.favouriteDialogShow = true;
      },
      // 复制收藏内容请求
      copyFavourite() {

        if (this.selectFavouriteList.length === 0) {
          this.$message.info('请先选择需要复制内容~~~');
          return;
        }

        let out_this = this;
        this.$axios.post('/favourite/copy', {
          favouriteIdList: this.selectFavouriteList,
          selectFolder: this.dialogFolderSelect
        }).then(response => {
          let resData = response.data;

          // 复制收藏内容成功
          if (resData.code == 7013) {
            out_this.$message({
              message: resData.code + '~~~~' + resData.message,
              type: 'success',
              duration: 2000
            });

            // 重新获取收藏内容
            out_this.getFavouriteList();
          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }
        });
        this.cancelSelection();
      },
      // 请求处理函数
      sendRequestHandler() {
        if (this.favouriteDialogTitle == '你正在移动1个项到') {
          this.moveFavourite();
        } else {
          this.copyFavourite();
        }
        this.cancelAddEvent();
      },
      // 添加收藏夹
      addFolderHandler() {
        // 获取用户id
        this.addFolderForm.user_id = this.getLoginInfo();
        if (!this.addFolderForm.user_id)
          return 0;
        if (!this.addFolderForm.folder_name) {
          this.$message.info('收藏夹名称不能为空喔');
          return 0;
        }
        // 添加收藏夹请求
        let out_this = this;
        this.$axios.post('/favourite/addFolder', this.addFolderForm).then(response => {
          let resData = response.data;
          console.log(resData.data);
          if (resData.code == 7006) { // 添加成功
            out_this.$message({
              message: resData.code + '~~~~' + resData.message,
              type: 'success',
              duration: 2000
            });
            // 将刚刚添加的收藏夹加入到list
            out_this.folderMenuData.push(resData.data);
            out_this.showAddFolder = false;
          } else {
            out_this.$message.error(resData.code + '~~~~' + resData.message);
          }
        });
      },
      // 取消收藏的事件
      cancelAddEvent() {
        this.favouriteDialogShow = false;
        this.addFolderForm.folder_name = '';
        this.dialogFolderSelect = '';
      },
      // 判断收藏夹是否处于收藏记录中
      folderIsContain(val) {
        for (let i = 0; i < this.favouriteRecord.length; ++i)
          if (this.favouriteRecord[i] == val)
            return true;
        return false;
      },
      // 选择事件
      handleCheckAllChange(val) {
        // 如果选中了，将当前页的所有收藏id添加到cancelFavouriteList中
        if (val) {
          for (let i = 0; i < this.favouriteTableData.length; ++i)
            this.selectFavouriteList.push(this.favouriteTableData[i].favourite.id);
        } else {
          this.selectFavouriteList = [];
        }
      },
      // 跳转到资源详情页面
      goResourceDetail(resourceId) {
        if (this.$route.path != '/detail') {
          this.$cookies.set('resource_id', resourceId);
          this.$router.push('/detail');
        }
      },
      // 改变每页的大小时的事件
      handleSizeChange(val) {
        this.favouritePageData.pageSize = val;
        this.getFavouriteList();
      },
      // 改变当前页码的事件
      handleCurrentChange(val) {
        this.favouritePageData.currentPage = val;
        this.getFavouriteList();
      },
      // 选则框变动是的处理函数
      selectChangeHandler() {
        if (this.selectFavouriteList.length === 0) {
          this.checkAll = false;
        }
      },
      // 取消选择
      cancelSelection(){
        this.selectFavouriteList = [];
        this.selectChangeHandler();
      },
    }
  }
</script>

<style scoped>
  .outer-box {
    width: 100%;
    display: flex;
  }

  .outer-box > div {
    display: inline-block;
  }

  .div-menu-box {
    width: 200px;
  }

  .div-content-box {
    width: 100%;
  }

  .div-content-box > div {
    width: 100%;
  }

  .div-content-head {
    padding: 10px;
  }

  .div-content-body {
    padding: 10px;
    width: 100%;
    display: block;
  }

  .el-divider {
    margin: 0px;
  }

  .div-content-checkBox {
    margin: 0px;
    width: 90%;
    text-align: right;
    position: absolute;
  }

</style>
