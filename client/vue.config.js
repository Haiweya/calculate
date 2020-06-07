// Vue前端实现跨域请求，文件名一定要这么配置
const path = require('path')
const debug = process.env.NODE_ENV !== 'production'

module.exports = {
    // baseUrl: '/', // 根域上下文目录,不过这东西会报错//
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
    lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
    runtimeCompiler: true, // 运行时版本是否需要编译
    transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    productionSourceMap: true, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
    configureWebpack: config => { // webpack配置，值为对象时会合并配置，为方法时会改写配置
        if (debug) { // 开发环境配置
            config.devtool = 'cheap-module-eval-source-map'
        } else { // 生产环境配置
        }
        // Object.assign(config, { // 开发生产共同配置
        //     resolve: {
        //         alias: {
        //             '@': path.resolve(__dirname, './src'),
        //             '@c': path.resolve(__dirname, './src/components'),
        //             'vue$': 'vue/dist/vue.esm.js'
        //         }
        //     }
        // })
    },
    chainWebpack: config => { // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
        if (debug) {
            // 本地开发配置
        } else {
            // 生产开发配置
        }
    },
    parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
    pluginOptions: { // 第三方插件配置
    },
    pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    },
      //反向代理
    devServer: {
        open: true,
        host: 'localhost',
        port: 8081,
        https: false,
        hotOnly: false,
        clientLogLevel: 'info',

        // 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，
        // 你需要在开发环境下将 API 请求代理到 API 服务器。这个问题可以通过
        // vue.config.js 中的 devServer.proxy 选项来配置。

        proxy: { 
            '/api': {
                target: 'http://localhost:'+process.env.PORT || 3000+'/api',  //目标接口域名
                ws: true,    //false为http访问，true为https访问
                changOrigin: true,   //是否跨域
                pathRewrite: {
                    '^/api': ''             //重写接口
                }
            }
        },
         // 设置代理
        before: app => { }
    }
}
