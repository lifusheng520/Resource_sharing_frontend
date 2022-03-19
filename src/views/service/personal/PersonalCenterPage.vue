<template>

  <div>

    <Header></Header>

    <PageTitle></PageTitle>

    <PersonalContent></PersonalContent>

    <Footer></Footer>

  </div>

</template>

<script>

  import Header from '../../../components/sys/Header'
  import PageTitle from '../../../components/sys/PageTitle'
  import Footer from '../../../components/sys/Footer'
  import PersonalContent from '../../../components/user/PersonalContent'

  export default {
    name: "PersonalCenterPage",
    components: {Header, PageTitle, Footer, PersonalContent},
    methods: {}
  }
</script>

<style scoped>
</style>
