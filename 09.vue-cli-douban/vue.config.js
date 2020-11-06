module.exports = {
  lintOnSave: false,
  devServer: {
    //eslint关闭设置
    overlay: {
      warning: false,
      errors: false
    },

    //通过webpack的代理来处理跨域api
    proxy:{
      '/api':{ //匹配开头是‘/api/...’的url
        target:'https://api.xhboke.com/', //替换成‘https://api.xhboke.com/api/...’
        pathRewrite:{'^/api' : ''}, // 重写，去掉‘/api’,‘https://api.xhboke.com/...’
        changeOrigin:true, // target为域名时true
        secure:false, //不检查安全问题,可以接受运行在HTTPS上
      },
    }
  }
}