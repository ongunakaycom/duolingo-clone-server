module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: 'F:/HDD/github/duolingo-clone-server/frontend/dist',  
  productionSourceMap: false,
  css: {
    extract: true,
    sourceMap: false,
  },
};
