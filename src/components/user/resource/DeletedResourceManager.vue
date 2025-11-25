<template>
  <div style="width: 100%">
    <!-- 资 源 回 收 箱 begin-->
    <div class="transaction" style="padding-top: 20px;">
      <div style="width: 90%;margin: 0px auto">
        <div class="row justify-content-center">
          <div class="col-xl-12 col-lg-12">
            <div class="section-title text-center" style="margin-bottom: 20px">
              <h2>{{$t('deleteResourceManager.title1')}} <span> {{$t('deleteResourceManager.title2')}}</span></h2>
              <p align="right">{{$t('deleteResourceManager.validTime')}}</p>
            </div>
          </div>
        </div>

        <div v-show="deletedSelect.length !== 0" class="div-operation-box">
          <el-button v-on:click="deleteResourceBinRecord" type="primary" plain round>
            {{$t('delete')}}
          </el-button>
          <el-button v-on:click="reinstateResource" type="success" plain round>
            {{$t('deleteResourceManager.recover')}}
          </el-button>
        </div>

        <div class="row">
          <div class="col-xl-12 col-lg-12">
            <div class="transaction-area">

              <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="deposit" role="tabpanel" aria-labelledby="home-tab">

                  <el-checkbox-group v-model="deletedSelect">

                    <table class="table">

                      <thead align="center">

                      <tr>
                        <th scope="col">
                          <el-checkbox v-model="checkAll" @change="handleCheckAllChange()">
                            {{checkAll ? $t('cancelButton') : $t('selectAll')}}
                          </el-checkbox>
                        </th>
                        <th scope="col"></th>
                        <th scope="col">{{$t('deleteResourceManager.fileName')}}</th>
                        <th scope="col">{{$t('deleteResourceManager.fileSize')}}</th>
                        <th scope="col">{{$t('deleteResourceManager.discipline')}}</th>
                      </tr>

                      </thead>
                      <tbody>

                      <tr v-for="(item, index) in deletedTableData" :key="index">
                        <td align="center">
                          <el-checkbox :label="item">&nbsp;</el-checkbox>
                        </td>
                        <td>
                          {{getTimePass(item.time)}}
                        </td>
                        <td>
                          {{item.origin_name}}
                        </td>
                        <td>
                          {{item.size}}
                        </td>
                        <td>
                          {{translateDisciplineToSelectedLanguage(item.discipline)}}
                        </td>
                      </tr>

                      </tbody>
                    </table>

                  </el-checkbox-group>

                  <div align="center">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="deletedPageData.currentPage"
                      :page-size="deletedPageData.pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="deletedPageData.total">
                    </el-pagination>
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
    <!-- 资 源 回 收 箱 end -->
  </div>
</template>

<script>
  export default {
    name: "DeletedResourceManager",
    data() {
      return {
        // 删除资源分页数据
        deletedPageData: {
          currentPage: -1,
          pageSize: 10,
          total: -1,
          user_id: '',
        },
        // 表格数据集合
        deletedTableData: [],
        checkAll: false,
        deletedSelect: [],
      }
    },
    created() {
      // 获取登录信息
      this.getLoginUserInfo();

      // 获取被删除的记录
      this.getDeletedRecordList();

    },
    methods: {
      // 获取登录信息
      getLoginUserInfo() {
        let userId = this.$cookies.get('user_id');
        if (userId) {
          this.deletedPageData.user_id = userId;
        } else {
          this.$message.info(this.$t('sessionExpired'));
          this.$router.push('/login');
        }
      },
      // 获取被删除的记录
      getDeletedRecordList() {
        let out_this = this;
        this.$axios.post('/resource/getDeleted', this.deletedPageData).then(response => {
          let resData = response.data;
          if (resData.code == 4028) {
            out_this.deletedPageData.total = resData.data.total;
            out_this.deletedPageData.currentPage = resData.data.currentPage;
            out_this.deletedPageData.pageSize = resData.data.pageSize;
            out_this.deletedTableData = resData.data.pageList;
          } else {
            out_this.$message.error(resData.code + ' ~~~~ ' + out_this.$t('sessionExpired'));
          }
        });
      },
      // 分页大小改变事件
      handleSizeChange(val) {
        this.deletedPageData.pageSize = val;
        this.getDeletedRecordList();
      },
      // 当前页改变事件
      handleCurrentChange(val) {
        this.deletedPageData.currentPage = val;
        this.getDeletedRecordList();
      },
      // 判断时间距离现在已经过去多久
      getTimePass(timeStamp) {
        let now = new Date().getTime();
        let gap = now - timeStamp;
        let result;
        // 计算间隔了多少秒
        let gapTime = parseInt(gap / 1000);
        if (gapTime < 60)
          result = this.$t('withinOneMinute');
        // 计算间隔了多少分钟
        gapTime = parseInt(gapTime / 60);
        if (!result && gapTime < 60)
          result = gapTime + this.$t('minutesAgo');
        // 计算间隔了多少小时
        let hours = parseInt(gapTime / 60);
        let min = gapTime % 60;
        if (!result && hours < 24)
          result = hours +  this.$t('hour') + min + this.$t('minutesAgo');
        // 计算间隔了多少天
        let days = parseInt(hours / 24);
        hours = hours % 24;
        if (!result)
          result = days + this.$t('day') + hours + this.$t('hoursAgo');
        return result;
      },
      // 全选处理事件
      handleCheckAllChange() {
        this.deletedSelect = [];
        // 如果全选，则将当前表格中的所有数据添加到集合中
        if (!this.checkAll) {
          for (let i = 0; i < this.deletedTableData.length; ++i)
            this.deletedSelect.push(this.deletedTableData[i]);
          this.deletedSelect.push(undefined);
          this.checkAll = true;
        } else if (this.checkAll) {
          this.checkAll = false;
        }
      },
      // 删除回收箱记录
      deleteResourceBinRecord() {
        // 将全选选择框的值从list中删除
        this.updateSelectList();

        if (this.deletedSelect.length === 0) {
          this.handleCheckAllChange();
          return;
        }

        let out_this = this;
        this.$axios.post('/resource/realDelete', this.deletedSelect).then(response => {
          let resData = response.data;

          if (resData.code == 4029) {
            out_this.$message({
              message: resData.code + '~~~~  ' + out_this.$t('operationSuccess'),
              type: 'success',
              center: true,
              duration: 2000
            });

            out_this.getDeletedRecordList();
          } else {
            out_this.$message({
              message: resData.code + '~~~~  ' + out_this.$t('serverError'),
              type: 'error',
              center: true,
              duration: 2000
            });
          }
        });

        // 重置选择内容
        this.deletedSelect = [];
      },
      // 将全选选择框的值从list中删除
      updateSelectList() {
        let k = -1;
        for (let i = 0; i < this.deletedSelect.length; ++i)
          if (!this.deletedSelect[i]) {
            k = i;
            break;
          }
        if (k != -1) {
          this.deletedSelect.splice(k, 1);
          return true;
        }
        return false;
      },
      // 资源恢复
      reinstateResource() {
        // 将全选选择框的值从list中删除
        this.updateSelectList();

        if (this.deletedSelect.length === 0) {
          this.handleCheckAllChange();
          return;
        }

        let out_this = this;
        this.$axios.post('/resource/reinstate', this.deletedSelect).then(response => {
          let resData = response.data;
          //console.log(resData);

          if (resData.code == 4031) {
            out_this.getDeletedRecordList();
          } else {
            out_this.$message({
              message: resData.code + '~~~~  ' + out_this.$t('serverError'),
              type: 'error',
              center: true,
              duration: 2000
            });
          }
        });

        // 重置选择内容
        this.deletedSelect = [];
      },
      // 翻译内容到用户选择的语言
      translateDisciplineToSelectedLanguage(content) {  
        switch (content) {
          case '全部':
            return this.$t('recommendationContent.all');
          case '法学':
            return this.$t('disciplines.law');
          case '工学':
            return this.$t('disciplines.engineering');
          case '管理学':
            return this.$t('disciplines.management');
          case '计算机科学':
            return this.$t('disciplines.computerScience');
          case '教育学':
            return this.$t('disciplines.education');
          case '经济学':
            return this.$t('disciplines.economics');
          case '军事学':
            return this.$t('disciplines.militaryScience');
          case '理学':
            return this.$t('disciplines.science');
          case '历史学':
            return this.$t('disciplines.history');
          case '农学':
            return this.$t('disciplines.agronomy');
          case '文学':
            return this.$t('disciplines.literature');
          case '医学':
            return this.$t('disciplines.medicine');
          case '艺术学':
            return this.$t('disciplines.artStudies');
          case '哲学':
            return this.$t('disciplines.philosophy');
        }
      }

    }
  }
</script>

<style scoped>

  .div-operation-box {
    text-align: right;
    position: absolute;
    display: flex;
    top: 70px;
  }

  

</style>
