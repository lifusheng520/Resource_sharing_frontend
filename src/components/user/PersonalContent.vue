<template>
  <div id="div_personal_content">

    <!--    页面内容    开始    -->
    <el-container style="height: auto; border: 1px solid #eee; min-height: 600px">

      <!--      左侧菜单栏    开始-->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246);">
        <el-menu style="margin-top: 100px">

          <el-submenu index="1">
            <template slot="title"><i class="el-icon-s-custom"></i>个人信息</template>
            <el-menu-item-group>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>导航二</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!--      左侧菜单栏    结束-->

      <!--      右侧内容部分   开始-->
      <el-container>

        <!--        容器头部  开始-->
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span id="span_username" v-model="this.user.username">
            {{this.user.username}}
            <i class="el-icon-user-solid"></i>
          </span>
        </el-header>
        <!--        容器头部  结束-->

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
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        user: {
          id: '',
          username: ''
        },
        tableData: Array(10).fill(item)
      }
    },
    created() {
      if (this.$cookies.get('user_id')) {
        this.user.username = this.$cookies.get('username');
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
