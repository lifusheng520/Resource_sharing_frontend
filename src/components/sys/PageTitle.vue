<template>
  <div>

    <!-- page-title 页面标题开始-->
    <div class="page-title">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-8">
            <div class="page-title-content">
              <h1>{{titleContent}}</h1>
              <p>享受方便快捷的资料查找和分享服务</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- page-title 页面标题结束 -->

  </div>
</template>

<script>
  export default {
    name: "PageTitle",
    data(){
      return {
        titleContent: ''
      }
    },
    created() {
      this.getPageTitle();
    },
    methods: {
      getPageTitle() {
        let path = this.$route.path;
        let title;
        switch (path) {
          case '/login': title = 'Login';break;
          case '/register': title = '账 户 注 册';break;
          case '/forgetpass': title = '忘 记 密 码';break;
          case '/rank': title = '上 传 排 行';break;
          case '/focus': title = '我 的 关 注';break;
          case '/uploadData': title = '上 传 分 析';break;
          case '/downloadData': title = '下 载 分 析';break;
          case '/personal': title = 'Personal Space';break;
          default: title = 'Personal Space';
        }

        this.titleContent = title;
      }
    }
  }
</script>

<style scoped>

</style>
