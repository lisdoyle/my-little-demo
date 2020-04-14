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
          <input type="text" id="username" />
        </div>

        <div class="form-group">
          <label for="pwd">用户密码:</label>
          <input type="password" id="pwd" />
        </div>

        <div class="form-group">
          <button class="btn btn-success">提交</button>
          <router-link to='/loginpage/register' class="btn btn-default" tag='button'>前往注册</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

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