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
      <div class="content-main" v-for="(item ,index) in cartList" :key="index">
        <div class="cart-info">
          <img :src="productDictList[item.id].image" >
          <span>{{ productDictList[item.id].name }}</span>
        </div>
        <div class="cart-price">
          ￥{{ productDictList[item.id].cost }}
        </div>
        <div class="cart-count">
          <span class="count-handle" @click="countHandle(index, -1)">-</span>
          {{item.count}}
          <span class="count-handle" @click="countHandle(index, +1)">+</span>
        </div>
        <div class="cart-cost">
          {{productDictList[item.id].cost * item.count}}
        </div>
        <div class="cart-delete">
          删除
        </div>
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
  data(){
    return{
      productList: this.$store.state.productList,
    }
  },
  methods:{
    countHandle(index, data){
      alert('ok')
    }
  },
  computed:{
    // 
    cartList(){
      return this.$store.state.cartList
    },
    // 字典对象
    productDictList(){
      const dict = {}
      this.productList.forEach(item => {
        dict[item.id] = item
      });
      return dict
    }
  }
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
      padding: 10px 32px;
      border-bottom: 1px dashed #e9eaec;
      display: flex;
      justify-content: space-between;
      align-items: center;
      overflow: hidden;
      >div{
        text-align: center;
        font-size: 14px;
        width: 10%;
      }
      .cart-info{
        text-align: left;
        width: 60%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        img{
          width: 40px;
          height: 40px;
        }
        span{
          padding-left: 10px;
        }
      }
      .cart-count{
        .count-handle{
          display: inline-block;
          width: 24px;
          height: 24px;
          line-height: 24px;
          background: #f8f8f9;
          border-radius: 50%;
          box-shadow: 0 1px 1px rgba(0,0,0,.2);
          cursor: pointer;
        }
      }
    }
    .content-empty{
      padding: 32px;
    }
  }
  .cart-promotion{
    padding: 16px 32px;
    >span,>input{
      margin-right:16px ;
    }
  }
  .cart-footer{
    padding: 32px;
    display: flex;
    justify-content: flex-end;
    > div{
      padding: 0 16px;
    }
    span{
      color: #f2352e;
      font-size: 20px;
    }
  }
  


}
</style>