<template>
  <div id="div_platform_resource_box">
    <div style="margin: 3%;width: 94%">

      <h3>{{$t('platformResourceManager.title')}}</h3>

      <div class="div-top-operation-box">

        <div class="div-delete">
          <el-button v-show="this.resourceSelectList.length !== 0"
                     @click="deleteSelectResource"
                     type="danger" plain round>
            {{$t('platformResourceManager.delete')}}
          </el-button>
        </div>

        <div class="div-search-form">
          <!--      搜索框表单-->
          <el-form :model="tablePageData" ref="searchForm" label-width="100px" style="width: 100%;"
                   align="right">
            <el-form-item>
              <el-input v-model="tablePageData.search" :placeholder="`${$t('platformResourceManager.placeholderPrompt')}`"
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
        <el-table-column prop="resource.upload_time" :label="`${$t('platformResourceManager.uploadTime')}`" sortable min-width="160"></el-table-column>
        <el-table-column prop="user.username" :label="`${$t('platformResourceManager.owner')}`" min-width="120"></el-table-column>
        <el-table-column prop="userInfo.name" :label="`${$t('platformResourceManager.alias')}`" min-width="120"></el-table-column>
        <el-table-column prop="resource.origin_name" :label="`${$t('platformResourceManager.fileName')}`" min-width="300"></el-table-column>
        <el-table-column prop="resource.discipline" :label="`${$t('platformResourceManager.discipline')}`" min-width="120"></el-table-column>

        <el-table-column :label="`${$t('platformResourceManager.overview')}`" min-width="100">
          <template slot-scope="scope">
            <el-popover placement="bottom"
                        :title="`${$t('platformResourceManager.resourceIntroduction')}`"
                        width="500" trigger="click"
                        :content="scope.row.resource.description">
              <el-button slot="reference">{{$t('platformResourceManager.introductionReview')}}</el-button>
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

          if (resData.code == 8006) {

            out_this.tablePageData.currentPage = resData.data.currentPage;
            out_this.tablePageData.pageSize = resData.data.pageSize;
            out_this.tablePageData.total = resData.data.total;
            out_this.tableDataList = resData.data.pageList;

            for (let i = 0; i < out_this.tableDataList.length; ++i)
              out_this.tableDataList[i].resource.discipline = out_this.translateDisciplineToSelectedLanguage(out_this.tableDataList[i].resource.discipline);

          } else if (resData.code == 1007) {
            out_this.$message.error(resData.code + '~~~~' + out_this.$t('withoutPrivilegeError'));

          } else {
            out_this.$message.error(resData.code + '~~~~' + out_this.$t('serverError'));
          }

        });
      },
      // 搜索资源
      searchResource() {
        let content = this.tablePageData.search;
        if (!content) {
          this.$message.info(this.$t('platformResourceManager.inputSearchKeyword'));
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
              message: resData.code + '~~~~' + out_this.$t('deleteSuccess'),
              type: 'success',
              duration: 1500
            });

            // 如果删除成功，重新加载表格数据
            out_this.tablePageData.currentPage = -1;
            out_this.tablePageData.total = -1;
            out_this.tablePageData.search = '';
            out_this.loadResourceList();

          } else {
            out_this.$message.error(resData.code + '~~~~' + out_this.$t('serverError'));
          }

        });

        this.cancelSelection();
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
