<template>
  <div>
    <Header></Header>
    <Login></Login>
    <Footer></Footer>
  </div>
</template>

<script>

  import Header from '../../../components/sys/Header'
  import Footer from '../../../components/sys/Footer'
  import Login from '../../../components/sys/Login'
  import Preloader from '../../../components/sys/Preloader'

  export default {
    name: "LoginPage",
    components: {
      Header, Footer, Login, Preloader
    }
  }
</script>

<style scoped>

</style>
