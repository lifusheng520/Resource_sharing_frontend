<template>
  <div>
    <Header></Header>
    <Register></Register>
    <Footer></Footer>
  </div>
</template>

<script>

  import Header from '../../../components/sys/Header'
  import Footer from '../../../components/sys/Footer'
  import Register from '../../../components/sys/Register'

  export default {
    name: "RegisterPage",
    components: {
      Header, Register, Footer
    }
  }
</script>

<style scoped>

</style>
