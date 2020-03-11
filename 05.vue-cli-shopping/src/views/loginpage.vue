<template>
  <div class="loginpage"> 
    <p>this is loginpage</p>
    
    <!-- <login/>
    <register/> -->
    <router-view/>
  </div>
</template>

<script>
// import login from '../components/login.vue'
// import register from '../components/register.vue'

export default {
  // components:{
  //   login,
  //   register,
  // }
}
</script>

<style lang="scss">
.loginpage{

  background:rgb(240, 173, 173);
}
</style>