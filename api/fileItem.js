const express = require('express')
const router = express.Router();
const bodyParser = require('body-parser')
const fileServ = require('../server/fileServ');
const passport = require('passport');

// 创建 application/json 解析
var jsonParser = bodyParser.json()
// 创建 application/x-www-form-urlencoded 解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//获取单个上传文件列表内容
router.post('/findOneFileitem',urlencodedParser, passport.authenticate('jwt',{session:false}), (req, res, next) => {
    if(!req.body){
        return res.sendStatus(400)
    }
    // console.log('findOneFileite',req.body.tab);
    const fileId = req.body.tab
    fileServ.findOneFileitem(fileId).then(results=>{
         res.send(results)
    })
})

//删除单个列表项
router.post("/deleteItem",urlencodedParser ,passport.authenticate('jwt',{session:false}), (req,res,next)=>{
    if(!req.body){
        return res.sendStatus(400)
    }
    const id= req.body.id;
    console.log(id)
    fileServ.deleteItem(id).then(code =>{
        //返回1表示删除成功，返回0表示删除失败
        if( code==1){
            res.status(200).json("删除成功");
        }else{
            res.status(400).json("删除失败");
        }
    })
})


module.exports = router;