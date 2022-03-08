<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    if(this.$cookies.get('username')){
      this.getUsername();
    }
  },
  methods: {
    getUsername() {

    }
  }
}
</script>

<style>
#app a{
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  cursor: pointer;
}
</style>
