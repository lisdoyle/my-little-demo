<template>
  <div class="navibar">
    

    <router-link to="/list" class="nav-home">首页</router-link>

    <router-link to="/cart" class="nav-cart">购物车
      <span v-if="cartList.length">{{cartList.length}}</span>
    </router-link>

    <div>{{username}}</div>

    <router-link to="/loginpage/logout" class="nav-logout">退出登录
    </router-link>
  </div>
</template>

<script>
export default {
  data(){
    return{
      cartList: this.$store.state.cartList,
      username: this.$store.state.username
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