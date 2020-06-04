
const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const User= require('../model/user')  //使用user model

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = passport=>{
    passport.use(new JwtStrategy(opts,(jwt_payload, done)=> {
        // console.log(jwt_payload);//jwt_payload 解析好的 token字符串
        User.findOne({where:{
            id:jwt_payload.id
        }}).then(user=>{
            if(user){
                return done(null,user);  //解析成功，并user存在返回user
            }
            return done(null,false);
        })
        .catch(err=>{
            console.log(err);
        })
    }));
}