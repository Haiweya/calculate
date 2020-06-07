<template>
  <el-container>
    <el-main class="modifyPass">
      <el-card class="box-card" shadow="hover">
        <div class="head">
          <div class="header">
            <img :src="Image"  />
          </div>
        </div>
		<div class="mian">
		<wInput v-model="userInfo.loginName" type="text" maxlength="11" placeholder="用户名" ></wInput>
		<wInput v-model="userInfo.password" type="password" maxlength="11" placeholder="原密码" ></wInput>
        <wInput v-model="userInfo.newPassword" type="password" maxlength="11" placeholder="新密码" ></wInput>
	    </div>
		<div @click="modifyPass"  >
			<wButton text="重置" :rotate="isRotate" class="botton"></wButton>
		</div>
        <div class="footer">
          <router-link to="/register">注册</router-link>
          <span>|</span>
          <router-link to="/login">登陆</router-link>
        </div>
      </el-card>
    </el-main>
    <dailog v-if="dailog.dialogVisible" :content="dailog.content"></dailog>
  </el-container>
</template>

<script>
	var _this;
	import wInput from '../components/watch-input' //input
	import wButton from '../components/watch-button' //button
	import dailog from '../components/dailog' //dialog
	import jwt_decode from 'jwt-decode'

	
	export default {
		data() {
			return {
				//logo图片 
				Image: 'https://i.loli.net/2020/05/27/W8jmO6yBlwZAga1.png',
				userInfo:{
					loginName:'', //用户
                    password:'', //密码
                    newPassword:'' //新密码
				},
				isRotate: false, //是否加载旋转
				dailog:{
					content:'',
					dialogVisible:false,
				},
		}
		},
	    // 组件局部注册
		components:{
			wInput,
			wButton,
			dailog
		},
	    // 生命钩子
		mounted() {
			_this= this;
		},
		methods: {
		    modifyPass(){
				_this.dailog.dialogVisible = false;
			    _this.dailog.content = ""
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				//次验证方式只能触发一次，解决办法应该事在子组件中关闭弹框的时候实时修改dialogVisible的值
				if (this.userInfo.loginName.length =="") {
					_this.dailog.dialogVisible = true;
					_this.dailog.content = "用户名不能为空"
				    return;
				}
                if (this.userInfo.password.length =="") {
                _this.dailog.dialogVisible = true;
                _this.dailog.content = "原密码不能为空"
                return;
                }
                if (this.userInfo.newPassword.length =="") {
                _this.dailog.dialogVisible = true;
                _this.dailog.content = "新密码不能为空"
                return;
				}
                _this.isRotate=true
				setTimeout(function(){
					_this.isRotate=false
				},3000)
				if(this.userInfo){
					  this.$axios.post('/api/user/updatePassword',_this.userInfo).then(res=>{
                        if(res.status==200){
                            this.$message({
                            message:"密码修改成功",
                            type:"success"
                            })
                            this.$router.push("/login") 
                        }
                      })
                }    
		},
		isEmpty(value){
              return(
                value === undefined||
                value === null||
                (typeof value === "Object" && Object.keys(value).length===0)||
                (typeof value === "String" && value.trim().length)
              );
            }
	}
}
</script>
<style>
.modifyPass {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box-card {
  width: 400px;
  height: 90vh;
  border: none;
  display: flex;
  justify-content: center;
  align-content: center;
}

/* 头部 logo */
.head {
  margin-bottom: 20px;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header {
  width: 90px;
  height: 90px;
  box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  /* background-color: #000000; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.header img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.botton {
  margin-top: 50px;
}

/* 主体 */
.main {
  display: flex;
  flex-direction: column;
  padding-left: 70px;
  padding-right: 70px;
}

/* 底部 */
.footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin-top: 64px;
  color: rgba(0, 0, 0, 0.7);
  text-align: center;
  height: 40px;
  line-height: 40px;
  text-decoration: none;
}
a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.7);
}
.footer span {
  font-size: 16px;
  margin-left: 15px;
  margin-right: 15px;
}
@import url("../components/css/icon.css");
</style>




