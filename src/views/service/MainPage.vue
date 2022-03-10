<template>
  <div>

    <!--    header-->
    <Header></Header>

    <MyIndex></MyIndex>

    <!--    footer-->
    <Footer></Footer>

  </div>
</template>

<script>

  // 导入页面组件
  import Footer from "../../components/sys/Footer";
  import Header from "../../components/sys/Header";
  import Preloader from "../../components/sys/Preloader";
  import PageTitle from "../../components/sys/PageTitle";
  import MyIndex from "../../components/sys/MyIndex";

  export default {
    name: "MainPage",
    data() {
      return {}
    },
    components: {Footer, Header, PageTitle, MyIndex},
    methods: {}
  }

</script>

<style scoped>

</style>
