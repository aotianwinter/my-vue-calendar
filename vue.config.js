const webpack = require('webpack')

module.exports = {
  outputDir: 'dist',
  assetsDir: 'assets',

  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.BannerPlugin('Build by 打酱油')
    ]
  },

  productionSourceMap: false
}