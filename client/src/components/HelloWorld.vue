<template>
  <div>
    <el-button @click="visible = true">Button</el-button>
    <el-dialog :visible.sync="visible" title="Hello world">
      <p>Try Element</p>
    </el-dialog>
  </div>
   
</template>

<script>

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function() {
        return { visible: false }
      }
}
</script>


<style scoped>

</style>
