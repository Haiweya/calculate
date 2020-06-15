<template>
<!-- formOption 一个对象中有四个子对象 -->
    <el-form :model="numForm" status-icon  ref="numForm"  class="form" >
        <el-form-item >
          <input v-if="formOption.L"  v-model="numForm.canLength"   :placeholder="formOption.L.name" />
        </el-form-item>  
        <el-form-item >
          <input v-if="formOption.R"  v-model="numForm.canRadius"   :placeholder="formOption.R.name" />
        </el-form-item>  
        <el-form-item  >
          <input v-if="formOption.H"  v-model="numForm.solutionHeight"   :placeholder="formOption.H.name" />
        </el-form-item>  
        <el-form-item  >
          <input v-if="formOption.V"  v-model="numForm.solutionVolume"   :placeholder="formOption.V.name" />
        </el-form-item> 
        <el-form-item>
          <el-tooltip class="item" effect="dark" content="正确输入数据，点击此处进行计算" placement="bottom-start">
             <button  @click="handleClick" class="submit"><i class="el-icon-edit"></i></button>
          </el-tooltip>
          <span class="result" v-if=" !formOption.L && result ">{{formOption.L.value}}：<p>{{this.result}}</P>  ({{formOption.L.unit}})</span>
          <span class="result" v-if=" !formOption.H && result ">{{formOption.H.value}}：<p>{{this.result}}</P>  ({{formOption.H.unit}})</span>
          <span class="result" v-if=" !formOption.R && result ">{{formOption.R.value}}：<p>{{this.result}}</P>  ({{formOption.R.unit}})</span>
          <span class="result" v-if=" !formOption.V && result ">{{formOption.V.value}}：<p>{{this.result}}</P>  ({{formOption.V.unit}})</span>
          <button class="clear" @click="clearForm" v-if="needClear"> <i class="el-icon-refresh"></i>清空</button>
        </el-form-item>
      </el-form>
    
</template>
<script>
export default {
  props:{
    formOption:{
      type: [Object],
            // 这种写法正确，返回数组默认值
            default(){
              const arr ={
                L,
                R,
                H
              }
              return  arr
            }
    }  
  },
  data(){
    return{
      needClear:false,
      result,

    }
  }
    
}
</script>


<style  scoped>
form input{
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

</style>>

