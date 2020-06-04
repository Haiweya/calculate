const formidable = require('formidable');
var path = require("path");
var fs = require('fs');
var xlsx = require('node-xlsx');
const express = require('express')
const calculate = require("../function/calculate")
const fileServ = require('../server/fileServ')
const router = express.Router();
const passport = require('passport');
const bodyParser = require('body-parser')

// 创建 application/json 解析
var jsonParser = bodyParser.json()
// 创建 application/x-www-form-urlencoded 解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.post('/upload', urlencodedParser,passport.authenticate('jwt',{session:false}), (req, res, next) => {
    var uploadDir = path.join(__dirname, '../', 'public');
      // 想在文件上传目录中写入文件，并保存原始文件的拓展名，需要将keepExtensions设置为true。  默认上传文件大小为20M
    const form = formidable({ multiples: true, uploadDir: uploadDir, encoding: 'utf-8', keepExtensions: true });
  
        const formParse =  new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) {
                    next(err);
                    return;
                }
                const user = req.user.dataValues
                info =[]
                info.push(user);
                info.push(files.file);
                fileServ.addFile(info).then(resp => {
                   const  resulveData ={};
                   resulveData.fileinfo = resp;  //文件信息
                   resulveData.calOption = fields;  //计算类型
                   resolve(resulveData);
                }).catch(err => {
                    if (err) throw err
                })
            })
        })

        const formOn = new Promise((resolve, reject) => {
            // 接收到一个文件时触发
            form.on('file', function (field, file) {
                var target_path = path.join(__dirname, '../', 'public');
                var dirList = fs.readdirSync(target_path);
                dirList.forEach((item, index) => {
                    if (!fs.statSync(target_path + '/' + item).isDirectory()) {
                        fileName = target_path + '/' + item;
                        // 这个判断还不好使,但是就是从返回数据中获取的呀
                        if (file.type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                            //解析excel
                            obj = xlsx.parse(fileName);
                            resolve(obj)

                        } else {
                            res.send({ "rtnCode": "1", "rtnInfo": "文件格式不对" });
                        }
                        //解析完随即删除文件，否则下次重复解析。所需数据已存入数据库
                        fs.unlinkSync(fileName);
                    }

                });
            })
        })

        Promise.all([formParse, formOn]).then((result) => {
            const calOption= result[0].calOption;
            
            const obj = result[1] //解析出来的数据
            const newObj = calculate.getitem(obj,calOption); //解析出来的数据转化为对象
                            
            
            const newObjWithResult = calculate.calculateVolume(newObj,calOption); //带有计算结果的信息.似乎calOption没用上
            const fileId = {fileId: result[0].fileinfo.id}  //文件id
            const fileItems = newObjWithResult;  //带结果的文件数据项
            //注意constant和var之间去区别
            var newfileItem = {},
                newfileItenList =[]
            // 添加上父级id
            fileItems.forEach(fileItem =>{
                newfileItem = Object.assign(fileItem,fileId );
                newfileItenList.push(newfileItem)
            })
            //DB
            fileServ.addFileItem(newfileItenList).then(resp=>{
                res.json(resp.UploadFileId)
            }) 
        
           
        }).catch((err) => {
            console.log(err)
        })

    
})




module.exports = router;
