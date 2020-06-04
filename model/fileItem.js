var sequelize = require('../DB/DB');

const {Sequelize,DataTypes} =require('sequelize')


const FileItem = sequelize.define('FileItem', {
    id:{
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4, // 或 Sequelize.UUIDV1   
        primaryKey: true   
    },
    UploadFileId:{
        type: DataTypes.STRING   
    },
    tablename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    canLength: {
        type: DataTypes.FLOAT ,
        allowNull: true
    },
    canRadius: {
        type: DataTypes.FLOAT ,
        allowNull: true
    },
    solutionHeight: {
        type: DataTypes.FLOAT ,
        allowNull: true
    },
    solutionVolume: {
        type: DataTypes.FLOAT ,
        allowNull: true
    }
    
  }, {
    tableName: 'fileItem'
  });



  module.exports = FileItem;
  
