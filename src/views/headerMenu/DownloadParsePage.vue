<template>
    <div>

      <!--    header-->
      <Header></Header>

      <PageTitle></PageTitle>

      <DownloadDataParse></DownloadDataParse>

      <!--    footer-->
      <Footer></Footer>

    </div>
</template>

<script>
  // 导入页面组件
  import Footer from "../../components/sys/Footer";
  import Header from "../../components/sys/Header";
  import PageTitle from "../../components/sys/PageTitle";
  import DownloadDataParse from "../../components/user/index/DownloadDataParse";

  export default {
        name: "DownloadParsePage",
    components: {Footer, Header, PageTitle, DownloadDataParse},
    }
</script>

<style scoped>

</style>
