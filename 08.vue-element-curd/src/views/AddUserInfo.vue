<template>
  <div class="AddUserInfo">
    this is AddUserInfo
    <el-dialog 
    title="添加用户信息" 
    :visible.sync="dialogAdd.show">
      <el-form
      :model="formDate" 
      ref="formAdd" 
      label-width="100px" 
      :rules="formrules">

        <el-form-item label="日期" prop="date">
          <el-date-picker
          v-model="formDate.date"
          type="date"
          placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formDate.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formDate.email"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="formDate.title"></el-input>
        </el-form-item>
        <el-form-item label="评价" prop="evaluate">
          <el-input v-model="formDate.evaluate"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input v-model="formDate.state"></el-input>
        </el-form-item>

      </el-form>
      <template v-slot:footer>
        <el-button @click="dialogAdd.show = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormAdd('formAdd')">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
      formDate:{ //表单数据的绑定
        date:'', 
        name:'',
        email:'',
        title:'',
        evaluate:'',
        state:''
      },
      formrules:{
        date:[{required:true,message:"日期不能为空",trigger:"blur"}],
        name:[{required:true,message:"用户名不能为空",trigger:"blur"}],
        email:[{required:true,message:"邮箱不能为空",trigger:"blur"}],
      }
    }
  },
  props:["dialogAdd"], //接收从父级中传递的数据
  methods:{
    // 点击“确定”检查验证规则，无误后提交表单数据到数据库
    dialogFormAdd(formAdd){
      // validate接收一个回调函数，检查表单，无问题返回true，有问题返回false，并返回obj错误的信息
      this.$refs[formAdd].validate((valid,obj)=>{
        if(valid){
          //触发store中的追加数据功能
          this.$store.commit('add',this.formDate); 
          this.dialogAdd.show = false;
          this.formDate  = {  //提交后清空
            date:'', 
            name:'',
            email:'',
            title:'',
            evaluate:'',
            state:''
          }
          console.log('添加信息成功');
        }else{
          console.log('error submit!!');
          return false;
        }
      })
    }
  },
  
}
</script>