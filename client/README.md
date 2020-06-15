# cal

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



<!-- 实现前后端连载 在 calculate 主文件目录下，输入命令，同时启动前后端 -->

npm run dev 

❉


devServer: {
open: false,//open 在devServer启动且第一次构建完成时，自动用我们的系统的默认浏览器去打开要开发的网页
host: '0.0.0.0',//默认是 localhost。如果你希望服务器外部可访问，指定如下 host: '0.0.0.0'，设置之后之后可以访问ip地址
port: 8080,
hot:true,//hot配置是否启用模块的热替换功能，devServer的默认行为是在发现源代码被变更后，通过自动刷新整个页面来做到事实预览，开启hot后，将在不刷新整个页面的情况下通过新模块替换老模块来做到实时预览。
https: false,
hotOnly: false,// hot 和 hotOnly 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败
proxy: {
'/': {
target: 'http://xxxx:8080', //目标接口域名
secure: false, //false为http访问，true为https访问
changeOrigin: true, //是否跨域
pathRewrite: {
'^/': '/' //重写接口
}
}
}, // 设置代理
before: app => {}
},


Install the Heroku CLI
Download and install the Heroku CLI.

If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.

$ heroku login
Create a new Git repository
Initialize a git repository in a new or existing directory

$ cd my-project/
$ git init
$ heroku git:remote -a cal90801
Deploy your application
Commit your code to the repository and deploy it to Heroku using Git.

$ git add .
$ git commit -am "make it better"
$ git push heroku master
Existing Git repository
For existing repositories, simply add the heroku remote
有时候会遇到不能覆盖仓库代码的情况，考虑到是自己写的代码，所以就强推覆盖了
$ git push -f heroku master

$ heroku git:remote -a cal90801


"test": "echo \"Error: no test specified\" && exit 1",
    "client-install": "npm install --prefix client",
    "client": "npm start --prefix client",
    "start": "node index.js",
    "server": "nodemon index.js",
    "dev": "concurrently \"npm run server\" \"npm run client\""


// if(H <= R){
          //   var V = L * (Math.pow(R, 2) * Math.acos((R - H) / H) - (R - H) * Math.sqrt(Math.pow(R, 2) - Math.pow((R - H), 2)))
          //   // var result = L * ((H - R) * Math.sqrt(Math.pow(R, 2) - Math.pow((H - R), 2)) + Math.pow(R, 2) * Math.asin((H - R) / R) + 3.14 * Math.pow(R, 2) / 2);
          //   return V.toFixed(4);  //H<0.8278
          // }else{
          //   console.log("液位高度比半径大")
          //   var V = L*(Math.PI*Math.pow(R,2) - Math.pow(R,2)*Math.acos((H-R)/R) + (H-R)*Math.sqrt(Math.pow(R,2)-Math.pow((H-R),2)))
          //   return V.toFixed(4)
          // }   