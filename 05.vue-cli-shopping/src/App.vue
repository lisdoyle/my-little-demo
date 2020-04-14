<template>
  <div id="app">
   
    <p>this is app</p>
    
    <Navbar/>
    
    <router-view/>
  </div>
</template>

<script>

import Navbar from './components/Navbar'
export default {
  components:{
    Navbar,
  }
}
</script>

<style lang="scss">


</style>
