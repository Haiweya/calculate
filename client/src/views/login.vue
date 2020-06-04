<template>
  <el-container>
    <el-main class="login">
      <el-card class="box-card" shadow="hover">
        <div class="head">
          <div class="header">
            <img :src="logoImage"  />
          </div>
        </div>
		<div class="mian">
		<wInput v-model="loginInfo.loginName" type="text" maxlength="11" placeholder="用户名" ></wInput>
		<wInput v-model="loginInfo.password" type="password" maxlength="11" placeholder="密码" ></wInput>
	    </div>
		<div @click="startLogin" @keydown="EnterKey" >
			<wButton text="登陆" :rotate="isRotate" class="botton"></wButton>
		</div>
        <div class="footer">
          <router-link to="/register">注册</router-link>
          <span>|</span>
          <router-link to="/forget">密码重置</router-link>
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
	import hellow from '../components/HelloWorld'
	import jwt_decode from 'jwt-decode'

	
	export default {
		data() {
			return {
				//logo图片 
				logoImage: 'https://i.loli.net/2020/05/27/W8jmO6yBlwZAga1.png',
				loginInfo:{
					loginName:'', //用户
					password:'', //密码
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
			dailog,
			hellow	
		},
	    // 生命钩子
		mounted() {
			_this= this;
			// this.isLogin();
		},
		methods: {
			isLogin(){
				try{
					const islogin = localStorage.eleToken? true: false;
					if(islogin){
						this.$message({
						message:"您已登陆,无需重复登陆",
						type:"success"
						})
						this.$router.push("/") //登录成功则跳转到主页界面
					}
				}catch(e){
					console.log(e);
				}
			},
			EnterKey(e){
				console.log(e.keyCode)
				if (e.keyCode == 13) {
              		this.startLogin();
            	}
			},
		    startLogin(){
				_this.dailog.dialogVisible = false;
			    _this.dailog.content = ""
				// console.log("登录操作")
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				//次验证方式只能触发一次，解决办法应该事在子组件中关闭弹框的时候实时修改dialogVisible的值
				if (this.loginInfo.loginName.length =="") {
					_this.dailog.dialogVisible = true;
					_this.dailog.content = "用户名不能为空"
				    return;
				}
					if (this.loginInfo.password.length =="") {
					_this.dailog.dialogVisible = true;
					_this.dailog.content = "密码不能为空"
				    return;
				}
                _this.isRotate=true
				setTimeout(function(){
					_this.isRotate=false
				},3000)
				if(this.loginInfo){
					  this.$axios.post('/api/user/login',_this.loginInfo).then(res=>{
						// 取到token值存储到本地，使用结构的方式
						const {token,user}=res.data;  
						localStorage.setItem("eleToken",token);
						const decoded =jwt_decode(token);
						console.log(decoded);
						// Token存储到vuex中,用dispatch 触发一个action
						this.$store.dispatch ("setAuthenticated",!this.isEmpty(decoded));
						// this.$store.dispatch ("setUser",decoded);  //里面只装着id
						this.$store.dispatch ("setUser",user);
						this.$message({
						message:"登录成功",
						type:"success"
						})
						this.$router.push("/") 
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
.login {
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
