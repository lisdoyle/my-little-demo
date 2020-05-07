var vm = new Vue({
  el:'#app',
  data:{
    currentDay:1,
    currentMonth:1,
    currentYear:1970,
    currentWeek:1,
    days:[],
  },
  methods:{
    // 1.初始化日期数据
    initData(cur){
      // 1.1 创建一个date 用来储存Date 对象对象
      var date;
      if(cur){
        date = new Date(cur)
      }else{
        date = new Date()
      }
      // 1.2 获取今天 的 年、月、日、星期
      this.currentYear = date.getFullYear() //四位数年份
      this.currentMonth = date.getMonth()+ 1 //月份 (0 ~ 11)
      this.currentDay = date.getDate() //返回 (1 ~ 31日)
      this.currentWeek = date.getDay() //星期(0 ~ 6 ，周日为0)
      //修正星期天为0的问题
      if(this.currentWeek == 0){
        this.currentWeek = 7
      }
      //清空日期数组
      this.days.length = 0
      
    },
  }
})