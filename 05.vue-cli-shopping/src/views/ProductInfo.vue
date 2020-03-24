<template>
  <div class="product-info">
    <p>this is product-info</p>
    
    <div class="product">
      <div class="product-image">
        <img :src="product.image" alt="">
      </div>
      <div class="product-information">
        <h1 class="product-name">{{product.name}}</h1>
        <div class="product-cost">{{product.cost}}</div>
        <button class="product-add-cart">加入购物车</button>
      </div>
    </div>
    <div class="product-description">
      <h2>产品介绍</h2>
      <img :src="product.imageDetail">
    </div>
  </div>
</template>

<script>
import product from '../../../shopping-master/src/product'
export default {
  data(){
    return {
      // 获取路由'/product-info/:id'中的占位符：id的参数
      id: parseInt(this.$route.params.id),
      
      product: Object // 初始化,用来接收当前这个商品信息
    }
  },
  methods:{
    // 根据id从商品列表中提取单个商品信息
    getProduct(){
      // 异步获取数据：所有从外部获取数据的操作都用异步处理，防止获取时间过长而导致长时间等待
      setTimeout(() => {
        this.product = this.$store.state.productList.find(item => item.id === this.id);
      },500);
    }
  },
  mounted(){
    this.getProduct() //获取当前商品信息
  }
}
</script>

<style lang="scss" scoped>

</style>