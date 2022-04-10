<template>
  <div id="div_resource_table">
    <el-empty v-if="this.isEmpty" style="margin: 20% auto" description="网络开小差了，请重新登录~~~"></el-empty>
    <div v-else style="margin: 3%;width: 100%">

      <h3>资源管理</h3>


      <el-form :model="pageData" ref="searchForm" label-width="100px" style="width: 100%;margin: 10px auto"
               align="right">
        <el-form-item>
          <el-input v-model="pageData.searcher" placeholder="请输入文件名" style="width: 30%;margin-right: 20px"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="submitForm" circle></el-button>
          <el-button type="info" @click="resetForm" circle><i class="el-icon-refresh"></i></el-button>
          <template>
            <el-popconfirm title="确定删除选中的内容吗？" @confirm="deleteListOfResource(multipleSelection)"
                           @cancel="toggleSelection">
              <el-button slot="reference" v-show="hadSelected" type="danger" style="margin-left: 20px" round>删除
              </el-button>
            </el-popconfirm>
          </template>
        </el-form-item>
      </el-form>


      <el-table :data="tableData" @selection-change="handleSelectionChange" ref="multipleTable" style="width: 100%"
                :default-sort="{prop: 'upload_time', order: 'descending'}">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="upload_time" label="上传时间" sortable min-width="150"></el-table-column>
        <el-table-column prop="origin_name" label="文件名" min-width="200"></el-table-column>
        <el-table-column prop="downloads" label="下载量" sortable min-width="100px"></el-table-column>
        <el-table-column prop="favorite_number" label="收藏人数" sortable min-width="100px"></el-table-column>
        <el-table-column prop="size" label="大小" sortable min-width="100px">
          <template slot-scope="scope">
            {{formatFileSize(scope.row.size)}}
          </template>
        </el-table-column>
        <el-table-column prop="enabled" label="禁用/启用" min-width="100px">
          <template slot-scope="scope">
            <el-switch disabled
                       v-model="scope.row.enabled === 1"
                       active-color="#13ce66"
                       inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="discipline" label="学科" min-width="150px"></el-table-column>
        <el-table-column label="资源简介" min-width="100px">
          <template slot-scope="scope">
            <el-popover
              placement="bottom"
              title="资源介绍"
              width="500"
              trigger="click"
              :content="scope.row.description">
              <el-button slot="reference">查看</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="150px" fixed="right">
          <template slot-scope="scope">
            <el-button @click="deleteRow(scope.row)" type="text">删除</el-button>
            <el-button @click="showUpdateForm(scope.row)" type="text">编辑</el-button>
            <a
              :href="`http://localhost:8080/resource/download/${scope.row.disk_name}/${scope.row.id}/${scope.row.discipline}`">
              <el-button type="text">下载</el-button>
            </a>
          </template>
        </el-table-column>
      </el-table>

      <!-- dialog Form -->
      <el-dialog title="资源修改" :visible.sync="dialogFormVisible" style="margin: 20px auto;" center>
        <el-form :model="updateResourceForm" ref="updateResourceForm" :rules="rules"
                 style="width: 80%;margin: 20px auto">
          <el-form-item label="设置新文件名" prop="origin_name" :label-width="formLabelWidth">
            <el-input v-model="updateResourceForm.origin_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item v-if="updateResourceForm.enabled == 1" label="禁用资源：" :label-width="formLabelWidth">
            <el-switch v-model="updateResourceForm.enabled" active-color="#13ce66" inactive-color="#ff4949"
                       active-value="1" inactive-value="0"></el-switch>
          </el-form-item>
          <el-form-item v-else label="启用资源：" :label-width="formLabelWidth">
            <el-switch v-model="updateResourceForm.enabled" active-color="#13ce66" inactive-color="#ff4949"
                       active-value="1" inactive-value="0"></el-switch>
          </el-form-item>
          <el-form-item label="学科类别：" prop="discipline" :label-width="formLabelWidth">
            <el-select v-model="updateResourceForm.discipline" placeholder="请选择资源科目">
              <el-option label="计算机科学" value="计算机科学"></el-option>
              <el-option label="哲学" value="哲学"></el-option>
              <el-option label="文学" value="文学"></el-option>
              <el-option label="经济学" value="经济学"></el-option>
              <el-option label="艺术学" value="艺术学"></el-option>
              <el-option label="理学" value="理学"></el-option>
              <el-option label="工学" value="工学"></el-option>
              <el-option label="教育学" value="教育学"></el-option>
              <el-option label="历史学" value="历史学"></el-option>
              <el-option label="医学" value="医学"></el-option>
              <el-option label="军事学" value="军事学"></el-option>
              <el-option label="管理学" value="管理学"></el-option>
              <el-option label="法学" value="法学"></el-option>
              <el-option label="农学" value="农学"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="资源介绍：" prop="description" :label-width="formLabelWidth">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="填写资料简介、概况，有助提升资料曝光率"
                      v-model="updateResourceForm.description">
            </el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateResource('updateResourceForm')">确 定</el-button>
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
            {required: true, message: '文件名不能为空', trigger: 'change'}
          ],
          discipline: [
            {required: true, message: '类别不能为空', trigger: 'change'}
          ],
          description: [
            {required: true, message: '介绍不能为空', trigger: 'change'}
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
            message: '请先登录再查看喔~',
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
            this.$message({
              message: resData.code + '~~~~  ' + resData.message,
              type: 'success',
              center: true,
              duration: 2000
            });

            out_this.tableData = resData.data.pageList;
            out_this.pageData.currentPage = resData.data.currentPage;
            out_this.pageData.total = resData.data.total;
            out_this.pageData.pageSize = resData.data.pageSize;

          } else {
            this.$message.error(resData.code + '~~~~' + resData.message);
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
              message: resData.code + '~~~~  ' + resData.message,
              type: 'success',
              center: true,
              duration: 2000
            });

            //刷新页面
            out_this.pageData.total -= list.length;
            out_this.getUserResourceList();
          } else {
            out_this.$message({
              message: resData.code + '~~~~  ' + resData.message,
              type: 'error',
              center: true,
              duration: 2000
            });
          }
        });
      },
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
                this.$message({
                  message: resData.code + '~~~~  ' + resData.message,
                  type: 'success',
                  center: true,
                  duration: 2000
                });

                _this.$router.go(0);
              } else {
                this.$message.error(resData.code + '~~~~  ' + resData.message);
              }
            });
          } else {
            this.$message.error('请正确填写内容~~~');
          }
        });
      },
      formatFileSize(val) {
        if (val < 1024)
          val = val + 'kb';
        else if (val < 1024 * 1024)
          val = (val / 1024).toFixed(2) + 'Mb';
        else
          val = (val / 1024 / 1024).toFixed(2) + 'GB';

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
