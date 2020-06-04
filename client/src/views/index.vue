<template>
  <div class="container">
    <!-- <img :src="img" alt="" class="avatar"> -->
    <div class="leftside">
      <div class="leftsideCenter">
        <router-link to="/uploadFile" class="tofile">批量计算  <i class="el-icon-right"></i></router-link>
      </div>
    </div>
    <div class="rightside">
      <!-- <select name="public-choice" v-model="stateSelected" @change="getStateSelected" class="stateSelected">                                        
          <option :key="item.id" :value="item.id" v-for="item in stateList" class="stateOption">{{item.name}}</option>                                    
      </select> -->
      <div class="divSelected">
        <div  @click="openValue" >
          <input v-model="stateSelected.name" type="text" disabled >
          <i class="el-icon-arrow-down"></i>
        </div>
        <div class="statelist" v-show="show">
          <ul>
            <li @click="getItemValue(index,item)" :key="index" :value="item.id" v-for="(item,index) in stateList">{{ item.name }}</li>
          </ul>
        </div>
      </div>
      <el-form :model="numForm" status-icon  ref="numForm" v-if="stateSelected.id == 1" class="form" >
        <el-form-item  prop="canLength">
          <input  v-model="numForm.canLength"  placeholder="罐体长度"/>
        </el-form-item>  
        <el-form-item  prop="canRadius">
          <input  v-model="numForm.canRadius"  placeholder="罐体半径"/>
        </el-form-item>  
        <el-form-item  prop="solutionHeight">
          <input  v-model="numForm.solutionHeight" placeholder="液位高度"/>
        </el-form-item>  
        <el-form-item>
          <el-tooltip class="item" effect="dark" content="正确输入数据，点击此处进行计算" placement="bottom-start">
             <button  @click="onSubmit" class="submit"><i class="el-icon-edit"></i></button>
          </el-tooltip>
          <span class="result" v-if="result">溶液体积：<p>{{this.result}}</P>  (m³)</span>
          <button class="clear" @click="clearForm" v-if="needClear"> <i class="el-icon-refresh"></i>清空</button>
        </el-form-item>
      </el-form>
      <el-form :model="numForm" status-icon  ref="numForm" v-if="stateSelected.id == 2"   class="form">
        <el-form-item  prop="solutionVolume">
          <input  v-model="numForm.solutionVolume"  placeholder="液体体积"/>
        </el-form-item>  
        <el-form-item  prop="canRadius">
          <input  v-model="numForm.canRadius"  placeholder="罐体半径"/>
        </el-form-item>  
        <el-form-item  prop="solutionHeight">
          <input  v-model="numForm.solutionHeight" placeholder="液位高度"/>
        </el-form-item>  
        <el-form-item>
          <el-tooltip class="item" effect="dark" content="正确输入数据，点击此处进行计算" placement="bottom-start">
             <button  @click="onSubmit" class="submit"><i class="el-icon-edit"></i></button>
          </el-tooltip>
          <span class="result" v-if="result">罐体长度：<p>{{this.result}}</P>  (m)</span>
          <button class="clear" @click="clearForm" v-if="needClear"> <i class="el-icon-refresh"></i>清空</button>
        </el-form-item>
      </el-form>
      <el-form :model="numForm" status-icon  ref="numForm" v-if="stateSelected.id == 3"  class="form" >
        <el-form-item  prop="solutionVolume">
          <input  v-model="numForm.solutionVolume"  placeholder="液体体积"/>
        </el-form-item>  
        <el-form-item  prop="canLength">
          <input  v-model="numForm.canLength"  placeholder="罐体长度"/>
        </el-form-item>  
        <el-form-item  prop="solutionHeight">
          <input  v-model="numForm.solutionHeight" placeholder="液位高度"/>
        </el-form-item>  
        <el-form-item>
          <el-tooltip class="item" effect="dark" content="正确输入数据，点击此处进行计算" placement="bottom-start">
             <button  @click="onSubmit" class="submit"><i class="el-icon-edit"></i></button>
          </el-tooltip>
          <span class="result" v-if="result">罐体半径：<p>{{this.result}}</P>  (m)</span>
          <button class="clear" @click="clearForm" v-if="needClear"> <i class="el-icon-refresh"></i>清空</button>
        </el-form-item>
      </el-form>
      <el-form :model="numForm" status-icon  ref="numForm" v-if="stateSelected.id == 4"  class="form" >
        <el-form-item  prop="solutionVolume">
          <input  v-model="numForm.solutionVolume"  placeholder="液体体积"/>
        </el-form-item>  
        <el-form-item  prop="canLength">
          <input  v-model="numForm.canLength"  placeholder="罐体半径"/>
        </el-form-item>  
        <el-form-item  prop="canLength">
          <input  v-model="numForm.canLength" placeholder="罐体长度"/>
        </el-form-item>  
        <el-form-item>
          <el-tooltip class="item" effect="dark" content="正确输入数据，点击此处进行计算" placement="bottom-start">
             <button  @click="onSubmit" class="submit"><i class="el-icon-edit"></i></button>
          </el-tooltip>
          <span class="result" v-if="result">液位高度：<p>{{this.result}}</P>  (m)</span>
          <button class="clear" @click="clearForm" v-if="needClear"> <i class="el-icon-refresh"></i>清空</button>
        </el-form-item>
      </el-form>
    </div>
  </div>
 
</template>
<script>
import jwt_decode from 'jwt-decode'
export default {
  components:{},
  data(){
    return{
       img :'https://i.loli.net/2020/05/27/TKZ8PQjsgrDAL6Y.gif',
       numForm:{},
       result:'',
       needClear:false,
       stateSelected:{},
      //  stateList:[
      //    {id:1,name:"算体积"},
      //    {id:2,name:"算罐体长度"},
      //    {id:3,name:"算罐体半径"},
      //    {id:4,name:"算液位高度"}
      //    ],
          stateList:[
         {id:1,name:"算体积"},
         {id:2,name:"算罐体长度"}
         ],
        show:false
    }
  },
  methods:{
    // 计算
    onSubmit(e){
      e.preventDefault();
      var cal = this.getCal(this.numForm)
        this.result =  cal;
        this.needClear = true;
    },
    // 选择相关
    openValue(){
       this.show=!this.show;
    },
    getItemValue(index,item){
      this.stateSelected.id = item.id;
      this.stateSelected.name = item.name;
      this.show = false;
      this.clearForm();  //清除表单
    },
    // 计算函数
    getCal(numForm) {   
      if(this.stateSelected.id==1){
          var L = numForm.canLength;
          var R = numForm.canRadius;
          var H = numForm.solutionHeight;
          var V = L * ((H - R) * Math.sqrt(Math.pow(R, 2) - Math.pow((H - R), 2)) + Math.pow(R, 2) * Math.asin((H - R) / R) + Math.PI * Math.pow(R, 2) / 2);
          return V.toFixed(4);
          // if(H <= R){
          //   var V = L * (Math.pow(R, 2) * Math.acos((R - H) / H) - (R - H) * Math.sqrt(Math.pow(R, 2) - Math.pow((R - H), 2)))
          //   // var result = L * ((H - R) * Math.sqrt(Math.pow(R, 2) - Math.pow((H - R), 2)) + Math.pow(R, 2) * Math.asin((H - R) / R) + 3.14 * Math.pow(R, 2) / 2);
          //   return V.toFixed(4);  //H<0.8278
          // }else{
          //   console.log("液位高度比半径大")
          //   var V = L*(Math.PI*Math.pow(R,2) - Math.pow(R,2)*Math.acos((H-R)/R) + (H-R)*Math.sqrt(Math.pow(R,2)-Math.pow((H-R),2)))
          //   return V.toFixed(4)
          // }    
      }else if (this.stateSelected.id==2){
          var R = numForm.canRadius;
          var H = numForm.solutionHeight;
          var V = numForm.solutionVolume;
          var L = V/((H - R)*Math.sqrt(Math.pow(R, 2)-Math.pow((H - R), 2))+Math.pow(R, 2)*Math.asin((H - R)/R) + Math.PI*Math.pow(R, 2)/2);
          return L.toFixed(4);
      }else if (this.stateSelected.id==3){
           return 3
      }else if (this.stateSelected.id==4){
           return 4
      }
      return null;
    },

    clearForm(){
      
      this.numForm ={},
      this.result ='';
      this.needClear = false;
    }

  },
  created(){
    const token = localStorage.eleToken;
    const decoded =jwt_decode(token);
    this.$axios.post('/api/user/getUser',decoded).then(res=>{
      console.log(res);
    })
    this.stateSelected.id = this.stateList[0].id;
    this.stateSelected.name= this.stateList[0].name;

  }
  
   
};
</script>

<style  scoped>
.container{
  height:100vh;
  width:100vw;
  display: flex;
}
.leftside{
  width:23%;
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
}
.rightside{
  position: relative;
  width:77%;
  height:100%;
  background: #11998e;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right top, #ccb182,#42bc93);  
  background: linear-gradient(to right top, #ccbf82,#42bc93);
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.leftside .leftsideCenter{
  width:100%;
  height:60%;
  background: #f7f6f2;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar{
   position: fixed;;
   height:7.58vh;
   width:4.6vw ;
   right:10%;
   top:5%
}
.tofile{
  text-decoration: none;
  padding: 10px 30px;
  font-size: 19px;
  color:#42bc93;
  /* border: 1px solid #42bc93; */
  background: none;
  border-radius: 5px;
  transition: linear all 0.3s;
  box-shadow: 0px 5px 20px #c9c48c ;
}
.tofile:hover{
  border:none;
  color:white;
  background: linear-gradient(to right top, #84c28f,#42bc93);
}
.form input{
  height:45px;
  width:400px;
  border: none;
  outline: none;
  background: none;
  color:#f7f6f2;
  border-bottom: 1.5px solid #cbccc7; 
  font-size: 17px;
  text-align: left;
  padding-left: 30px;
}

.submit{
  font-size: 25px;
  border:none;
  outline: none;
  background: none;
  color:#00634f;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 5px
}
.result{
    margin: 0 25px ;
    font-size: 15px;
    color:#f0f1f0;
}
.result p {
  display: inline-block;
  font-weight:bold;
  font-size: 20px;
  color:#b97105db;
}
.clear{
  border:none;
  outline: none;
  background: none;
  margin-right:0;
  color: #c9c48c;
  cursor: pointer;
  font-size: 14px;
}

.divSelected{
  position: absolute;
  top: 5%;
  left:6%;
  font-size: 17px;
  color:#757575;
 
}
.divSelected input{
  padding:10px;
  width:10vw;
  border: none;
  background: none;
  outline: none;
  border-bottom: 1.5px solid #cbccc7; 
  font-size: 15px;
  color:#757575;
}
.statelist{
  margin-top: 10px;
}
.divSelected ul{
  list-style: none;
  /* border: 1px solid blue; */
  background: white;
  font-size: 14px;
}
.divSelected ul li{
  padding: 5px;
}
.divSelected ul li:hover{
   background:#cbccc7 ;
   color: white;
}

</style>