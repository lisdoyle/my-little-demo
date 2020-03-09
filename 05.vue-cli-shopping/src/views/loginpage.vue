<template>
  <div class="loginpage"> 
    <p>this is loginpage</p>
    
    <login/>
  </div>
</template>

<script>
import login from '../components/login.vue'

export default {
  components:{
    login,
  }
}
</script>

<style lang="scss">
.loginpage{

  background:rgb(240, 173, 173);
}
</style>