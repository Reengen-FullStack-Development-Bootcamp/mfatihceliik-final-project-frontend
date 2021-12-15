<template>
  <div id="app">
      <Navigation />
      <router-link to="/"></router-link> 
      <router-link to="/register"></router-link> 
      <router-link to="/factories"></router-link> 
      <router-view></router-view>
  </div>
</template>

<script>

import Navigation from './components/Navigation.vue'

export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-left:auto;
  margin-right:auto;
  width:70%;
}


</style>
