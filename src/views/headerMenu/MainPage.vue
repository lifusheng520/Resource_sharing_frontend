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
  import MyIndex from "../../components/user/index/MyIndex";

  export default {
    name: "MainPage",
    data() {
      return {}
    },
    components: {Footer, Header, MyIndex},
    methods: {}
  }

</script>

<style scoped>

</style>
