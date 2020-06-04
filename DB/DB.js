const { Sequelize } = require('sequelize');



// 链接数据库
const sequelize = new Sequelize('calculate', 'root', '1234', {
    host: 'localhost',  
    dialect: 'mysql',
      //时间上的统一
    timezone: "+08:00",
  });



module.exports = sequelize;