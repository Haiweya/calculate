<template>
    <div>
        <!-- <slected :stateList='stateList' class="divSelected"  @getItemValue='getState'></slected> 
          -->
        <logout :user='user'></logout>
        
    </div>   
</template>

<script>
import slected from '../components/slected' //input 
import logout from '../components/logout' //elfrom 
import jwt_decode from 'jwt-decode'

export default {
    components:{
        slected,
        logout
    },
    data(){
        return{
            stateSelected:{},
            stateList:[
                {id:1,name:"算体积"},
                {id:2,name:"算罐体长度"}
                ],
            user:{}
        }
    },
   created(){
       this.stateSelected = this.stateList[0];
       const token = localStorage.eleToken;
       const decoded =jwt_decode(token);
       this.$axios.post('/api/user/getUser',decoded).then(res=>{
       this.user = res.data;
    })
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