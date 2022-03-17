<template>
  <div id="div_content">
    <el-empty v-if="this.isEmpty" description="网络开小差了，请重新登录~~~"></el-empty>
    <div v-else>


      <h2>分享你的资源</h2><br><br>


      <el-form :model="fileForm" :rules="rules" ref="fileForm" label-width="200px" class="demo-ruleForm">

        <el-form-item label="资源所属科目" prop="discipline">
          <el-select v-model="fileForm.discipline" placeholder="请选择资源科目">
            <el-option label="计算机科学" value="computer"></el-option>
            <el-option label="哲学" value="philosophy"></el-option>
            <el-option label="文学" value="literature"></el-option>
            <el-option label="经济学" value="economics"></el-option>
            <el-option label="艺术学" value="art"></el-option>
            <el-option label="理学" value="science"></el-option>
            <el-option label="工学" value="engineering"></el-option>
            <el-option label="教育学" value="education"></el-option>
            <el-option label="历史学" value="history"></el-option>
            <el-option label="医学" value="medicine"></el-option>
            <el-option label="军事学" value="military"></el-option>
            <el-option label="管理学" value="management"></el-option>
            <el-option label="法学" value="law"></el-option>
            <el-option label="农学" value="agriculture"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-upload class="upload-demo" ref="upload" with-credentials
                 :action="`http://localhost:8080/resource/upload/${fileForm.user_id}/${fileForm.discipline}`"
                 :on-preview="handlePreview" :on-remove="handleRemove" :file-list="this.fileForm.fileList"
                 :on-success="successHandle" :on-error="failHandle"
                 :auto-upload="false" multiple>
        <el-button slot="trigger" type="primary">选取本地磁盘文件</el-button>
        <br><br>
        <div slot="tip" class="el-upload__tip" style="font-size: 20px">一次可以选择多个文件，且不超过1GB <p></p>
          <p style="text-align: left">已选择文件：</p>
        </div>
      </el-upload>
      <el-button style="margin-top: 5%;" type="success" @click="submitUpload('fileForm')">上传到平台服务器</el-button>
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
          fileList: []
        },
        rules: {
          discipline: [
            {required: true, message: '请选择资源所属科目', trigger: 'blur'}
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
        this.isEmpty = true;
      }
    },
    methods: {
      submitUpload(formName) {
        console.log(this.fileForm);
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            alert('error submit!!');
            return false;
          }
        });
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      successHandle(response, file, fileList) {
        if (response.code === 4013)
          this.$message({
            message: response.code + '~~~~  ' + response.message,
            type: 'success',
            center: true,
            duration: 2000
          });
        else{
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
