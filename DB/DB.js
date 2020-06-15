const { Sequelize } = require('sequelize');



// 链接数据库  开发环境下的数据库

const sequelize = new Sequelize('calculate', 'root', '1234', {
    host: 'localhost',  
    dialect: 'mysql',
      //时间上的统一
    timezone: "+08:00",
  });


//生产环境数据

// const sequelize = new Sequelize('calculate', 'Abumysql', 'Abu510mysql', {
//   host: '117.50.100.8',  
//   dialect: 'mysql',
//   timezone: "+08:00",
// });




module.exports = sequelize;