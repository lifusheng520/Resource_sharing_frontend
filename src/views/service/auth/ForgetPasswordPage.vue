<template>
  <div>
    <Header></Header>
    <ForgetPassword></ForgetPassword>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '../../../components/sys/Header'
  import Footer from '../../../components/sys/Footer'
  import ForgetPassword from '../../../components/sys/ForgetPassword'

  export default {
    name: "ForgetPasswordPage",
    components: {
      Header, ForgetPassword, Footer
    }
  }
</script>

<style scoped>

</style>
