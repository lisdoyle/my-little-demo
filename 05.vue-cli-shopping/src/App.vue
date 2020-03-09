<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
    <p>this is app</p>
    
    
    <router-view/>
  </div>
</template>

<script>
import loginpage from './views/loginpage.vue'

export default {
  components: {
    loginpage,
  }
}
</script>

<style lang="scss">


</style>
