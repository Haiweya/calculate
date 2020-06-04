const  UploadFile = require("../model/uploadFile");
const fileItem = require("../model/fileItem")

// 添加一个文件信息
async function addFile(info) {
    // console.log(info);
    const user=info[0];
    const fileInfo = info[1];
    return new Promise((resolve, reject) => {
         UploadFile.create({
            fileName: fileInfo.name,
            filePath: fileInfo.path,
            fileSize: fileInfo.size,
            filetype: fileInfo.type,
            uploadTime: fileInfo.lastModifiedDate,
            oparator: user.userName
        })
        .then(file => {
            resolve(file.dataValues);
        }).catch(err => {
            reject(err);
        });
    });
}
// 插入文件列表项

async function addFileItem(ObjWithResult) {
    return new Promise((resolve,reject)=>{
        ObjWithResult.forEach((item,i) => {
            fileItem.create({
                UploadFileId :item.fileId,
                canLength: item.canLength,
                canRadius: item.canRadius,
                solutionHeight: item.solutionHeight,
                solutionVolume: item.solutionVolume,
                tablename: item.tablename 
            }).then(itemInDb => {
                resolve(itemInDb.dataValues); //应该会返回第一条数据
            }).catch(err => {
                reject(err);
            });   
        }); 
})

  
}

// 查询一个文件列表内容
async function findOneFileitem(UploadFileId){
    return new Promise((resolve,reject)=>{
      fileItem.findAll(
         {
            raw: true,  //设置 raw:true 打印对象 则可返回数组
            where:{
                UploadFileId :UploadFileId 
            }
         }).then(results =>{
             resolve(results);
         }).catch(err =>{
            reject(err)
         })
    })   
}

//  删除一个列表项
async function deleteItem(id){
    console.log(id);
    const code = await fileItem.destroy({
        where:{
            id
        }
    })
    // console.log(code)
    return code;
}

module.exports = {  
                    "addFile": addFile,
                    "addFileItem":addFileItem ,
                    "findOneFileitem":findOneFileitem,
                    "deleteItem":deleteItem
                 };