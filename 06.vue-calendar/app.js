var vm = new Vue({
  el:'#app',
  data:{
    currentDay:1, //当前页面日期的 日
    currentMonth:1, //当前页面的 月份
    currentYear:1970, //当前页面的 年
    currentWeek:1, //当前页面的 日期星期几
    firstWeek:1, //当前页面的 1号时是星期几
    days:[], //当前页面的所有日期
    year:2020, //输入面板输入的 年
    month:1, //输入面板输入的 月
    day:1, //输入面板输入的 日
    flag:false, //是否显示输入面板
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
      

      // 1.2 获取这个月 的 年、月、日、星期
      this.currentYear = date.getFullYear() //四位数年份
      this.currentMonth = date.getMonth()+ 1 //月份 (0 ~ 11)
      this.currentDay = date.getDate() //返回 (1 ~ 31日)
      this.currentWeek = date.getDay() //星期(0 ~ 6 ，周日为0)
      this.firstWeek = date.getDay(date.setDate(1)) //1日时周几
      var str = this.fromatDate(this.currentYear,this.currentMonth,this.currentDay)
      //修正星期天为0的问题
      if(this.currentWeek == 0){
        this.currentWeek = 7
      }
      if(this.firstWeek == 0){
        this.firstWeek = 7
      }
      //清空日期数组
      this.days.length = 0
      
      
      // 1.3 先确定当月1日在第一行位置,然后把1日前面的数字补完。
      for(var i = 0 ; i<this.firstWeek; i++){
        var d = new Date(str)
        d.setDate( 1 - i )
        console.log('上个月日期：'+d.getDate())
        this.days.unshift(d)
      }

      // 1.4 把1日后面的日期补完，一共是35格，假如5月1日是周三，说明35格-周3 = 32格 是属于本月和下月的日期
      for(var i=0; i<35-this.firstWeek; i++){
        var d = new Date(str)
        d.setDate(2+i) //1日上一步已经有了，从2日开始
        console.log('本月下月日期：'+d.getDate())
        this.days.push(d)
      }
    },

    // 2.选择年份月份
    pick(year,month,day){
      var str = this.fromatDate(year,month,day)
      console.log(str)
      this.initData(str)
    },

    // 3.选择上个月
    pickPre(){
      // 获取当前日期
      var str = this.fromatDate(this.currentYear,this.currentMonth,this.currentDay)
      var d = new Date(str)
      // 设置成上月最后一天
      d.setDate(0)
      // 通过初始化上个月最后一天，来渲染整个上个月日期
      this.initData(d)
    },
    // 3.选择下个月
    pickNext(){
      // 获取当前日期
      var str = this.fromatDate(this.currentYear,this.currentMonth,this.currentDay)
      var d = new Date(str)
      // 设置成下月某天，一个月最多才31天，只要大于31就可以
      d.setDate(32)
      // 通过初始化下月第一天，来渲染整个上个月日期
      this.initData(d)
    },

    // 返回 类似 2020/01/02 格式的字符串
    fromatDate(year,month,day){
      var y = year;
      var m = month;
      if (m < 10) m = "0" + m;
      var d = day;
      if (d < 10) d = "0" + d;
      return y + "/" + m + "/" + d
    }
  },
  created(){
    this.initData()
  }
})

