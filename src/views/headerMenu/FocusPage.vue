<template>
  <div>
    <Header></Header>
    <PageTitle></PageTitle>
    <FocusDetail></FocusDetail>
    <Footer></Footer>
  </div>
</template>

<script>
  // 导入页面组件
  import Footer from "../../components/sys/Footer";
  import Header from "../../components/sys/Header";
  import FocusDetail from "../../components/user/focus/FocusDetail";
  import PageTitle from "../../components/sys/PageTitle";

  export default {
    name: "FocusPage",
    components: {Header, Footer, PageTitle, FocusDetail}
  }
</script>

<style scoped>

</style>
