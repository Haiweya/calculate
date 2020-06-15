<template>
    <div>
        <div  @click="openValue" >
          <el-tooltip class="item" effect="dark" content="在此选择计算方式" placement="bottom-start">
            <input v-model="stateSelected.name" type="text" disabled >
          </el-tooltip>
          <i class="el-icon-arrow-down"></i>
        </div>
        <div class="statelist" v-show="show">
          <ul>
            <li @click="getItemValue(index,item)" :key="index" value="item.id" v-for="(item,index) in stateList">{{ item.name }}</li>
          </ul>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        stateList: {
            type: [Array],
            // 这种写法正确，返回数组默认值
            default(){
              const arr =[
                            {id:1,name:"算体积"},
                            {id:2,name:"算罐体长度"},
                            {id:3,name:"算罐体半径"},
                            {id:4,name:"算液位高度"}
                            ];
              return  arr
            }
           
        },
    },
    data(){
        return{
         show:false,
         stateSelected:{}
        }
    },
    created(){
      this.stateSelected.id = this.stateList[0].id;
      this.stateSelected.name= this.stateList[0].name;
    },
  
    methods:{
// 选择相关
    openValue(){
       this.show=!this.show;
    },
    getItemValue(index,item){
      this.stateSelected.id = item.id;
      this.stateSelected.name = item.name;
      this.show = false;
      this.$emit('getItemValue', this.stateSelected)  //注册一个时间把子组件的值传递给父组件
    },
    }
    
}
</script>
<style  scoped>

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