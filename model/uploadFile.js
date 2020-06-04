var sequelize = require('../DB/DB');
const {Sequelize,DataTypes} = require('sequelize');



// const User = sequelize.define('User', {
const UploadFile = sequelize.define('UploadFile', {
    id:{
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4, // 或 Sequelize.UUIDV1   
        primaryKey: true   
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    filePath: {
        type: DataTypes.STRING,
        allowNull:false,
        
    },
    fileSize: {
        type: DataTypes.FLOAT ,
        allowNull:false
    },
    filetype: {
        type: DataTypes.STRING,
        allowNull: false
    },
    uploadTime:{
        type:DataTypes.TIME,
        defaultValue: Sequelize.NOW,
        allowNull: true
    },
    oparator: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
  }, {
    tableName: 'uploadFileInfo'
  });


 

  module.exports = UploadFile;
  
