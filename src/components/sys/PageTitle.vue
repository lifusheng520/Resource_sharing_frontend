<template>
  <div>

    <!-- page-title 页面标题开始-->
    <div class="page-title">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-8 col-lg-8">
            <div class="page-title-content">
              <h1>{{this.$store.pageTitle}}</h1>
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
    name: "PageTitle"
  }
</script>

<style scoped>

</style>
