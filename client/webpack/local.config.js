const { merge } = require('webpack-merge');
const baseConfig = require('./base.config.js');
const path = require('path');


module.exports = merge(
  baseConfig,
  {
    devtool: 'eval-source-map',

    mode: 'development',

    devServer: {
      port: 9000,
      inline: true,
      disableHostCheck: true,
      historyApiFallback: true,
      contentBase: path.join(__dirname, '../'),
      // contentBasePublicPath: path.join(__dirname, '../'),
      overlay:{
        warnings: true,
        errors: true,
      },
      clientLogLevel: 'error',
    },
  }
);