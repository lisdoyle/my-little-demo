new Vue({
  el:"#shopping-cart",
  data:{
    productList:[
      {
        'pro_name': '【斯文】甘油 | 丙三醇',//产品名称
        'pro_brand': 'skc',//品牌名称
        'pro_place': '韩国',//产地
        'pro_purity': '99.7%',//规格
        'pro_min': "215千克",//最小起订量
        'pro_depot': '上海仓海仓储',//所在仓库
        'pro_num': 3,//数量
        'pro_img': './test.jpg',//图片链接
        'pro_price': 800//单价
      },
      {
        'pro_name': '【斯文】甘油 | 丙三醇',//产品名称
        'pro_brand': 'skc',//品牌名称
        'pro_place': '韩国',//产地
        'pro_purity': '99.7%',//规格
        'pro_min': "215千克",//最小起订量
        'pro_depot': '上海仓海仓储',//所在仓库
        'pro_num': 3,//数量
        'pro_img': './test.jpg',//图片链接
        'pro_price': 800//单价
      }

    ]
  },
  methods:{
    selectProduct:function(isSelectAll){
      for(var i=0; i<this.productList.length; i++){
        this.productList[i].select = !isSelectAll
      }
    }
  },
  computed:{
    // 是否全选
    isSelectAll(){
      var flag = this.productList.every(function(product){
        return product.select === true
      })
      if (flag){
        return true
      }else{
        return false
      }
    },
    // 总价
    getTotal(){
      // select为true的数据
      var _prolist=this.productList.filter(function(product){
        return product.select
      })
      //
      var totalPrice = 0 
      var totalNum = _prolist.length
      for(var i=0 ; i<totalNum; i++){
        var num = _prolist[i].pro_num
        var price = _prolist[i].pro_price
        totalPrice += num * price
      }
      return {
        totalNum:totalNum,
        totalPrice:totalPrice
      }
    }
  },
  mounted(){
    var $this = this
    this.productList.map(function(item){
      $this.$set(item, 'select', false)
    })
  },
})