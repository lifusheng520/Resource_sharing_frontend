<template>
  <div>

    <!--    header-->
    <Header></Header>

    <PageTitle></PageTitle>

    <UploadRank></UploadRank>

    <!--    footer-->
    <Footer></Footer>

  </div>
</template>

<script>
  // 导入页面组件
  import Footer from "../../components/sys/Footer";
  import Header from "../../components/sys/Header";
  import UploadRank from "../../components/user/index/UploadRank";
  import PageTitle from "../../components/sys/PageTitle";

  export default {
    name: "UploadRankPage",
    components: {Footer, Header, UploadRank, PageTitle},
  }
</script>

<style scoped>

</style>
