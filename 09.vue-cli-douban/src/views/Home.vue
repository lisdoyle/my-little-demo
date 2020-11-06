<template>
  <div class="home">
    this is home
    <ul class="subNav">
      <li class="subNavItem">
        <router-link to>影院热映</router-link>
      </li>
      <li class="subNavItem">
        <router-link to>近期值得看的美剧</router-link>
      </li>
      <li class="subNavItem">
        <router-link to>豆瓣时间</router-link>
      </li>
      <li class="subNavItem">
        <router-link to>使用豆瓣App</router-link>
      </li>
    </ul>

    <!-- 取出文章列表每篇文章传入RecommendList组件 -->
    <a v-for="item in recommendData" 
      :key="item.id"
      href=""
      class="recommend"
    >
      <RecommendList :item="item"></RecommendList>
    </a>

    <!-- footer组件 -->
    <Footer></Footer>
  </div>
</template>

<script>
import RecommendList from "@/components/RecommendList.vue"; //引入推荐组件
import Footer from '@/components/Footer.vue' //引入footer
import data from '@/data.js' //引入数据库

export default {
  data () {
    return {
      recommendData: data.recommendData
    }
  },
  components: {
    RecommendList,
    Footer,
  }
};
</script>

<style lang="scss" scoped>
.subNav {
  padding: 20px 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  .subNavItem {
    width: 50%;
    padding: 5px;
    box-sizing: border-box;
    text-align: center;
    a {
      display: block;
      padding: 10px;
      color: #494949;
      background: #f6f6f6;
      //不换行不溢出
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.recommend{
  display: block;
  overflow: hidden;
}
</style>