<template>
  <el-container>
    <el-main class="register">
      <el-card class="box-card" shadow="hover">
        <div class="head">
          <div class="header">
            <img :src="logoImage" />
          </div>
        </div>
        <div class="mian">
          <wInput v-model="formInfo.loginName" type="text" maxlength="11" placeholder="登陆名"></wInput>
          <wInput v-model="formInfo.password" type="password" maxlength="11" placeholder="密码"></wInput>
          <wInput v-model="formInfo.department" type="text" maxlength="11" placeholder="所属部门"></wInput>
          <wInput v-model="formInfo.userName" type="text" maxlength="11" placeholder="姓名"></wInput>
        </div>
        <div @click="register" @keydown="EnterKey">
          <wButton text="注册" :rotate="isRotate" class="botton"></wButton>
        </div>
        <div class="footer">
          <router-link to="/login">登陆</router-link>
          <span>|</span>
          <router-link to="/forget">密码重置</router-link>
        </div>
      </el-card>
    </el-main>
    <dailog v-if="dailog.dialogVisible" :content="dailog.content"></dailog>
  </el-container>
</template>

<script>
var _this;  //全局
import wInput from "../components/watch-input"; //input
import wButton from "../components/watch-button"; //button
import dailog from '../components/dailog' //dialog
export default {
  data() {
    return {
      formInfo: {
          loginName:'',
          password:'',
          department:'',
          userName:''
      },
      logoImage: "https://i.loli.net/2020/05/27/W8jmO6yBlwZAga1.png",
      isRotate: false, //是否加载旋转
      dailog: {
        content: "",
        dialogVisible: false
      }
    };
  },
  components: {
    wInput,
    wButton,
    dailog
  },
  mounted() {
     _this = this;
  },
  methods: {
    register() {
    //   console.log('注册')
      _this.dailog.dialogVisible = false;
      _this.dailog.content = "";
      // console.log("登录操作")
      if (this.isRotate) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      //次验证方式只能触发一次，解决办法应该事在子组件中关闭弹框的时候实时修改dialogVisible的值
      if (this.formInfo.loginName.length == "") {
        _this.dailog.dialogVisible = true;
        _this.dailog.content = "用户名不能为空";
        return;
      }
      if (this.formInfo.password.length == "") {
        _this.dailog.dialogVisible = true;
        _this.dailog.content = "密码不能为空";
        return;
      }
      _this.isRotate = true;
      setTimeout(function() {
        _this.isRotate = false;
      }, 3000);
      if (this.formInfo) {
          console.log(this.formInfo)
        //注册操作
         this.$axios.post('/api/user/register',this.formInfo).then(res=>{
             console.log(res);
         })
      }
    },

    EnterKey(e) {
      console.log(e);
    }
  }
};
</script>
<style scoped>
.register {
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
  margin-top: 60px;
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
</style>