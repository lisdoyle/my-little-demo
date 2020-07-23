<template>
  <div class="UserInfo">
    <h1>用户信息管理界面</h1>
    <el-row>
      <el-col :span="20" :push="2">

        <el-form :inline='true'>
          <!-- 查询框 -->
          <el-form-item style="float: left" label="查询用户信息:">
            <el-input v-model="keyUser" placeholder="查询所需要的内容......"></el-input>
          </el-form-item>
          <!-- 添加按钮 -->
          <el-form-item style="float: right">
            <el-button type="primary" size="small" icon="el-icon-edit-outline" @click="handleAdd">添加</el-button>
          </el-form-item>
        </el-form>

        <!-- 表格 -->
        <el-table :data="tableData | userFilter(this.keyUser)" border style="width: 100%">
          <el-table-column  
            label="序号" 
            width="60"
            align="center"
            type="index">
          </el-table-column>
          <el-table-column  
            label="日期" 
            width="120"
            align="center">
            <template v-slot="scope">
              <span>{{ scope.row.date }}</span>
            </template>
          </el-table-column>
          <el-table-column  
            label="姓名" 
            width="100"
            align="center">
            <template v-slot="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column  
            label="邮箱" 
            width="160"
            align="center">
            <template v-slot="scope">
              <span>{{ scope.row.email }}</span>
            </template>
          </el-table-column>
          <el-table-column  
            label="标题" 
            width="160"
            align="center">
            <template v-slot="scope">
              <span>{{ scope.row.title }}</span>
            </template>
          </el-table-column>
          <el-table-column  
            label="评价" 
            width="200"
            align="center">
            <template v-slot="scope">
              <span>{{ scope.row.evaluate }}</span>
            </template>
          </el-table-column>
          <el-table-column  
            label="状态" 
            width="160"
            align="center">
            <template v-slot="scope">
              <span>{{ scope.row.state }}</span>
            </template>
          </el-table-column>
          <el-table-column  
            label="操作" 
            width="160"
            align="center">
            <template v-slot="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>

        </el-table>

      </el-col>
    </el-row>

    <AddUserInfo :dialogAdd="dialogAdd" @getdata='getData'></AddUserInfo>
    <EditUserInfo :dialogEdit="dialogEdit" :formDate="formDate" @getdata='getData'></EditUserInfo>
  </div>
</template>

<script>
// 引入临时数据库
import DB from '../db.js'
import AddUserInfo from './AddUserInfo.vue'
import EditUserInfo from './EditUserInfo.vue'

export default {
  data(){
    return{
      keyUser:'',  //查询用户信息
      dialogAdd:{   //控制添加弹出表单
        show:false
      },
      dialogEdit:{   //控制编辑弹出表单
        show:false
      },
      formDate:{ //编辑时的数据
        date:'', 
        name:'',
        email:'',
        title:'',
        evaluate:'',
        state:'',
        id:''
      },
    }
  },
  computed:{
    tableData(){
      return this.$store.state.db //数据库
    }
  },
  components:{
    AddUserInfo,
    EditUserInfo
  },
  methods:{
    //点击“添加按钮”，弹出表单
    handleAdd(){
      console.log("成功弹出dialog")
      this.dialogAdd.show = true
    },
    // 点击“删除按钮”
    handleDelete(index, row){
      // this.$store.commit("delete",row.id) //触发store中的删除功能

      this.$axios({
        method:'delete',
        url:'http://localhost:3000/users/'+row.id,
      })
      .then((res)=>{
        console.log(res)
        this.getData() //获取数据，刷新页面
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    // 点击“编辑按钮”
    handleEdit(idnex, row){
      this.dialogEdit.show = true
      this.formDate = { //获取数据，传递给子组件
        date:row.date,
        name:row.name,
        email:row.email,
        title:row.title,
        evaluate:row.evaluate,
        state:row.state,
        id:row.id
      }
    },
    // 获取数据库数据,把数据更新到store
    getData(){
      this.$axios({
        method:"get",
        url:'http://localhost:3000/users'
      })
      .then((response) =>{          //这里使用了ES6的语法
        console.log(response.data)       //请求成功返回的数据
        this.$store.commit('getdata',response.data)
      })
      .catch((error) =>{
        console.log(error)
      })
    },
  },
  filters:{
    userFilter(db,keyUser){
      return db.filter((user)=>{
        if(user.name.includes(keyUser)){
          return user
        }
      })
    }
  },
  mounted(){
    this.getData()
  },
  
}
</script>