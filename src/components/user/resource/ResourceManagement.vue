<template>
  <div id="div_resource_table">
    <el-empty v-if="this.isEmpty" style="margin: 20% auto" :description="`${$t('notFound404')}`"></el-empty>
    <div v-else style="margin: 3%;width: 94%">

      <h3>{{$t('resourceManagement.title')}}</h3>


      <el-form :model="pageData" ref="searchForm" label-width="100px" style="width: 100%;margin: 10px auto"
               align="right">
        <el-form-item>
          <el-input v-model="pageData.searcher" :placeholder="`${$t('resourceManagement.placeholderPrompt')}`" style="width: 30%;margin-right: 20px"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="submitForm" circle></el-button>
          <el-button type="info" @click="resetForm" circle><i class="el-icon-refresh"></i></el-button>
          <template>
            <el-popconfirm :title="`${$t('resourceManagement.confirmDelete')}`" @confirm="deleteListOfResource(multipleSelection)"
                           @cancel="toggleSelection">
              <el-button slot="reference" v-show="hadSelected" type="danger" style="margin-left: 20px" round>
                {{$t('delete')}}
              </el-button>
            </el-popconfirm>
          </template>
        </el-form-item>
      </el-form>


      <el-table :data="tableData" @selection-change="handleSelectionChange" ref="multipleTable" style="width: 100%"
                :default-sort="{prop: 'upload_time', order: 'descending'}">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="upload_time" :label="`${$t('resourceManagement.uploadDate')}`" sortable min-width="150"></el-table-column>
        <el-table-column prop="origin_name" :label="`${$t('resourceManagement.fileName')}`" min-width="200"></el-table-column>
        <el-table-column prop="state" :label="`${$t('resourceManagement.state')}`" min-width="120">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.state === '审批中'" type="danger">
              <i class="el-icon-loading"></i>{{$t('resourceManagement.checking')}}
            </el-tag>
            <el-tag v-else type="success">
              {{$t('resourceManagement.passed')}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="downloads" :label="`${$t('resourceManagement.downloadTimes')}`" sortable min-width="100px"></el-table-column>
        <el-table-column prop="favorite_number" :label="`${$t('resourceManagement.favouriteTimes')}`" sortable min-width="100px"></el-table-column>
        <el-table-column prop="size" :label="`${$t('resourceManagement.size')}`" sortable min-width="100px">
          <template slot-scope="scope">
            {{formatFileSize(scope.row.size)}}
          </template>
        </el-table-column>
        <el-table-column prop="enabled" :label="`${$t('resourceManagement.enable')}`" min-width="100px">
          <template slot-scope="scope">
            <el-switch disabled
                       v-model="scope.row.enabled == 1"
                       active-color="#13ce66"
                       inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="discipline" :label="`${$t('resourceManagement.discipline')}`" min-width="150px"></el-table-column>
        <el-table-column :label="`${$t('resourceManagement.introduction')}`" min-width="100px">
          <template slot-scope="scope">
            <el-popover placement="bottom"
              :title="`${$t('resourceManagement.introduction')}`"
              width="500"
              trigger="click"
              :content="scope.row.description">
              <el-button slot="reference">{{$t('resourceManagement.browse')}}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column :label="`${$t('resourceManagement.operation')}`" min-width="150px" fixed="right">
          <template slot-scope="scope">
            <el-button @click="deleteRow(scope.row)" type="text">{{$t('delete')}}</el-button>
            <el-button @click="showUpdateForm(scope.row)" type="text">{{$t('resourceManagement.edit')}}</el-button>
            <a
              :href="`${backendURL}/resource/download/${scope.row.disk_name}/${scope.row.id}/${scope.row.discipline}`">
              <el-button type="text">{{$t('download')}}</el-button>
            </a>
          </template>
        </el-table-column>
      </el-table>

      <!-- dialog Form -->
      <el-dialog :title="`${$t('resourceManagement.modifyResource')}`" :visible.sync="dialogFormVisible" style="margin: 20px auto;" center>
        <el-form :model="updateResourceForm" ref="updateResourceForm" :rules="rules"
                 style="width: 80%;margin: 20px auto">
          <el-form-item :label="`${$t('resourceManagement.setNewFileName')}`" prop="origin_name" :label-width="formLabelWidth">
            <el-input v-model="updateResourceForm.origin_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item v-if="updateResourceForm.enabled == 1" :label="`${$t('resourceManagement.disableResource')}`" :label-width="formLabelWidth">
            <el-switch v-model="updateResourceForm.enabled" active-color="#13ce66" inactive-color="#ff4949"
                       active-value="1" inactive-value="0"></el-switch>
          </el-form-item>
          <el-form-item v-else :label="`${$t('resourceManagement.enableResource')}`" :label-width="formLabelWidth">
            <el-switch v-model="updateResourceForm.enabled" active-color="#13ce66" inactive-color="#ff4949"
                       active-value="1" inactive-value="0"></el-switch>
          </el-form-item>
          <el-form-item :label="`${$t('resourceManagement.categories')}`" prop="discipline" :label-width="formLabelWidth">
            <el-select v-model="updateResourceForm.discipline" :placeholder="`${$t('resourceManagement.notice1')}`">

              <el-option :label="`${$t('disciplines.computerScience')}`" value="计算机科学"></el-option>
              <el-option :label="`${$t('disciplines.philosophy')}`" value="哲学"></el-option>
              <el-option :label="`${$t('disciplines.literature')}`" value="文学"></el-option>
              <el-option :label="`${$t('disciplines.economics')}`" value="经济学"></el-option>
              <el-option :label="`${$t('disciplines.artStudies')}`" value="艺术学"></el-option>
              <el-option :label="`${$t('disciplines.science')}`" value="理学"></el-option>
              <el-option :label="`${$t('disciplines.engineering')}`" value="工学"></el-option>
              <el-option :label="`${$t('disciplines.education')}`" value="教育学"></el-option>
              <el-option :label="`${$t('disciplines.history')}`" value="历史学"></el-option>
              <el-option :label="`${$t('disciplines.medicine')}`" value="医学"></el-option>
              <el-option :label="`${$t('disciplines.militaryScience')}`" value="军事学"></el-option>
              <el-option :label="`${$t('disciplines.management')}`" value="管理学"></el-option>
              <el-option :label="`${$t('disciplines.law')}`" value="法学"></el-option>
              <el-option :label="`${$t('disciplines.agronomy')}`" value="农学"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="`${$t('resourceManagement.introduction')}`" prop="description" :label-width="formLabelWidth">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10}" :placeholder="`${$t('resourceManagement.placeholderPrompt2')}`"
                      v-model="updateResourceForm.description">
            </el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            {{$t('cancelButton')}}
          </el-button>
          <el-button type="primary" @click="updateResource('updateResourceForm')">
            {{$t('confirmButton')}}
          </el-button>
        </div>
      </el-dialog>

      <div class="block" align="center">
        <br>
        <el-pagination
          background @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="pageData.currentPage" :page-size="pageData.pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="pageData.total">
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "ResourceManagement",
    data() {
      return {
        backendURL: this.$axios.defaults.baseURL,
        isEmpty: false,
        tableData: [],
        multipleSelection: [],
        pageData: {
          user_id: '',
          currentPage: -1,
          total: -1,
          pageSize: 10,
          searcher: ''
        },
        hostURL: '',
        hadSelected: false,
        isIndeterminate: true,
        dialogFormVisible: false,
        updateResourceForm: {
          id: '',
          origin_name: '',
          enabled: '',
          discipline: '',
          description: ''
        },
        formLabelWidth: '120px',
        rules: {
          origin_name: [
            {required: true, message: this.$t('resourceManagement.rule1'), trigger: 'change'}
          ],
          discipline: [
            {required: true, message: this.$t('resourceManagement.rule2'), trigger: 'change'}
          ],
          description: [
            {required: true, message: this.$t('resourceManagement.rule3'), trigger: 'change'}
          ]
        }
      }
    },
    created: function () {
      this.hostURL = '/resource/getInfoList';
      this.getUserResourceList();
    },
    methods: {
      handleSizeChange(val) {
        this.pageData.pageSize = val;
        this.getUserResourceList();
      },
      handleCurrentChange(val) {
        this.pageData.currentPage = val;
        this.getUserResourceList();
      },
      getUserResourceList() {
        let userId = this.$cookies.get('user_id');
        if (!userId) {
          this.$message({
            message: this.$t('sessionExpired'),
            type: 'warning'
          });
          this.isEmpty = true;
          return;
        }
        this.pageData.user_id = userId;
        const out_this = this;
        this.$axios.post(this.hostURL, this.pageData).then(res => {
          let resData = res.data;
          // 如果请求成功
          if (resData.code === 4015 || resData.code === 4018) {

            out_this.tableData = resData.data.pageList;
            out_this.pageData.currentPage = resData.data.currentPage;
            out_this.pageData.total = resData.data.total;
            out_this.pageData.pageSize = resData.data.pageSize;

          } else {
            this.$message.error(resData.code + ' ~~~~ ' + out_this.$t('serverError'));
          }
          this.isEmpty = false;
        });
      },
      submitForm() {
        if (this.pageData.searcher) {
          this.pageData.currentPage = -1;
          this.pageData.total = -1;
          this.hostURL = '/resource/search';

          this.getUserResourceList();
        }
      },
      resetForm() {
        this.pageData.searcher = '';
        this.hostURL = '/resource/getInfoList';

        this.pageData.total = -1;
        this.pageData.currentPage = -1;

        this.getUserResourceList();
      },
      deleteRow(row) {
        this.deleteListOfResource([].concat(row));
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.hadSelected = true;
        if (val.length == 0)
          this.hadSelected = false;
      },
      deleteListOfResource(list) {
        const out_this = this;
        this.$axios.post('/resource/delete', list).then(res => {
          let resData = res.data;
          if (resData.code === 4019) {
            out_this.$message({
              message: resData.code + ' ~~~~  ' + out_this.$t('deleteSuccess'),
              type: 'success',
              center: true,
              duration: 2000
            });

            // 重置分页参数
            this.pageData.currentPage = -1;
            this.pageData.total = -1;
            this.pageData.searcher = '';

            //刷新页面
            out_this.pageData.total -= list.length;
            out_this.getUserResourceList();
          } else {
            out_this.$message({
              message: resData.code + ' ~~~~  ' + out_this.$t('serverError'),
              type: 'error',
              center: true,
              duration: 2000
            });
          }
        });

        this.toggleSelection();
      },
      // 取消选中
      toggleSelection() {
        this.$refs.multipleTable.clearSelection();
        this.multipleSelection = [];
      },
      showUpdateForm(row) {
        this.dialogFormVisible = true;
        this.updateResourceForm.origin_name = row.origin_name;
        this.updateResourceForm.enabled = row.enabled;
        this.updateResourceForm.id = row.id;
        this.updateResourceForm.description = row.description;
        this.updateResourceForm.discipline = row.discipline;
      },
      updateResource(formName) {
        this.dialogFormVisible = false;
        let tempName = this.updateResourceForm.origin_name;
        this.updateResourceForm.origin_name = this.updateResourceForm.origin_name.replace(/\s*/g, '');
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updateResourceForm.origin_name = tempName;
            const _this = this;
            this.$axios.post('/resource/updateInfo', this.updateResourceForm).then(res => {
              let resData = res.data;
              if (resData.code === 4021) {

                _this.$router.go(0);
              } else {
                this.$message.error(resData.code + '~~~~  ' + out_this.$t('serverError'));
              }
            });
          } else {
            this.$message.error(this.$t('resourceManagement.notice2'));
          }
        });
      },
      formatFileSize(val) {
        if (val < 1024)
          val = val + ' kb';
        else if (val < 1024 * 1024)
          val = (val / 1024).toFixed(2) + ' Mb';
        else
          val = (val / 1024 / 1024).toFixed(2) + ' GB';

        return val;
      },
    }
  }
</script>

<style scoped>

  #div_resource_table {
    width: 100%;
  }
</style>
