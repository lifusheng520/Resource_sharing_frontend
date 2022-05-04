<template>
  <div id="div_content">
    <el-empty v-if="this.isEmpty" style="margin: 20%" description="网络开小差了，请重新登录~~~"></el-empty>
    <div v-else>

      <h2>分享你的资源</h2><br><br>

      <el-form :model="fileForm" :rules="rules" ref="fileForm" label-width="200px" class="demo-ruleForm">

        <!--                   :action="`http://localhost:8080/resource/upload/${fileForm.user_id}/${fileForm.discipline}/${fileForm.textarea}`"-->
        <el-upload class="upload-demo" ref="upload" with-credentials
                   :action="`http://localhost:8080/resource/upload/${fileForm.user_id}/${fileForm.discipline}/${fileForm.textarea}`"
                   :on-preview="handlePreview" :on-remove="handleRemove" :file-list="this.fileForm.fileList"
                   :on-success="successHandle" :on-error="failHandle"
                   :auto-upload="false" multiple>
          <el-button slot="trigger" type="primary">选取本地磁盘文件</el-button>
          <br><br>
          <div slot="tip" class="el-upload__tip" style="font-size: 20px">一次可以选择多个文件，且不超过1GB <p></p>
            <p style="text-align: left">已选择文件：</p>
          </div>

        </el-upload>
        <br>

        <el-form-item label="资源所属学科" prop="discipline">
          <el-select v-model="fileForm.discipline" placeholder="请选择学科信息">
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

        <el-form-item label="资源介绍" prop="textarea">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}"
                    maxlength="500" show-word-limit
                    placeholder="填写资料简介、概况，有助提升资料曝光率"
                    v-model="fileForm.textarea">
          </el-input>
        </el-form-item>

      </el-form>

      <el-button style="margin-top: 5%;" type="success" @click="submitUpload('fileForm')">上传到平台服务器</el-button>
      <el-button style="margin-top: 5%;" type="primary" @click="clearUploadFiles">清除已经上传文件</el-button>
    </div>

  </div>

</template>

<script>
  export default {
    name: "AddUpload",
    data() {
      return {
        isEmpty: '',
        fileForm: {
          user_id: '',
          discipline: '',
          fileList: [],
          textarea: ''
        },
        uploadSuccessList: [],
        rules: {
          discipline: [
            {required: true, message: '请选择资源所属类别', trigger: 'blur'}
          ],
          textarea: [
            {required: true, message: '请输入资源介绍', trigger: 'blur'}
          ]
        },
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
      }
    },
    created() {
      let userId = this.$cookies.get('user_id');
      if (userId) {
        this.fileForm.user_id = userId;
        this.isEmpty = false;
      } else {
        this.$message({
          message: '请先登录再查看喔~',
          type: 'warning'
        });
        this.isEmpty = true;
      }
    },
    methods: {
      submitUpload(formName) {
        if (!this.fileForm.discipline) {
          this.$message.warning('请选择资源所属类别');
          return false;
        }
        if (!this.fileForm.textarea) {
          this.$message.warning('请输入资源介绍~~');
          return;
        }
        if (this.fileForm.textarea.length >= 500) {
          this.$message.warning('简介内容过长~~');
          return;
        }
        this.$refs.upload.submit();
      },
      clearUploadFiles() {
        this.$refs.upload.clearFiles();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      successHandle(response, file, fileList) {

        if (response.code === 4013) {
          this.$message({
            message: response.code + '~~~~  ' + response.message,
            type: 'success',
            center: true,
            duration: 2000
          });

          this.uploadSuccessList.push(file);
        } else {
          this.$message.error(response.code + '~~~~  ' + response.message);
        }
      },
      failHandle(response, file, fileList) {
        this.$message({
          message: response.code + '~~~~  ' + response.message,
          type: 'error',
          center: true,
          duration: 2500
        });
      }
    }
  }
</script>

<style scoped>
  #div_content {
    text-align: center;
    width: 90%;
    margin: 10% auto;
  }
</style>
