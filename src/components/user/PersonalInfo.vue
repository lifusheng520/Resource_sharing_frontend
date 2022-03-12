<template>
  <div id="div_personal_info">

    <!--    头像-->
    <p style="line-height: 15px">
      <el-avatar :size="140" @error="errorHandler">
        <img src="../../../static/img/none.png"/>
      </el-avatar>
      <br><br>
      <el-button type="primary" size="small">上传头像<i class="el-icon-upload el-icon--right"></i></el-button>
    </p>
    <!--    头像-->

    <!--    content description begin-->
    <div>
      <el-descriptions class="margin-top" title="账号信息" :column="1" :size="size" border>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-check"></i>
            账号
          </template>
          {{this.$store.username}}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            姓名
          </template>
          kooriookami
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-question"></i>
            性别
          </template>
          kooriookami
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-lock"></i>
            账号状态
          </template>
          kooriookami
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-postcard"></i>
            系统身份
          </template>
          18100000000
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-coordinate"></i>
            系统权限
          </template>
          admin
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-connection"></i>
            绑定的邮箱
          </template>
          <el-tag size="small">学校</el-tag>
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class=""></i>
            联系地址
          </template>
          江苏省苏州市吴中区吴中大道 1188 号
        </el-descriptions-item>

      </el-descriptions>
      <p>
        <br>
        <el-button type="primary" size="small">修改我的信息<i class="el-icon-edit el-icon--right"></i></el-button>
      </p>
    </div>
    <!--    content description end-->

  </div>
</template>

<script>
  export default {
    name: "PersonalInfo",
    data() {
      return {
        size: ''
      };
    },
    methods: {
      errorHandler() {
        return true
      }
    }
  }
</script>

<style scoped>

  p {
    text-align: center;
  }

  #div_personal_info {
    width: 90%;
    margin: 5% auto;
  }

</style>
