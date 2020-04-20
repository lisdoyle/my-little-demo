<template>
  <div class="loginpage"> 
    <p>this is loginpage</p>
    
    <!-- <login/>
    <register/> -->
    <router-view/>
  </div>
</template>

<script>


export default {
  // 进入页面先判断能不能获取到登陆状态
  // 如果为登陆状态，直接跳转到 list 页面
  created(){
    var loginStatus =this.$store.state.loginStatus
    
    if(loginStatus === "login"){
      alert("您已经是登录状态")
      this.$router.push("/list")
    }
  }
}
</script>

<style lang="scss">
.loginpage{

  background:rgb(240, 173, 173);
}
</style>