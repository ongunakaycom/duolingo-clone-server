// frontend/vue.config.js

module.exports = {
  // Public Path Configuration
  publicPath: process.env.NODE_ENV === 'production' ? '/duolingo-clone-frontend/' : '/',

  // Development Server Configuration (for local development)
  devServer: {
    proxy: {
      // Forward API requests to the backend
      '/api': {
        target: 'http://localhost:3000', // Replace with your local backend URL or environment variable
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // Configure Vercel-specific build settings
  configureWebpack: {
    output: {
      filename: '[name].[contenthash].js',
    },
  },

  // Production-specific settings
  productionSourceMap: false, // Disable source maps for production build

  // Enable CSS/JS minification and optimization in production
  css: {
    extract: true,
    sourceMap: false,
  },

  // Ensure the app works in all environments
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'Duolingo Clone'; // Set your custom app title
      return args;
    });
  },

  // Additional settings for Vercel (optional)
  // Depending on the setup, you might need this if you're hosting both frontend and backend on Vercel
  outputDir: '../dist', // Output directory for build files
};
