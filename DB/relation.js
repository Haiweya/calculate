const uploadFile = require('../model/uploadFile')
const fileItem = require('../model/fileItem')

 function relation (){
    console.log('设置关系')
    uploadFile.hasMany(fileItem); // A 有多个 B
    fileItem.belongsTo(uploadFile); // A 属于 B
}



