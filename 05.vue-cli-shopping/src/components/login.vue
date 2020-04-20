<template>
  <div class="login">
    <p>this is login</p>

    <div class="form1">
      <form class>
        <div class="form-group">
          <h1>登陆界面</h1>
        </div>

        <div class="form-group">
          <label for="username">用户账号:</label>
          <input type="text" id="username" v-model="username"/>
        </div>

        <div class="form-group">
          <label for="pwd">用户密码:</label>
          <input type="password" id="pwd" v-model="password"/>
        </div>

        <div class="form-group">
          <button class="btn btn-success" @click="login">提交</button>
          <router-link to='/loginpage/register' class="btn btn-default" tag='button'>前往注册</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      username:'',
      password:''
    }
  },
  methods:{
    login(){
      // 先从localStorage获取数据
      var username = localStorage.username
      var password = localStorage.password
      // 判断登陆信息不为空
      if(!this.username.trim() || !this.password.trim()){
        alert("账号或密码不能为空")
        return
      }
      // 和后台保存的数据是否一致
      if(username === this.username && password === this.password){
        localStorage.loginStatus = "login"
        this.$store.commit("getLoginStatus","login")
        this.$store.commit("getUser",this.username)
        alert("登陆成功")
        this.$router.push("/list")
      }else{
        alert("账号或密码错误")
      }
    }
  }
}
</script>

<style lang="scss">

.login {
  background: #f8f8f9;

  .form1 {
    text-align: center;

    .btn{
      margin: 0 10px;
    }
  }
}
</style>