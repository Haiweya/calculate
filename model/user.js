var sequelize = require('../DB/DB');
const {Sequelize,DataTypes} = require('sequelize')


const User = sequelize.define('User', {
    id:{
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4, // 或 Sequelize.UUIDV1   
        primaryKey: true   
    },
    loginName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:'云南泽森环保科技有限公司'
    },
    department:{
        type: DataTypes.STRING,
        allowNull: false ,
        defaultValue:'财务部'
    },
    registerTime:{
        type: DataTypes.DATE  ,
        defaultValue: Sequelize.NOW,
        allowNull:true
    },
    lastLoginTime:{
        type:DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        allowNull:true
    }
  }, {
    tableName: 'userinfo'
  });


  module.exports = User;
  
