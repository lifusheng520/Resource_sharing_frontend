<template>
  <div style="position: relative">
    <!--    <div id="background_div">-->
    <!--      <img src="static/img/personal_background.png" height="100%" width="100%">-->
    <!--    </div>-->

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
                <el-menu-item index="1-2" v-on:click="goUpdatePassword"><i class="el-icon-edit"></i>修改密码</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title"><i class="el-icon-folder"></i>资源中心</template>
              <el-menu-item-group>
                <el-menu-item index="2-1" v-on:click="goUpload"><i class="el-icon-upload"></i>添加资源</el-menu-item>
                <el-menu-item index="2-2" v-on:click="goResourceManagement"><i class="el-icon-setting"></i>资源管理
                </el-menu-item>
                <el-menu-item index="2-3" v-on:click="goDeletedResourceManager"><i class="el-icon-delete-solid"></i>垃圾箱
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title"><i class="el-icon-reading"></i>历史记录</template>
              <el-menu-item-group>
                <el-menu-item index="3-1"><i class="el-icon-download"></i>下载记录</el-menu-item>
                <el-menu-item index="3-2"><i class="el-icon-upload2"></i>上传记录</el-menu-item>
                <el-menu-item index="3-3"><i class="el-icon-upload2"></i>浏览记录</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-menu-item index="4" v-on:click="goFocusManager">
              <i class="el-icon-view"></i>我的关注
            </el-menu-item>

            <el-submenu index="5">
              <template slot="title"><i class="el-icon-star-on"></i>我的收藏</template>
              <el-menu-item-group>
                <el-menu-item index="5" v-on:click="goFavouriteManager">
                  <i class="el-icon-star-on"></i>收藏管理
                </el-menu-item>
                <el-menu-item index="3-2" v-on:click="goFavouriteFolderManager">
                  <i class="el-icon-wallet"></i>收藏夹管理
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-menu-item index="6" v-on:click="goCommentManager">
              <i class="el-icon-s-comment"></i>我的评论
            </el-menu-item>

            <el-submenu index="7">
              <template slot="title"><i class="el-icon-s-tools"></i>管理员中心</template>
              <el-menu-item-group>
                <el-menu-item index="7-1" v-on:click="goCheckResource"><i class="el-icon-document-checked"></i>资源审批
                </el-menu-item>
                <el-menu-item index="7-2" v-on:click="goUserManager"><i class="el-icon-user"></i>用户管理
                </el-menu-item>
                <el-menu-item index="7-3" v-on:click="goPlatformResourceManager"><i class="fa fa-cogs"></i>&nbsp;&nbsp;平台资源管理
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="8">
              <template slot="title"><i class="fa fa-chart-bar"></i>&nbsp;&nbsp;&nbsp;数据中心</template>
              <el-menu-item-group>
                <el-menu-item index="8-1">上传数据管理</el-menu-item>
                <el-menu-item index="8-2">下载数据管理</el-menu-item>
                <el-menu-item index="8-3">数据统计</el-menu-item>
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
      },
      goResourceManagement() {
        if (this.$route.path !== '/resourceManagement') {
          this.$router.push('/resourceManagement');
        }
      },
      goDeletedResourceManager() {
        if (this.$route.path !== '/deletedResourceManagement') {
          this.$router.push('/deletedResourceManagement');
        }
      },
      goUpdatePassword() {
        if (this.$route.path !== '/updatePass') {
          this.$router.push('/updatePass');
        }
      },
      goCommentManager() {
        if (this.$route.path !== '/commentManager') {
          this.$router.push('/commentManager');
        }
      },
      goFocusManager() {
        if (this.$route.path !== '/focusManager') {
          this.$router.push('/focusManager');
        }
      },
      goFavouriteManager() {
        if (this.$route.path !== '/favouriteManager') {
          this.$router.push('/favouriteManager');
        }
      },
      goFavouriteFolderManager() {
        if (this.$route.path !== '/favouriteFolderManager') {
          this.$router.push('/favouriteFolderManager');
        }
      },
      goCheckResource() {
        if (this.$route.path !== '/checkResource') {
          this.$router.push('/checkResource');
        }
      },
      goUserManager() {
        if (this.$route.path !== '/userManager') {
          this.$router.push('/userManager');
        }
      },
      goPlatformResourceManager() {
        if (this.$route.path !== '/platformResourceManager') {
          this.$router.push('/platformResourceManager');
        }
      },
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

  #background_div {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
  }

  #div_personal_content {
    margin: 15px auto;
    width: 90%;
  }
</style>
