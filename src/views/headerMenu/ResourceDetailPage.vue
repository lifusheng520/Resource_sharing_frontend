<template>
  <div>

    <!--    header-->
    <Header></Header>

    <ResourceDetail></ResourceDetail>

    <!--    footer-->
    <Footer></Footer>

  </div>
</template>

<script>
  // 导入页面组件
  import Footer from "../../components/sys/Footer";
  import Header from "../../components/sys/Header";
  import ResourceDetail from "../../components/user/resource/ResourceDetail";

  export default {
    name: "ResourceDetailPage",
    components: {Footer, Header, ResourceDetail},
  }
</script>

<style scoped>



</style>
