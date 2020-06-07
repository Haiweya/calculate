<template>
    <div>
        <slected :stateList='stateList' class="divSelected"  @getItemValue='getState'></slected>  
    </div>   
</template>

<script>
import slected from '../components/slected' //input
export default {
    components:{
        slected
    },
    data(){
        return{
            stateSelected:{},
            stateList:[
                {id:1,name:"算体积"},
                {id:2,name:"算罐体长度"}
                ]
        }
    },
   created(){
       this.stateSelected = this.stateList[0]
   },
   methods:{
       //只有子组件点击之后才会触发
       getState(v){
           this.stateSelected = v;
           console.log(this.stateSelected)
       }
   }
    
}
</script>

<style  scoped>
.divSelected{
  position: absolute;
  top: 5%;
  left:6%;
  font-size: 17px;
  color:#757575;
 
}

</style>