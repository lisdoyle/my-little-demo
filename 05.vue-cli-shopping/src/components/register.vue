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
          <label for="pwd">确认密码:</label>
          <input type="password" id="pwd" v-model="confirmPassword"/>
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
      //
      if( $username || $password){

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