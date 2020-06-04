import axios from 'axios';
import { Message ,Loading } from 'element-ui';

import router  from './router'

//设置axios为form-data
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
}]

let loading         

// 函数定义
//loading 开始加载动画
function startLoading (){
    loading = Loading.service({
        fullscreen: true
    });
}

//loading结束动画
function endLoading(){
        loading.close();
}

// 请求拦截,启动加载动画
axios.interceptors.request.use(config=>{
    startLoading();
    if(localStorage.eleToken){
        //配置请求头
        config.headers.Authorization = localStorage.eleToken;
    }
    return config;
},error=>{
    return Promise.reject(error);
})

// 响应拦截
axios.interceptors.response.use(response=>{
    endLoading();
    return response;
},error =>{
    endLoading();
    Message.error(error.response.data)
    //获取错误状态码
    const {status} = error.response;
    if (status==401){
        Message.error("token失效,请重新登陆");
        //跳转到登录界面
        router.push("/login")
    }
})

// 进行导出之后需要在main.js之中配置相应的http // 供出之后在main.js 中使用
export default axios;

