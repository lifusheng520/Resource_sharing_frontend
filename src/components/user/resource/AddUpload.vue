<template>
  <div id="div_content">
    <el-empty v-if="this.isEmpty" style="margin: 20%" :description="`${$t('notFound404')}`"></el-empty>
    <div v-else>

      <h2>{{$t('addUpload.title')}}</h2><br><br>

      <el-form :model="fileForm" :rules="rules" ref="fileForm" label-width="200px" class="demo-ruleForm">

        <el-upload class="upload-demo" ref="upload" with-credentials
                   :action="`${backendURL}/resource/upload/${fileForm.user_id}/${fileForm.discipline}/${fileForm.textarea}`"
                   :on-preview="handlePreview" :on-remove="handleRemove" :file-list="this.fileForm.fileList"
                   :on-success="successHandle" :on-error="failHandle"
                   :auto-upload="false" multiple>
          <el-button slot="trigger" type="primary">
            {{$t('addUpload.selectFiles')}}
          </el-button>
          <br><br>
          <div slot="tip" class="el-upload__tip" style="font-size: 20px">
            {{$t('addUpload.filesUploadPrompt')}}
            <p></p>
            <p style="text-align: left">
              {{$t('addUpload.selectedFiles')}}
            </p>
          </div>

        </el-upload>
        <br>

        <el-form-item :label="`${$t('addUpload.belongTo')}`" prop="discipline">
          <el-select style="min-width: 300px;" v-model="fileForm.discipline" :placeholder="`${$t('addUpload.placeholderPrompt')}`">
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

        <el-form-item :label="`${$t('addUpload.resourceIntroduction')}`" prop="textarea">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}"
                    maxlength="500" show-word-limit
                    :placeholder="`${$t('addUpload.introductionPlaceholder')}`"
                    v-model="fileForm.textarea">
          </el-input>
        </el-form-item>

      </el-form>

      <el-button style="margin-top: 5%;" type="success" @click="submitUpload('fileForm')">
        {{$t('submitButton')}}
      </el-button>
      <el-button style="margin-top: 5%;" type="primary" @click="clearUploadFiles">
        {{$t('resetButton')}}
      </el-button>
    </div>

  </div>

</template>

<script>
  export default {
    name: "AddUpload",
    data() {
      return {
        backendURL: this.$axios.defaults.baseURL,
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
            {required: true, message: this.$t('addUpload.rule1'), trigger: 'blur'}
          ],
          textarea: [
            {required: true, message: this.$t('addUpload.rule2'), trigger: 'blur'}
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
          message: this.$t('sessionExpired'),
          type: 'warning'
        });
        this.isEmpty = true;
      }
    },
    methods: {
      submitUpload(formName) {
        if (!this.fileForm.discipline) {
          this.$message.warning(this.$t('addUpload.rule1'));
          return false;
        }
        if (!this.fileForm.textarea) {
          this.$message.warning(this.$t('addUpload.rule2'));
          return;
        }
        if (this.fileForm.textarea.length >= 500) {
          this.$message.warning(this.$t('addUpload.rule3'));
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
            message: response.code + ' ~~~~  ' + this.$t('addUpload.uploadSuccess'),
            type: 'success',
            center: true,
            duration: 2000
          });

          this.uploadSuccessList.push(file);
        } else {
          this.$message.error(response.code + ' ~~~~  ' + this.$t('serverError'));
        }

        this.fileForm.discipline = '';
        this.fileForm.textarea = '';
      },
      failHandle(response, file, fileList) {
        this.$message({
          message: response.code + ' ~~~~  ' + this.$t('serverError'),
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
