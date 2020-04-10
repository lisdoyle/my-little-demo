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
        <div class="cart-info">info</div>
        <div class="cart-price">price</div>
        <div class="cart-count">count</div>
        <div class="cart-cost">cost</div>
        <div class="cart-delete">delete</div>
      </div>

      <div class="content-empty">购物车为空</div>
    </div>

    <!-- 优惠券 -->
    <div class="cart-promotion">
      <span>使用优惠券</span>
      <input type="text">
      <button class="btn btn-primary">验证</button>
    </div>

    <!-- 底部 -->
    <div class="cart-footer">
      <div class="footer-count">共计
        <span>xxx</span>
      </div>
      <div class="footer-discount">应付总额
        <span>xxxx</span>
        <div class="promotion">(优惠
          <span>￥ xxx</span>)
        </div>
      </div>
      <div class="footer-submit">
        <button class="btn btn-primary">现在结算</button>
      </div>
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
      padding: 16px 32px;
      border-bottom: 1px solid #dddee1;
      border-radius: 10px 10px 0 0;
      background: #f8f8f9;
    }
    .header-main{
      padding: 8px 32px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #dddee1;
      background: #eee;
      overflow: hidden;
      div{
        text-align: center;
        font-size: 14px;
        width: 10%;
      }
      .info{
        text-align: left;
        width: 60%;
      }
    }
  }
  .cart-content{
    
    .content-main{
      padding: 0 32px;
      border-bottom: 1px dashed #e9eaec;
    }
    .content-empty{
      padding: 32px;
    }
  }
  .cart-promotion{
    padding: 16px 32px;
  }
  .cart-footer{
    padding: 32px;
  }


}
</style>