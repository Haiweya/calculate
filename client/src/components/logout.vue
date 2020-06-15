<template>
<div>
    <div  @click="openValue" >
         <el-avatar :src='img'></el-avatar>
        </div>
        <div class="logout" v-show="show">
          <ul>
            <li><span>HELLO🤔:  </span> {{user.userName}}</li>
            <li><span>所属部门:  </span>{{user.department}}</li>
            <li @click="logout" style=" cursor: pointer;"><span>退出登陆</span></li>
          </ul>
    </div>
</div>
    
</template>
<script>
var _this 
export default {
    props:{
        user:{
            type: [Object],
        }
    },
    data(){
        return{
         show:false,
         img:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        }
    },
    mounted() {
			_this= this;
			// this.isLogin();
	},
    methods:{
    openValue(){
       this.show=!this.show;
    },
    logout(){
        this.$confirm('确定退出系统吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          localStorage.clear();//清除本地缓存
          this.$router.push("/login") 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });

           
       
      }
        
    }
    
}
</script>
<style scoped>
.logout{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
}
.logout ul{
  list-style: none;
  /* border: 1px solid blue; */
  /* background: white; */
  font-size: 14px;
  color:grey;
  border: 1px solid honeydew ;
  /* border-radius: 10px; */
  
}
.logout ul li{
  padding: 5px;
  border-bottom: 1px solid grey;
  background: honeydew;
 
}
.logout ul li span{
    font-weight: bold;
    }



</style>