<template>
  <div class="recommendList">
    <!-- 如有图片显示图片 -->
    <div v-if="hasImg">
      <div class="rightImg">
        <img :src="imgUrl" />
      </div>
      <div class="leftContent">
        <h3 class="title">{{listItem.title}}</h3>
        <p class="desc">{{listItem.target.desc}}</p>
      </div>
    </div>

    <!-- 没有图片，内容占100% -->
    <div v-else>
      <div class="leftContent" style="width:100%;">
        <h3 class="title">{{listItem.title}}</h3>
        <p class="desc">{{listItem.target.desc}}</p>
      </div>
    </div>

    <!-- 作者名字 -->
    <div class="author">
      <span>by {{listItem.target.author.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:[
    'item', //接受来自home传来的文章项目
  ],
  data(){
    return {
      hasImg:'false' ,//是否有图片
      imgUrl:'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2618403186.jpg', //图片链接
      listItem: this.item //推荐文章列表
    }
  },
  methods:{
   
  },
  mounted(){

  }
}
</script>

<style lang="scss" scoped>
.rightImg{
  float: right;
  width: 26%;
  margin-left: 20px;
  img {
    width: 100%;
    max-width: 65px;
    text-align: right;
  }
}
.leftContent{
  h3 {
    text-align: justify;
    font-size: 17px;
    font-weight: 500;
    line-height: 1.41;
    color: #494949;
    margin-bottom: 6px;
  }
  p {
    text-align: justify;
    color: #aaa;
    font-size: 12px;
    line-height: 1.5;
    //限定文本为3行，多出省略
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 3; //块元素显示的文本的行数
  }
}
.author{
  color: #ccc;
  padding-top: 10px;
}
</style>