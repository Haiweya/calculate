const express = require('express')
const app = express();
const sequelize = require('./DB/DB')
const bodyParser = require('body-parser')
const path = require('path')
const fileserv = require('./server/fileServ')



const passport = require('passport');

//passport 初始化.
app.use(passport.initialize());
app.use(passport.session())




//调用 passport.js 并将passport传入
//加载passport 中间件，括号中的passport为上边引入的passport,
//这样写的作用是可以把引入的passport传入的config下的passport文件中供使用
require('./config/passport')(passport);


// // 执行前端静态页面
// if(process.env.NODE_ENV ==='production'){

// }

app.use(express.static('client/dist'))
app.get("*",(req,res)=>{
  res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
})




// 服务器地址
const port = process.env.PORT || 3001;
app.listen(port, (req, res) => {
  console.log(`server is running on ${port}`);
})





const fileItemModel = require('./model/fileItem')
const uploadFileModel = require('./model/uploadFile')

// 同步所有模型
async function sync() {
  // await sequelize.sync({ alter: true });
  await fileItemModel.sync({ force: true });
  uploadFileModel.hasMany(fileItemModel);
  fileItemModel.belongsTo(uploadFileModel);


  console.log("模型同步完成");

}
// sync();


// 路由部分
const user = require("./api/user");
const uploadFile = require('./api/uploadFile');
const test = require('./api/uploadFileTest')
const fileItem = require('./api/fileItem')
const exportFile = require('./api/exportFile')
// 使用路由
app.use("/api/user/", user);
app.use("/api/uploadFile/", uploadFile);
app.use("/api/test/", test);
app.use("/api/fileItem", fileItem)
app.use('/api/fileExport', exportFile)


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



// 数据库链接测试
//  function a(){
//     try {
//          sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
//   };

// a();




