module.exports = {
  assetsDir: 'assets',
  productionSourceMap: false,
  publicPath: '',

  css: {
    loaderOptions: {
      sass: {
        data: '@import "./src/assets/styles/config/_config";'
      }
    }
  }
}
