<template>
  <el-container class="container">
    <el-header>
      <router-link to="/" class="backToHome">
        <img :src="homeimg" alt />
      </router-link>
    </el-header>
    <el-main class="main">
      <div class="divSelected">
        <div  @click="openValue" >
          
          <input v-model="stateSelected.name" type="text" disabled >
          <el-tooltip class="item" effect="dark" content="在此选择计算模式" placement="bottom-start">
          <i class="el-icon-arrow-down"></i>
          </el-tooltip>
        </div>
        <div class="statelist" v-show="show">
          <ul>
            <li @click="getItemValue(index,item)" :key="index" :value="item.id" v-for="(item,index) in stateList">{{ item.name }}</li>
          </ul>
        </div>
      </div>
    
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
export default {
  // 只有axios触发的请求才会被拦截
  components: {},
  data() {
    return {
      token: {},
      homeimg: "https://i.loli.net/2020/05/28/RGNa7VAbydutSjQ.png",
      stateSelected: {},
      // stateList: [
      //   { id: 1, name: "计算体积",value:'getSolutionVolume' },
      //   { id: 2, name: "计算罐体长度" ,value:'gatCanLength'},
      //   { id: 3, name: "计算罐体半径",value:'getCanRadius' },
      //   { id: 4, name: "计算液位高度" ,value:'getSolutionHeight'}
      // ],
       stateList: [
        { id: 1, name: "计算体积",value:'getSolutionVolume' },
        { id: 2, name: "计算罐体长度" ,value:'gatCanLength'}
      ],
      show: false
    };
  },
  created() {
    this.token.Authorization = localStorage.eleToken;
    // 选项
    this.stateSelected.id = this.stateList[0].id;
    this.stateSelected.name= this.stateList[0].name;
    this.stateSelected.value = this.stateList[0].value;
  },
  methods: {
    
    // 上传成功后触发
    uploaded(event, file, fileList) {
      const fileid = event;
      // console.log(event); //返回的结果
      this.$router.push("/itemList?" + `tab=${fileid}`); //页面之间传值
    },

    openValue() {
      this.show = !this.show;
    },
    getItemValue(index, item) {
      this.stateSelected.id = item.id;
      this.stateSelected.name = item.name;
      this.stateSelected.value = item.value;
      console.log(this.stateSelected);

      this.show = false;
    }
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
.divSelected input {
  padding: 10px;
  width: 10vw;
  border: none;
  background: none;
  outline: none;
  border-bottom: 1.5px solid #cbccc7;
  font-size: 15px;
  color: #757575;
}
.statelist {
  margin-top: 10px;
}
.divSelected ul {
  list-style: none;
  background: white;
  font-size: 14px;
}
.divSelected ul li {
  padding: 5px;
}
.divSelected ul li:hover {
  background: #cbccc7;
  color: white;
}
</style>