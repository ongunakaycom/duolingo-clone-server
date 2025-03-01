module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  configureWebpack: {
    output: {
      filename: '[name].[contenthash].js',
    },
  },
  productionSourceMap: false,
  css: {
    extract: true,
    sourceMap: false,
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Duolingo Clone';
      return args;
    });
  },
  outputDir: 'frontend/dist',
};
