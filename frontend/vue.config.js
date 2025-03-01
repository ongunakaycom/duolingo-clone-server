module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },

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

  outputDir: 'public',
};
