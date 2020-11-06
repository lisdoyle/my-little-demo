<template>
  <div id="app">

    <div class="content">
      <Header></Header>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'



export default {
  data(){
    return {
    }
  },
  components:{
    Header,
  },
}
</script>

<style lang="scss" scoped>
.content{
  max-width: 650px;
  margin: 0 auto;
}
</style>
