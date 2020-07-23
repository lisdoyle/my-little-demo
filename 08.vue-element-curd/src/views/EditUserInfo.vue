<template>
  <div class="EditUserInfo">
    this is EditUserInfo
    <el-dialog 
    title="编辑用户信息" 
    :visible.sync="dialogEdit.show">
      <el-form
      :model="formDate" 
      ref="formEdit" 
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
        <el-button @click="dialogEdit.show = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormAdd('formEdit')">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
      formrules:{
        date:[{required:true,message:"日期不能为空",trigger:"blur"}],
        name:[{required:true,message:"用户名不能为空",trigger:"blur"}],
        email:[{required:true,message:"邮箱不能为空",trigger:"blur"}],
      }
    }
  },
  props:{
    dialogEdit:Object,
    formDate:Object
  },
  methods:{
    // 点击“确认按钮”
    dialogFormAdd(formEdit){
      // 先验证表单规则,valid=true 通过验证
      this.$refs[formEdit].validate((valid,obj)=>{
        if(valid){
          // // 把新数据传给store，store通过id号替换数据
          // this.$store.commit("edit",this.formDate)
          // this.dialogEdit.show = false;

          // 通过$axios 修改数据
          this.$axios({
            method:"patch",
            url:'http://localhost:3000/users/'+this.formDate.id,
            data:this.formDate
          })
          .then((res)=>{
            console.log(res)
            this.dialogEdit.show = false;
            this.$emit("getdata") //父组件传过来的事件，刷新store数据
          })
          .catch((err)=>{
            console.log(err)
          })
        }else{
          console.log('error submit!!');
          return false;
        }
      })
    }
  },
  
}
</script>