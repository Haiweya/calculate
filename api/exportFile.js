// 导出文件
const express=require('express')
const router=express.Router();  
var nodeExcel = require('excel-export');
const fileServ = require('../server/fileServ')
const passport = require('passport');
const bodyParser = require('body-parser')

// 创建 application/json 解析
var jsonParser = bodyParser.json()
// 创建 application/x-www-form-urlencoded 解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/Excel', urlencodedParser,passport.authenticate('jwt',{session:false}), function(req, res){
    if(!req.body){
        return res.sendStatus(400)
    }
    const fileId = req.body.tab
     var conf ={};
     conf.name = "sheet";
       conf.cols = [{
         caption:'罐体长度',
         type:'number'	
     },{
         caption:'半径',
         type:'number'	
     },{
         caption:'液位高度',
          type:'number'				
     },{
        caption:'液位体积',
         type:'number'				
    }];
     // 表格内容
    fileServ.findOneFileitem(fileId).then(results=>{
        console.log(results);
        const rows =[]
        results.forEach((obj,i) => {
            rows[i] = []
            rows[i].push(obj.canLength)
            rows[i].push(obj.canRadius)
            rows[i].push(obj.solutionHeight)
            rows[i].push(obj.solutionVolume)    
        })
        // console.log(rows)
    // 插入每行     
    conf.rows = rows
    // 文件配置
    var result = nodeExcel.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats;charset=utf-8');
    // var name = encodeURI('卧罐液位容积计算');
    // res.setHeader("Content-Disposition", "attachment; filename=" + name + ".xlsx");
    // // res.end(result, 'binary');
    res.json({code: 1, result: result});
    })
    
})

module.exports =router;
