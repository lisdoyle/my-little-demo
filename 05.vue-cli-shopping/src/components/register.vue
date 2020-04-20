<template>
  <div class="login">
    <p>this is register</p>

    <div class="form1">
      <form class>
        <div class="form-group">
          <h1>注册界面</h1>
        </div>

        <div class="form-group">
          <label for="username">用户账号:</label>
          <input type="text" id="username" v-model="username" />
        </div>

        <div class="form-group">
          <label for="pwd">用户密码:</label>
          <input type="password" id="pwd" v-model="password"/>
        </div>

        <div class="form-group">
          <label for="cpwd">确认密码:</label>
          <input type="password" id="cpwd" v-model="confirmPassword"/>
        </div>

        <div class="form-group">
          <button class="btn btn-success" @click="register">提交</button>
          <router-link to='/loginpage/login' class="btn btn-default" tag='button'>已有账号</router-link>
        </div>
      </form>

    </div>
  </div>
</template>

<script>


export default {
  data(){
    return{
      // 填入的名字
      username:'',
      password:'',
      confirmPassword:'',
    }
  },
  methods:{
    // 存入local.storage
    register(){
      // 去前后空格
      var $username =this.username.trim()
      var $password =this.password.trim()
      //判断是否为空
      if( !$username || !$password){
        alert('账号或密码不能为空')
        return
      }
      // 判断密码是否一致
      if(this.password !== this.confirmPassword){
        alert('密码不一致，请重新输入')
        this.password = ''
        this.confirmPassword = ''
      }else{
        // 保存到localStorage
        localStorage.username = this.username
        localStorage.password = this.password
        localStorage.loginStatus = 'login'
        // 把用户名返回给store 因为很多页面要用到这个值
        this.$store.commit('getUser',this.username)
        this.$store.commit("getLoginStatus","login")
        alert('注册成功') 
        this.$router.push('/list')
      }
    },
    
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