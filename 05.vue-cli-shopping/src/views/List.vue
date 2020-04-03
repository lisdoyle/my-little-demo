<template>
  <div class="list">
    <p>this is list</p>

    <!-- 列表控制项 -->
    <div class="list-control">
      <div class="list-control-filter">
        <span>品牌:</span>
        <button 
          class="btn btn-default" 
          :class="{'btn-primary': filterBrand === item}"
          v-for="item in brands" 
          :key="item"
          @click="handleFilterBrand(item)">
        {{item}}</button>
      </div>

      <div class="list-control-filter">
        <span>颜色:</span>
        <button 
          class="btn btn-default"
          :class="{'btn-primary':filterColor === item}"
          v-for="item in colors" :key="item"
          @click="handleFilterColor(item) "
        >{{item}}</button>
      </div>

      <div class="list-control-filter">
        <span>排序:</span>
        <button class="btn btn-default"
                :class="{'btn-primary': order ===''}"
                @click="order=''"
        >默认</button>
        <button class="btn btn-default"
                :class="{'btn-primary': order ==='sales'}"
                @click="order='sales'"
        >销量
          <span v-if="order === 'sales'">↓</span>
        </button>
        <button class="btn btn-default"
                :class="{'btn-primary': order.indexOf('cost')>-1}"
                @click="handleOrderCost"
        >价格
          <span v-if="order === 'cost-desc'">↓</span>
          <span v-if="order === 'cost-asc'">↑</span>
        </button>
        
      </div>
    </div>

    <!-- 商品展示 -->
    <div class="product-list">
      <Product  v-for="item in filteredAndOrderedList" :info="item" :key="item.id"></Product>

      <!-- Product中没商品时显示 -->
      <div class="product-not-found" v-show="!filteredAndOrderedList.length">暂无相关商品</div>
    </div>
    

    

    
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
      //储存排序关键字，“default” “sales” “cost-desc” 'cost-asc'
      order:'' ,
      //品牌过滤按钮
      filterBrand: '',
      //颜色过滤按钮
      filterColor: '',
    };
  },
  methods: {
    // 点击品牌，筛选
    handleFilterBrand(brand){
      // 点击选中过滤，再点击取消
      if(this.filterBrand === brand){
        this.filterBrand = ''
      }else{
        this.filterBrand = brand
      }
    },
    // 点击筛选颜色
    handleFilterColor(color){
      if(this.filterColor === color){
        this.filterColor = ''
      }else{
        this.filterColor = color
      }
    },
    // 点击价格排序
    handleOrderCost(){
      // 当点击升序时将箭头更新↓,降序设置为↑
      if(this.order === 'cost-desc'){
        this.order = 'cost-asc';
      }else{
        this.order = 'cost-desc';
      }
    }
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
      //----筛选操作----//

      // 1.筛选品牌
      if(this.filterBrand !== '' ){
        var arr = list.find(function(item){
          return item.brand === this.filterBrand
        })
        list = arr
      }
      
      
      // .排序
      if(this.order !=''){

      }
      //----筛选操作-end---//
      return list
    },
    // 3.去重后品牌数组
    brands(){
      return this.$store.getters.brands
    },
    // 4.去重后颜色数组
    colors(){
      return this.$store.getters.colors
    },
  },
  mounted(){
    
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
  .product-list{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;

    .product-not-found{
      text-align: center;
      padding: 32px;
    }
  }
}
</style>