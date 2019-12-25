module.exports = {
  
  devServer: {
    port: '8888',
    proxy: {
      '/api': {
        target: 'https://story.hao.360.cn',
        host: 'story.hao.360.cn',
        changeOrigin: true
      },
      '/comment':{
        target: 'https://u.api.look.360.cn',
        host: 'u.api.look.360.cn',
        changeOrigin: true
       
      }
    }
  }

}
