<template>
  <!-- 列表中的单个商品展示 -->
  <div class="product">
    <P>this is one product</P>
    <!-- 点击进入商品详情 -->
    <router-link :to="'/product-info/' + info.id"  class="product-main"> 
      <!-- 依次显示商品图片、名称、销量、颜色、单价，加入购物车 -->
      <div class="img-fit">
        <img :src="info.image">
      </div>
      

      <h4>{{info.name}}</h4>
      <h4>销量{{info.sales}}</h4>
      <div class="product-color" :style="{background: colors[info.color]}"></div>
      <div class="product-cost">￥ {{info.cost}}</div>
      <!-- 阻止默认行为，否则点击按钮的同时也会触发a标签进入详情页 
        @click.stop阻止点击事件冒泡
        @click.prevent阻止默认行为
        因为<router-link>会转化为<a> ，而<a></a>间的元素会被附上href跳转默认行为，因此，这里我们不是需要阻止冒泡，为是防止跳转
      -->
      <div class="product-add-cart" @click.prevent="handleAddCart(info.id)">
        加入购物车
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props:{
    info: Object //初始化，注册info属性，使info可以接受List.vue中:info="item"传递的单个商品信息
  },
  data(){
    return {
      colors:{
        '白色': '#ffffff',
        '金色': '#dac272',
        '蓝色': '#233472',
        '红色': '#f2352e'
      }
    }
  },
  methods:{
    // 添加到购物车
    handleAddCart(id){
      this.$store.commit('addCart',id)
    }
  }
}
</script>

<style lang="scss" scoped>
.product{
  width: 25%;

  .product-main{
    display: block;
    background: white;
    margin: 16px;
    padding: 16px;
    border: 1px solid #dddee1;
    border-radius: 6px;
    overflow: hidden;
    text-align: center;
    text-decoration: none;
    position: relative;
    

    // 图片自适应
    .img-fit{
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      position: relative;
      img{
        position: absolute;
        display: block;
        width: 100%;
        height: 100%;
      }
    }

    h4{
      color: #222;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .product-color{
      display: block;
      width: 16px;
      height: 16px;
      border: 1px solid #dddee1;
      border-radius: 50%;
      margin: 6px auto;
    }
    .product-cost{
      color: #de4037;
      margin-top: 6px;
    }
    .product-add-cart{
      display: none;
      background: #2d8cf0;
      color: #fff;
      font-size: 12px;
      border-radius: 3px;
      padding: 4px 8px;
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
    }
    
  }
  .product-main:hover{
    h4{
      color: #0070c9;
    }
    .product-add-cart{
      display: inline-block;
    }
  }
}
</style>