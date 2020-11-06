<template>
  <div class="movie">
    <div class="cover">
      <ColumnBox title="影院热映" 
        type="movieImg" 
        :items="hotMoviesData"
      ></ColumnBox>
      <column-box title="免费在线观影" 
        type="movieImg" 
        :items="freeMoviesData"
      ></column-box>
      <!-- <column-box title="新片速递" type="movieImg" :items="newMoivesData"></column-box>
      <column-box title="发现好电影" type="movieBorder" :items="goodMoviesData"></column-box>
      <column-box title="分类浏览" type="movieText" :items="moviesTypes"></column-box> -->
    </div>

    <input type="text" v-model="keyword"/> {{keyword}}
    <button @click="search">search</button>

  </div>
</template>

<script>
import ColumnBox from '@/components/ColumnBox.vue'
import data from '@/data.js' //引入数据库
import {
  apiSearch
} from '@/api.js' //引入封装的api

export default {
  data(){
    return{
      hotMoviesData:[],
      freeMoviesData:[],
      keyword:"",
    }
  },
  methods:{
    getHotMoviesData(){
      this.hotMoviesData = data.hotMoviesData 
    },
    getFreeMoviesData(){
      this.freeMoviesData = data.freeMoviesData
    },
 
    search(){
      console.log('search')
      apiSearch('肖申克的救赎',0)
      .then((response)=>{
        console.log(response)
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  },
  mounted(){
    this.getHotMoviesData()
    this.getFreeMoviesData()
  },
  components:{
    ColumnBox,
  }
}
</script>