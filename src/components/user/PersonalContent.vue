<template>
  <div id="div_personal_content">

    <!--    页面内容    开始    -->
    <el-container style="height: auto; border: 1px solid #eee; min-height: 600px">

      <!--      左侧菜单栏    开始-->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246);">
        <el-menu style="margin-top: 100px" default-active="1-1">

          <el-submenu index="1">
            <template slot="title"><i class="el-icon-s-custom"></i>个人中心</template>
            <el-menu-item-group>
              <el-menu-item index="1-1" v-on:click="goPersonalInfo"><i class="el-icon-info"></i>账号信息</el-menu-item>
              <el-menu-item index="1-2"><i class="el-icon-edit"></i>修改密码</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title"><i class="el-icon-folder-opened"></i>资源管理</template>
            <el-menu-item-group>
              <el-menu-item index="2-1" v-on:click="goUpload"><i class="el-icon-upload"></i>添加上传</el-menu-item>
              <el-menu-item index="2-2"><i class="el-icon-delete-solid"></i>删除上传</el-menu-item>
              <el-menu-item index="2-3"><i class="el-icon-document"></i>我的资料</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"><i class="el-icon-reading"></i>历史记录</template>
            <el-menu-item-group>
              <el-menu-item index="3-1"><i class="el-icon-download"></i>下载记录</el-menu-item>
              <el-menu-item index="3-2"><i class="el-icon-upload2"></i>上传记录</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title"><i class="el-icon-view"></i>我的关注</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title"><i class="el-icon-star-on"></i>我的收藏</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title"><i class="el-icon-s-comment"></i>我的评论</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="7">
            <template slot="title"><i class="el-icon-s-tools"></i>用户管理</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="8">
            <template slot="title"><i class="el-icon-s-data"></i>数据中心</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>


        </el-menu>
      </el-aside>
      <!--      左侧菜单栏    结束-->

      <!--      右侧内容部分   开始-->
      <el-container>

        <router-view></router-view>

      </el-container>
      <!--      右侧内容部分   结束-->

    </el-container>
    <!--    页面内容    结束    -->

  </div>
</template>

<script>
  export default {
    name: "PersonalContent",
    data() {
      return {}
    },
    created() {
    },
    methods: {
      goPersonalInfo() {
        if (this.$route.path !== '/personal') {
          this.$router.push('/personal');
        }
      },
      goUpload() {
        if (this.$route.path !== '/upload') {
          this.$router.push('/upload');
        }
      }
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  #span_username {
    color: aqua;
    font-size: 20px;
    font-weight: bold;
  }

  #div_personal_content {
    margin: 15px auto;
    width: 70%;
  }
</style>
