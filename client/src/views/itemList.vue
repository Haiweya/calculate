<template>
 <el-container class="container">
    <div class="head">
         <router-link to='/' class="backToHome">
         <img :src="homeimg" alt="">
         </router-link>
    </div>
     <div class="main">
        <el-table
            size='small '
            :data="itemlist"
            show-summary
            sum-text=" "
            :summary-method="getColumns"
            style="width: 100%"
            :default-sort = "{prop: 'order', order: 'ascending'}"
            >
            <!-- :default-sort = "{prop: 'order', order: 'descending'}" -->
            <!-- <el-table-column label="序号" type="index" show-overflow-tooltip width="100" style="margin-left:20px">
            </el-table-column> -->
            <el-table-column
            prop="order"
            label="序号"
            sortable>
            </el-table-column>
            <el-table-column
            prop="canLength"
            label="罐体长度"
            sortable
            >
            </el-table-column>
            <el-table-column
            prop="canRadius"
            label="罐体半径"
            sortable
            >
            </el-table-column>
            <el-table-column
            prop="solutionHeight"
            label="液位高度"
            sortable
            >
            </el-table-column>
            <el-table-column
            prop="solutionVolume"
            label="溶液体积"
            sortable
            >
            </el-table-column >
            <el-table-column  align='center'>
            <template slot-scope="scope">
                <el-button
                size="mini"
                type="danger"
                plain
                icon="el-icon-delete"
                circle
                @click="handleDelete(scope.$index, scope.row)"></el-button>
            </template>
            </el-table-column>
        </el-table>
        <!-- 分隔线 -->
     <el-divider></el-divider>
     </div>
    <el-button
        class="dowload"
        size="small "
        plain
        round
        type='success  '
        icon="el-icon-download"
        @click="download">
    </el-button>
     
 </el-container>       
</template>

<script>
import { Message ,Loading } from 'element-ui';
export default {
    components:{
    },
    data(){
        return{
            itemlist:[],
            fileId:'',
            homeimg:'https://i.loli.net/2020/05/28/RGNa7VAbydutSjQ.png'
        }
    },
   created(){
       this.fileId = this.$route.query;
       //然后获取渲染数据
       this.$axios.post('/api/fileItem/findOneFileitem',this.fileId).then(res=>{
           this.itemlist = res.data;
       })
   },
   methods:{
       handleDelete(index,row){
        const _this = this ;
        console.log(index,row.id);
        this.$axios.post('/api/fileItem/deleteItem',{id:row.id}).then(res=>{
                if(res.status == 200){
                    //    重新渲染数据
                    _this.$axios.post('/api/fileItem/findOneFileitem',_this.fileId).then(r=>{
                        _this.itemlist = r.data;
                    })
                _this.$message({
                        message:"删除成功",
                            type:"success"
                        })
            }else if (res.status == 400){
                    this.$message.error('删除失败');
            }
        })
       },
       download(){
            this.$axios.post('/api/fileExport/Excel',this.fileId).then(res=>{
                const buf = Buffer.from(res.data.result, 'binary')
                var blob = new Blob([buf], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}); // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
                var downloadElement = document.createElement('a');
                var href = window.URL.createObjectURL(blob); // 创建下载的链接
                downloadElement.href = href;
                var name = '卧罐液位容积计算'
                downloadElement.download =  name +'.xlsx'; // 下载后文件名
                document.body.appendChild(downloadElement);
                downloadElement.click(); // 点击下载
                document.body.removeChild(downloadElement); // 下载完成移除元素
                window.URL.revokeObjectURL(href); // 释放掉blob对象  
            })
       },
    //    自定义合计行
       getColumns(param){
            const _this = this ;
            const {columns,data} = param;
            const sums = [];
            columns.forEach((column, index) => {
            if(index === 0) {
            sums[index] = ' ';
            return;
            }
            switch(column.property) {
            case "solutionVolume":
            sums[index] = _this.getSum(_this.itemlist)
            break;
            }
            });
            return sums;
       },

       getSum(list){
           var sum = 0
           list.forEach((ele,index)=>{
               sum += ele.solutionVolume
           })
            // return  Math.round(sum*100)/100
            //保留4位小数
            return sum.toFixed(4);
       },
 }

}
</script>
 
 <style scoped>
 .container{
  background: #11998e; 
  background: -webkit-linear-gradient(to right top, #ccb182,#42bc93);  
  background: linear-gradient(to right top, #ccbf82,#42bc93);
  display: flex;
  width:100vw;
  justify-content: center;
 }
 .head{
     height: 14vh;
     width:90vw;
     position: fixed;
     top: 0;
     z-index:1000;
 }
 .dowload{
     position: fixed;
     bottom: 10%;
     right: 3%;
     z-index:1000;
     font-size: 17px;
 }
  .backToHome{
    width:5%
  }
  .backToHome img{
    width:6%;
    margin: 10px 0;
    padding: 0 !important;
  }
  .backToHome img::after{
    content: '返回首页';
    position:absolute;
  }
 .main{
     width: 75vw;
     margin-top:14vh;
 }
 .header-row{
     background:none;
     border: none;
     border-bottom: 2px solid #00634f;
     color: #00634f;
     font-weight: bold;

 }
 
 </style>