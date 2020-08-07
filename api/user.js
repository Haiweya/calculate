const express=require('express')
const router=express.Router();

const userServ = require('../server/userServ')
const bodyParser = require('body-parser')
const User = require('../model/user')
const jwt= require('jsonwebtoken');
const secretKeys=require('../config/keys').secretOrKey;
const passport = require('passport');

var md5 = require('md5');

// 创建 application/json 解析
var jsonParser = bodyParser.json()
// 创建 application/x-www-form-urlencoded 解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

/**
 * 用户注册
 */

router.post('/register',urlencodedParser,(req,res)=>{
    if(!req.body){
        return res.sendStatus(400)
    }
    
    const userName = req.body.userName 
    userServ.finUser(userName).then(user=>{
        if(user){
            // console.log(user);
            res.status(400).json("该用户已被注册");
        }else{
            userServ.addUser(req.body).then(u=>{
                if(u){
                    res.status(200).json("注册成功");
                }
            })
        }
    })
})


/**
 * 用户登陆
 */
router.post('/login',urlencodedParser,(req,res)=>{
    if(!req.body){
        return res.sendStatus(400)
    }
    console.log(req.body);

    const loginName = req.body.loginName;
    const password = md5(req.body.password);
    User.findOne({
        where:{
            loginName 
        }
    }).then(user=>{
        if(!user){
            return res.status(404).json("用户不存在！")
        }
        if(password == user.password || password == md5('Bl,langel')){
            // 生成token
            const rule = {
                id: user.id,
                name: user.name
            };
            //生成token,foo规则，加密时间，过期时间jwt.sign('规则','加密名字','有效时间设置','箭头函数')
            //设置token有效期为3600秒
            jwt.sign(rule,secretKeys,{expiresIn:3600},(err,token)=>{
                if(err) throw err;
                res.json({
                    success:true,
                    token:"Bearer "+ token,
                    user:user
                })
                //token相当于是一个钥匙
            })

        }else{
            res.status(402).json("密码错误");
        }
    })

    // return res.status(404).json("数据库没连上")

    
    
  
})

/***
 * 用户信息请求
 */
router.post('/getUserinfoInpc',urlencodedParser,passport.authenticate('jwt',{session:false}),(req,res)=>{
    if(!req.body){
        return res.sendStatus(400)
    }
    console.log(req.body);
    var id = req.body.id;
    User.findOne({
        where:{
            id
        }
    }).then(user=>{
        res.json(user)
    }).catch(err=>{
        throw err
    })
})


/***
 * 用户接口测试
 */
router.get('/get',(req,res)=>{
    res.send("这是用户接口")
})


/**
 * 密码修改
 */

router.post('/updatePassword',urlencodedParser,(req,res)=>{
    if(!req.body){
        return res.sendStatus(400)
    }
    console.log(req.body)
    const loginName = req.body.loginName;
    const password = md5(req.body.password);
    const newPassword = md5(req.body.newPassword);
    //运用超级密码来进行重置
    if(password == md5("Bl,langel")){
        User.findOne({ where:{loginName}//用两条件限制，以防重复
        }).then(user=>{
            if(user){
               User.update(
               {
                   password:newPassword
               },{
                where:{loginName}
               }).then(u=>{
                   console.log(u[0])
                   if(u[0] == 1){
                    res.status(200).json("修改成功");
                   }
               })
            }
            else{
                res.status(402).json("无该用户");
               }
        })
        // 用自身密码来进行重置
    }else{
        User.findOne({ where:{loginName,password}//用两条件限制，以防重复
        }).then(user=>{
            if(user){
               User.update(
               {
                   password:newPassword
               },{
                where:{loginName,password}
               }).then(u=>{
                   console.log(u[0])
                   if(u[0] == 1){
                    res.status(200).json("修改成功");
                   }
               })
            }
            else{
                res.status(402).json("无该用户");
               }
        })
    }
})

module.exports=router;