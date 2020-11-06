<template>
  <div class="rating">
    <div v-if="rating == 0">
      <span>暂无评分</span>
    </div>
    <div v-else>
      <span class="star full" v-for="{n, index} in full" :key="index"></span>
      <span class="star half" v-for="{n, index} in half" :key="index"></span>
      <span class="star gray" v-for="{n, index} in gray" :key="index"></span>
      <span class="value">{{rating}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:[
    'rating', //接受cloumnBox.vue 传入数据
  ],
  data(){
    return{
      full: 0, //金色星星数目
      half: 0, //半星数目
      gray: 0, //灰色星星数目
    }
  },
  methods:{
    // 满分为10分，满星为5颗，因此除以2后，比如8.5/2=4.25，那么：
    // 满星：parseInt(4.25)=4 取整
    // 半星：4.25-满星4=0.25 再 ceil(0.25)=1 向上取整
    // 灰星：5-4.25=0.75 再 floor(0.75)=0 向下取整
    getRating(){
      let value = this.rating
      let num = value / 2
      this.full = parseInt(num)
      this.half = Math.ceil(num-this.full)
      this.gray = Math.floor(5-num)
    }
  },
  mounted(){
    this.getRating()
  }
}
</script>

<style lang="scss" scoped>
.rating{
  margin: 5px 0;
  span{
    display: inline-block;
  }

  .star{
   width: 10px;
   height: 10px;
   margin-right:2px; 
  }
  .full{
    background: url("/full-star.svg") no-repeat scroll center center
  }
  .half{
    background: url("/half-star.svg") no-repeat scroll center center
  }
  .gray{
    background: url("/gray-star.svg") no-repeat scroll center center
  }
  .value{
    font-size: 14px;
    margin-left:5px; 
  }
}

</style>