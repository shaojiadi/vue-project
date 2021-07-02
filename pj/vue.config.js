const path = require('path')

if(process.env.VUE_APP_MODE=="'development'"){
    //开发环境下的执行操作
    console.log(999);
}else if(process.env.VUE_APP_MODE=="'test'"){
    //测试环境下的执行操作
    console.log(777);
}else{
    //生产环境下的执行操作
    console.log(6666);
}
   
module.exports = {
  chainWebpack (config) {
    config.entry('main').add('@babel/polyfill')    
  },
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/', // 公共路径
  outputDir: process.env.outputDir,
  lintOnSave: false,
  devServer: {
    host: "0.0.0.0",
    port: 8000, // 端口号
    open: true, //编译完成时打开网页
    // disableHostCheck: true, //跳过host检查
    proxy: {
        // 配置跨域
        '/api': {
            target: "http://172.33.44.11:8081/rsdq",
            ws:true,   //webscoket是否开启
            changOrigin:true,
            pathRewrite:{
                '^/api':'/'
            }
        }
    }
}
} 