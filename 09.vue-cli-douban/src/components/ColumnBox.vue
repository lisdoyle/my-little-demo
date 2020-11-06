<template>
  <section class="columnBox">
    <!-- 标题 -->
    <header>
      <h2>{{title}}</h2>
      <a href=""
        v-if="type==='movieImg'"
      >更多</a>
    </header>

    <!-- 图片封面列表 -->
    <div class="section-content">
      <ul v-if="type === 'movieImg'"
        class="row"
      >
        <li v-for="item in items"
          :key="item.id"
          class="item"
        >
          <a href="">
            <div class="item-poster">
              <img :src="item.imgurl" alt="">
            </div>
            <div class="item-title">
              {{item.title}}
            </div>

            <!-- 引入星级评分组件 -->
            <div class="item-rank">
              <Rate :rating="item.rating"></Rate>
            </div>
          </a>
        </li>
      </ul>
    </div>


  </section>
</template>

<script>
import Rate from "@/components/Rate.vue"

export default {
  components:{
    Rate,
  },
  props:[
    "title", //标题
    "items", //电影数据
    "type", //电影还是图书
  ],
  data(){
    return{

    }
  }
}
</script>

<style lang="scss" scoped>
section{
  padding-top: 10px;
  overflow: hidden;
  header{
    padding: 0 18px;
    h2{
      font-size: 18px;
      display: inline-block;
    }
    a{
      color: #42bd56;
      float: right;
      font-size: 14px;
      line-height: 24px;
    }
  }
}
.section-content {
  
}
// 隐藏列表左右两边内容
.row{
  overflow-x: auto;
  white-space: nowrap;
  border-bottom: 1px solid #f2f2f2;
  padding: 15px 0 43px 0;
  
  .item{
    display: inline-block;
    width: 100px;
    margin-left: 8px;
    img{
      width:100%;
      height: 142px;
      object-fit: cover; //短边填充
    }
    .item-title{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 15px;
      padding: 5px;
    }
    .item-rank {
      padding-left: 5px;
    }
  }
  .item:first-child {
    margin-left: 18px;
  }
  .item:last-child {
    margin-right: 18px;
  }
  
}
// 隐藏滚动条
.row::-webkit-scrollbar {
  display:none;
}
</style>