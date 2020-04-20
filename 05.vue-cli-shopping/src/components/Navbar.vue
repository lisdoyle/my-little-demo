<template>
  <div class="navibar" v-if="loginStatus">
    

    <router-link to="/list" class="nav-home">首页</router-link>

    <router-link to="/cart" class="nav-cart">购物车
      <span v-if="cartList.length">{{this.cartList.length}}</span>
    </router-link>

    <div>{{username}}</div>

    <a class="nav-logout" href="javascript:void(0)" @click="logout">退出登录
    </a>
  </div>
</template>

<script>
export default {
  data(){
    return{
      
    }
  },
  computed:{
    cartList(){
      return this.$store.state.cartList
    },
    username(){
      return this.$store.state.username
    },
    loginStatus(){
      return this.$store.state.loginStatus
    }
  },
  methods:{
    // 退出登陆状态
    logout(){
      localStorage.loginStatus = false
      this.$store.commit("getLoginStatus",false)
      this.$router.push("/")
    }
  }
}
</script>

<style lang="scss" scoped>
.navibar{
  height: 48px;
  line-height: 48px;
  background: rgba(0,0,0,.8);
  color: #fff;
  display: flex;
  justify-content: space-between;
  a{
    text-decoration: none;
    color: #fff;
  }
  .nav-home{
    width: 60%;
    padding-left: 32px;
  }
  .nav-logout{
    padding-right: 32px;
  }
  .nav-cart{
    span{
      display: inline-block;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      line-height: 16px;
      text-align: center;
      background: #ff5500;
      color: #fff;
      font-size: 12px;

    }
  }
}
</style>