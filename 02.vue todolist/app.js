var vm = new Vue({
  el: "#app",
  
  data: {
    addText: '',
    prolist: [
      //name-名称,status-完成状态
      { name: "HTML5", status: false, uid: 1 },
      { name: "HTML4", status: true, uid: 2 },
    ],
    newList: [],
    chooseType: 'allitem',
    undone:'',
    curindex:-1,
    editBefore:''
  },
  methods: {
    addList() {
      //添加进来默认status=false,就是未完成状态
      this.prolist.push({
        name: this.addText,
        status: false,
        uid: new Date().getTime()
      });

      //添加后，清空addText
      this.addText = "";
    },
    chooseList(type) {
      this.chooseType = type
    },
    refreshList() {
      switch (this.chooseType) {
        case 'allitem':
          this.newList = this.prolist;
          console.log('allitem');
          break;
        case 'done':
          this.newList = this.prolist.filter(
            function (item) {
              return item.status
            }
          );
          console.log('done');
          break;
        case 'undone':
          this.newList = this.prolist.filter(
            function (item) {
              return !item.status
            }
          );
          console.log('undone');
          break;
      }
    },
    deleteList(id) {
      console.log(id)
      //找出uid对应的index
      var index = this.prolist.findIndex(function (item) {
        return item.uid === id
      })
      //删除
      this.prolist.splice(index,1)

      this.refreshList()
    },
    changeStatus(id){
      //找出uid对应的index
      var index = this.prolist.findIndex(function (item) {
        return item.uid === id
      })
      //转换状态
      this.prolist[index].status = !this.prolist[index].status
    },
    countundone(){
      var count = 0
      this.prolist.forEach(function(item){
        if(item.status == false){
          count += 1
        }
      })
      this.undone = count
    },
    showEdit(index){
      this.curindex = index
    },
    
  },
  mounted() {
    //初始化，把prolist赋值给newList。默认显示所有目标
    this.refreshList()
    this.countundone()
    console.log('mounted')
  },
  updated(){
    this.$refs.text2.forEach(function(item){
      item.focus()
    })
  },
  watch: {

    prolist: function () {
      this.refreshList()
      this.countundone()
    },
    chooseType: function () {
      this.refreshList()
    }

  }
})

