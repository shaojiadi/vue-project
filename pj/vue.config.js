const path = require('path')
const { name } = require('./package');


function resolve(dir) {
    return path.join(__dirname, dir);
}
   
module.exports = {
  // chainWebpack (config) {
  //   config.entry('main').add('@babel/polyfill')    
  // },
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/', // 公共路径
  outputDir: process.env.outputDir,
  lintOnSave: false,
  devServer: {
    // host: "0.0.0.0",
    port: 8000, // 端口号
    open: true, //编译完成时打开网页,
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    https: true,
    disableHostCheck: true, //跳过host检查
    proxy: {
        // 配置跨域
        '/api': {
            target: "https://randomuser.me",
            ws:true,   //webscoket是否开启
            // secure:false, // 使用的是http协议则设置为false，https协议则设置为true
            changeOrigin:true,
            pathRewrite:{
                '^/api':'/api'
            }
        }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
} 