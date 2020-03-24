<template>
  <div class="list">
    <p>this is list</p>

    <!-- 列表控制项 -->
    <div class="list-control">
      <div class="list-control-filter">
        <span>品牌:</span>
        <button class="btn btn-primary">111</button>
        <button class="btn btn-default">222</button>
      </div>

      <div class="list-control-filter">
        <span>颜色:</span>
        <button 
          class="btn btn-default"
          :class="{'btn-primary':true}"
        >111</button>
        <button class="btn btn-default">222</button>
      </div>

      <div class="list-control-filter">
        <span>排序:</span>
        <button class="btn btn-default">111</button>
        <button class="btn btn-default">222</button>
      </div>
    </div>

    <!-- 商品展示 -->
    <Product  v-for="item in filteredAndOrderedList" :info="item" :key="item.id"></Product>

    <!-- Product中没商品时显示 -->
    <div class="product-not-found">暂无相关商品</div>

    
  </div>
</template>

<script>
import Product from "../components/Product.vue";

export default {
  components: {
    Product
  },
  data() {
    return {
      
    };
  },
  methods: {
    
  },
  computed:{
    // 1.全部商品数组
    list(){
      //从Vuex获取商品列表信息
      return this.$store.state.productList;
    },
    // 2.经过筛选的商品数组
    filteredAndOrderedList(){
      // 深拷贝
      let list = [...this.list]
      return list
    },
  }
};
</script>

<style lang="scss">
.list {
  background: #f8f8f8;;
  .list-control{
    background: rgb(255, 255, 255);
    border-radius: 6px;
    margin: 16px;
    padding: 16px;
    box-shadow: 0px 1px 1px rgba(0,0,0,.2);

    .list-control-filter{
      margin: 4px 0;
      .btn{
        margin: 0 5px;
        height: 26px;
        line-height: 12px;
      }
     
    }
    
  }
}
</style>