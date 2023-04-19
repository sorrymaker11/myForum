const path = require("path");
const CompressionPlugin = require('compression-webpack-plugin')
function resolve (dir) {
  return path.join(__dirname, dir);
}
const { defineConfig } = require('@vue/cli-service')
const BundleAnalyzerPlugin=require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = defineConfig({
  publicPath:'',
  transpileDependencies: true,
  chainWebpack: config => {
    if(process.env.NODE_ENV==='production'){
      config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin).end()
      //按需打包lodash函数
      config.plugin('lodash-webpack-plugin').use(require('lodash-webpack-plugin'))
    }
    //停止prefetch偷偷静默加载
    config.plugins.delete('prefetch')
    //压缩代码
    config.optimization.minimize(true)

    config.externals({
      "vue":'Vue',
      "vue-wordcloud":'WordCloud'
    })
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"))
    // .set("base", resolve("baseConfig"))
    // .set("public", resolve("public"));
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.css$|\.html$/,
            algorithm: 'gzip',
            threshold: 10240,
            deleteOriginalAssets: false,
          })
        ]
      }
    }
  }
})
