var vm = new Vue({
  el: "#app",
  data: {
    allNum: [],  //数字排列
    allNumText:[], //allNum的深复制，用于页面渲染
    arrText:[],  //坐标
    oldallNum:[], //挖空前数字排列
    curRow:0,   //当前格子所在的行的索引
    curCol:0,   //当前格子所在的列的索引
    show:false,  //控制显示键盘
    hoverCol:'', //鼠标当前hover的列
    hoverRow:'', //鼠标当前hover的行
    optionNow:{},
    optionNowInCol:{},
    optionNowInRow:{},
    isShake:false,

  },
  methods: {
    generateNum() {
      var allnum = []
      var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

      for (var i = 0; i < arr.length; i++) {
        //深复制arr 到 arr2
        var [...arr2] = arr
        // console.log(arr2)
        // 把arr2 push到 allnum
        allnum.push(arr2)
        // console.log(allnum)

        //把第一个号码移到最后
        var res = arr.splice(0, 1)
        arr.push(res[0]);
      }
      this.allNum = allnum
    },
    shuffleRow(){
      this.allNum.sort(function(row1,row2){
        // 50%几率为负数或正数
        return Math.random() - 0.5 
      })
    },
    shuffleCol(){
      var newAllNum = []

      // 把列坐标索引 0~8 打乱
      var arr = [0,1, 2, 3, 4, 5, 6, 7, 8]
      arr.sort(function(n1,n2){
        return Math.random() - 0.5 
      })

      // 此时 arr 打乱了 = [1, 7, 3, 4, 5, 2, 6, 8,0]
      // 按arr的坐标顺序排allNum每一行里的每一个元素
      for(var i=0; i<this.allNum.length; i++){ //循环9行
        
        var newRow = []

        //把每一行里的元素，按[1, 7, 3, 4, 5, 2, 6, 8,0]索引排序
        for(var j=0; j<arr.length; j++){
          var arrindex = arr[j]
          newRow[j] = this.allNum[i][arrindex] 
        }
        // 把排好的新一行 放入新的容器
        newAllNum[i] = newRow
      }

      // 把旧的替换成新的
      this.allNum = newAllNum
    },
    // 深复制allNum到allNumText
    copyAllNumText(){
      this.allNumText = JSON.parse(JSON.stringify(this.allNum))
    },

    //记录所有坐标
    coordinate(){
      let arrText = [] //所有坐标
      for (let i=0; i<9; i++){
        let rowText = [] //每一行坐标
        for(let j=0; j<9; j++){
          rowText.push( i+'-'+j)
        }
        arrText.push(rowText)
      }
      console.log(arrText)
      this.arrText = arrText
    },
    //随机掏空
    dig(){
      let _allNum = []
      for(let i=0; i<9; i++){
        let [...row] = this.allNum[i] //抽取每一行深复制
        for(let j=0; j<2; j++){
          let randomNum = Math.floor(Math.random() * 9)
          row[randomNum]=''
        }
        _allNum.push(row)
      }
      this.oldallNum = this.allNum
      this.allNum = _allNum
    },
    // 显示数字键盘 传入坐标
    showCheck(row,col){
      console.log(row+'-----'+col)
      //点击的格子是否是被掏空的格子
      if(this.allNum[row][col] !== ''){
        this.show = false;
        this.curRow = '';
        this.curCol = '';
        return
      }
      // 再点击同一各自隐藏键盘
      if(row===this.curRow && col===this.curCol){
        this.show = false;
        this.curRow = '';
        this.curCol = '';
      }else{
        // 显示数字键盘，curRow和curCol分别设置成当前的点
        this.show = true;
        this.curRow = row;
        this.curCol = col;
      }

    },
    //输入键盘数字 检查是否正确
    inputText(_text){
      //--------检查前--------
      let _curRow = this.curRow, _curCol = this.curCol
      this.optionNow={}
      this.optionNowInRow={}
      this.optionNowInCol={}

      // 填入数字，关闭键盘
      this.allNumText[_curRow][_curCol] = _text
      this.show=false
      this.curRow = '';
      this.curCol = '';

      // 1.检查是否正确
      if(_text===this.oldallNum[_curRow][_curCol]){
        // 1.2.1 若正确，检查是否完成
        if(JSON.stringify(this.allNumText)==JSON.stringify(this.oldallNum)){
          // 1.2.1.1 已完成打印finish，否则无反应
          alert('finish!')
        }
      }else{
        // 1.2.2 若不正确，找出重复项，并显示样式
        // -----给填入得数字添加err样式
        this.optionNow.x = _curRow
        this.optionNow.y = _curCol
        
        // -----检查 行 重复项
        this.optionNowInRow.x = _curRow
        this.optionNowInRow.y = this.allNum[_curRow].findIndex(function(num){
          return num==_text
        })

        // -----检查 列 重复项
        this.optionNowInCol.y = _curCol

        for(let i=0; i<9; i++){
          if(this.allNum[i][_curCol]===_text){
            this.optionNowInCol.x=i
          }
        }
        
        //-------shake
        var $this = this
        this.isShake=true
        setTimeout(function () {
          $this.isShake = false 
        },1000)

      }
    }
  },
  mounted(){
    this.generateNum() //生成数字
    this.shuffleRow() //打乱行
    this.shuffleCol() //打乱列
    this.coordinate() //记录坐标
    this.dig()        //挖空
    this.copyAllNumText() //深复制一份，用于渲染展示
  }
})



