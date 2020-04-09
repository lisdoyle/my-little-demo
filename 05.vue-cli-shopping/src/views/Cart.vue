<template>
  <div class="cart">
    <p>this is cart</p>
    <!-- 标题 -->
    <div class="cart-header">
      <div class="header-title">购物清单</div>
      <div class="header-main">
        <div class="info">商品信息</div>
        <div class="price">单价</div>
        <div class="count">数量</div>
        <div class="cost">小计</div>
        <div class="delete">删除</div>
      </div>
    </div>

    <!-- 列表 -->
    <div class="cart-content">
      <!-- 商品 -->
      <div class="content-main">
        <div class="cart-info"></div>
        <div class="cart-price"></div>
        <div class="cart-count"></div>
        <div class="cart-cost"></div>
        <div class="cart-delete"></div>
      </div>

      <div class="content-empty">>购物车为空</div>
    </div>

    <!-- 优惠券 -->
    <div class="cart-promotion">

    </div>

    <!-- 底部 -->
    <div class="cart-footer">

    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.cart{
  margin: 32px;
  background: #fff;
  border: 1px solid #dddee1;
  border-radius: 10px;
  .cart-header{
    .header-title{

    }
    .header-main{

    }
  }
  .cart-content{
    .content-main{

    }
    .content-empty{

    }
  }
  .cart-promotion{

  }
  .cart-footer{

  }


}
</style>