<template>
    <el-dialog 
     :visible.sync="visible"
     title="提示">
      <p>{{content}}</p>
    </el-dialog>  
</template>

<script>
export default {
  name: 'dailog',
  props: {
    content:String
  },
  data: function() {
        return { 
           visible:true
          }
      }
}
</script>


<style scoped>

</style>
