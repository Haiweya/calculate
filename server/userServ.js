var md5 = require('md5');
var User = require('../model/user')

// 查询一个用户
async function finUser(userName){
    const user = await User.findOne({
        where:{
            userName  
        }
    })
    if (user){
        return user
    }else{
        return null
    }
}


// 添加一个用户
async function addUser (userinfo){
    var password = md5(userinfo.password)
    const user = await User.create({
        loginName: userinfo.loginName,
        password:  password,
        userName: userinfo.userName,
        company: userinfo.company,
        department:userinfo.department
    })
    if(user){
        return user.dataValues;
    }
}



module.exports = {  
    "addUser": addUser,
    "finUser":finUser
};