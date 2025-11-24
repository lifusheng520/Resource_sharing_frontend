<template>
  <div id="div_focus_box">
    <el-empty v-if="this.isEmpty" style="margin: 20% auto" description="网络开小差了，请重新登录~~~"></el-empty>
    <div v-else style="margin: 3%; width: 94%">


      <h3>{{$t('focusManager.title')}}</h3>

      <el-table :data="focusTableList" ref="multipleTable"
                style="width: 100%;"
                :default-sort="{prop: 'time', order: 'descending'}">

        <el-table-column prop="time" :label="`${$t('date')}`" sortable min-width="110"></el-table-column>


        <el-table-column prop="resource_name" label="" min-width="60">
          <template slot-scope="scope">
            <div class="div-user-icon">
              <img v-if="scope.row.focusUserIcon" :src="scope.row.focusUserIcon" alt="">
              <img v-else src="static/ico/none.png" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="focusUserName" :label="`${$t('alias')}`" min-width="100"></el-table-column>

        <el-table-column min-width="100px" fixed="right">
          <template slot-scope="scope">
            <el-popconfirm :title="`${$t('focusManager.cancelFocusNotice')}`" @confirm="cancelFocus(scope.row)"
                           @cancel="toggleSelection">
              <el-button slot="reference" type="danger" plain>{{ $t('focusManager.cancelFocus') }}</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>

        <el-table-column  min-width="100px" fixed="right">
          <template slot-scope="scope">
            <el-button @click="goFocusPage(scope.row.focus_uid)" type="text" plain>{{$t('focusManager.browseContent')}}</el-button>
          </template>
        </el-table-column>

      </el-table>

      <div class="block" align="center">
        <br>
        <el-pagination
          background @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="focusPageData.currentPage" :page-size="focusPageData.pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="focusPageData.total">
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "FocusManager",
    data() {
      return {
        isEmpty: true,
        focusTableList: [],
        focusPageData: {
          user_id: '',
          currentPage: -1,
          total: -1,
          pageSize: 10
        },
        focusForm: {
          userId: '',
          focusUserId: '',
        }
      }
    },
    created() {
      // 获取登录信息
      this.getLoginUserInfo();

      // 获取用户登录列表
      this.getFocusList();
    },
    methods: {
      // 取消关注
      cancelFocus(row) {
        // 设置关注表单参数
        this.focusForm.userId = row.user_id;
        this.focusForm.focusUserId = row.focus_uid;

        // 发起取消关注请求
        let out_this = this;
        this.$axios.post('/focus/cancel', this.focusForm).then(response => {
          let resData = response.data;
          console.log(resData);

          if (resData.code == 6004) {
            out_this.deleteFocusTableListItem(resData.data);
          } else {
            out_this.$message.error(resData.code + '~~~~' + out_this.$t('serverError'));
          }

        });

      },
      // 将取消关注的行删除
      deleteFocusTableListItem(focus_uid) {
        for (let i = 0; i < this.focusTableList.length; ++i) {
          if (this.focusTableList[i].focus_uid == focus_uid) {
            this.focusTableList.splice(i, 1);
            return;
          }
        }
      },
      //  取消选择
      toggleSelection() {
        this.$refs.multipleTable.clearSelection();
      },
      // 改变每页的大小时的事件
      handleSizeChange(val) {
        this.focusPageData.pageSize = val;
        this.getFocusList();
      },
      // 改变当前页码的事件
      handleCurrentChange(val) {
        this.focusPageData.currentPage = val;
        this.getFocusList();
      },
      // 获取关注列表
      getFocusList() {
        let out_this = this;
        this.$axios.post('/focus/getInfo', this.focusPageData).then(response => {
          let resData = response.data;
          //console.log(resData);

          if (resData.code == 6006) {
            out_this.focusPageData.currentPage = resData.data.currentPage;
            out_this.focusPageData.pageSize = resData.data.pageSize;
            out_this.focusPageData.total = resData.data.total;
            out_this.focusTableList = resData.data.pageList;

          } else {
            out_this.$message.error(resData.code + '~~~~' + out_this.$t('serverError'));
          }

        });

      },
      // 获取登录用户信息
      getLoginUserInfo() {
        let userId = this.$cookies.get('user_id');
        if (userId) {
          this.focusPageData.user_id = userId;
          this.isEmpty = false;
        } else {
          this.isEmpty = true;
        }
      },
      // 跳转到关注首页
      goFocusPage(val) {
        if(this.$route.path !== '/focus'){
          // 添加需要查看的用户id
          this.$cookies.set('focus_uid', val);
          this.$router.push('/focus');
        }
      }
    }
  }
</script>

<style scoped>

  #div_focus_box {
    width: 95%;
  }

  .div-user-icon {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    overflow: hidden;
  }

</style>
