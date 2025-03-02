module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: 'frontend/dist',  // Vue build will output here
  productionSourceMap: false,
  css: {
    extract: true,
    sourceMap: false,
  },
};
