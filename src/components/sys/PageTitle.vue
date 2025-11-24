<template>
  <div>

    <!-- page-title 页面标题开始-->
    <div class="page-title">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-8">
            <div class="page-title-content">
              <h1>{{titleContent}}</h1>
              <p>{{$t('pageTitle.introduction')}}</p>
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
          case '/login': title = this.$t('pageTitle.login');break;
          case '/register': title = this.$t('pageTitle.register');break;
          case '/forgetpass': title = this.$t('pageTitle.forgetPassword');break;
          case '/rank': title = this.$t('pageTitle.rank');break;
          case '/focus': title = this.$t('pageTitle.focus');break;
          case '/uploadData': title = this.$t('pageTitle.uploadAnalysis');break;
          case '/downloadData': title = this.$t('pageTitle.downloadAnalysis');break;
          case '/personal': title = this.$t('pageTitle.dashboard');break;
          default: title = this.$t('pageTitle.dashboard');
        }

        this.titleContent = title;
      }
    }
  }
</script>

<style scoped>

</style>
