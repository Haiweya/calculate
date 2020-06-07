const { Sequelize } = require('sequelize');



// 链接数据库  开发环境下的数据库

// const sequelize = new Sequelize('calculate', 'root', '1234', {
//     host: 'localhost',  
//     dialect: 'mysql',
//       //时间上的统一
//     timezone: "+08:00",
//   });



//  数据库部署在本地，然后把前后端代码部署在服务器上

  const sequelize = new Sequelize('calculate', 'root', '1234', {
    host: '192.168.43.21',  
    dialect: 'mysql',
    timezone: "+08:00",
  });




module.exports = sequelize;