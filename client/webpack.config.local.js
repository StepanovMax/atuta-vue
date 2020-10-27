const { merge } = require('webpack-merge');
const baseConfig = require('./webpack/base.config.js');
const path = require('path');


module.exports = merge(
  baseConfig,
  {
    devtool: 'eval-source-map',

    mode: 'none',

    devServer: {
      port: 9000,
      inline: true,
      disableHostCheck: true,
      historyApiFallback: true,
      contentBase: path.join(__dirname),
      compress: true,
      overlay: {
        warnings: true,
        errors: true,
      },
      clientLogLevel: 'error',
    },
  }
);