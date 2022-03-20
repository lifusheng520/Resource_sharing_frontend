<template>
  <div>

    <!--    header-->
    <Header></Header>

    <RecommendationContent></RecommendationContent>

    <!--    footer-->
    <Footer></Footer>

  </div>
</template>

<script>
  // 导入页面组件
  import Footer from "../../components/sys/Footer";
  import Header from "../../components/sys/Header";
  import RecommendationContent from "../../components/user/index/RecommendationContent";

  export default {
    name: "RecommendationPage",
    components: {Footer, Header, RecommendationContent},
  }
</script>

<style scoped>

</style>
