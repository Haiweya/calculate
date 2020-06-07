<template>
  <el-container class="container">
    <el-header>
      <router-link to="/" class="backToHome">
        <img :src="homeimg" alt />
      </router-link>
    </el-header>
    <el-main class="main">
     <el-tooltip class="item" effect="dark" content="在此选择计算方式" placement="bottom-start">
        <slected :stateList='stateList' class="divSelected"  @getItemValue='getState'></slected>
      </el-tooltip>
      <el-upload
        drag
        ref="upload"
        action="/api/uploadFile/upload"
        :on-success="uploaded"
        :data="stateSelected"
        :headers="token"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em style="color:#b97105db">点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip" style="font-size:14px;color:#726c64">只能上传excel文件</div>
      </el-upload>
    </el-main>
  </el-container>
</template>
<script>
import slected from '../components/slected' 
export default {
  // 只有axios触发的请求才会被拦截
  components: {
    slected
  },
  data() {
    return {
      token: {},
      homeimg: "https://i.loli.net/2020/05/28/RGNa7VAbydutSjQ.png",
      stateSelected: {},
       stateList: [
        { id: 1, name: "计算体积",value:'getSolutionVolume' },
        { id: 2, name: "计算罐体长度" ,value:'gatCanLength'}
      ],
      
    };
  },
  created() {
    this.token.Authorization = localStorage.eleToken;
    this.stateSelected = this.stateList[0];
  },
  methods: {
    // 上传成功后触发
    uploaded(event, file, fileList) {
      const fileid = event;
      // console.log(event); //返回的结果
      this.$router.push("/itemList?" + `tab=${fileid}`); //页面之间传值
    },

    //只有子组件点击之后才会触发
    getState(v){
        this.stateSelected = v;
        console.log(this.stateSelected)
    },
  },
 
};
</script>

<style  scoped>
.container {
  background: #11998e; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right top, #ccb182, #42bc93);
  background: linear-gradient(to right top, #ccbf82, #42bc93);
  height: 100vh;
  display: flex;
  justify-content: center;
}
.main {
  /* border:1px solid black; */
  display: flex;
  justify-content: center;
  align-items: center;
}
.backToHome {
  position: relative;
  width: 5%;
  top: 5%;
  left: 7.5%;
}
.backToHome img {
  width: 5.5%;
  /* margin: 10px 15%; */
  padding: 0 !important;
}
.backToHome img::after {
  content: "返回首页";
  position: absolute;
}

.divSelected {
  position: absolute;
  top: 20%;
  left: 9%;
  font-size: 17px;
  color: #757575;
}

</style>