module.exports = {
  assetsDir: 'assets',
  productionSourceMap: false,

  css: {
    loaderOptions: {
      sass: {
        data: '@import "./src/assets/styles/config/_config";'
      }
    }
  }
}