const { merge } = require('webpack-merge');
const baseConfig = require('./base.config.js');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// Pass .env to the frontend
const Dotenv = require('dotenv-webpack');

// Pass .env to webpack
// const webpack = require('webpack');
// const dotenv = require('dotenv').config({
//   path: path.join(__dirname, '../.env.local')
// });


console.log('process.env.HOST ::', process.env.HOST);


module.exports = merge(
  baseConfig,
  {
    // devtool: 'eval-source-map',

    mode: 'none',

    devServer: {
      port: 9000,
      inline: true,
      disableHostCheck: true,
      historyApiFallback: true,
      contentBase: path.join(__dirname, '../'),
      overlay: {
        warnings: true,
        errors: true,
      },
      clientLogLevel: 'error',
    },

    plugins: [
      // Pass .env to webpack
      // new webpack.DefinePlugin({
      //   "process.env": dotenv.parsed
      // }),

      // Pass .env to the frontend
      new Dotenv({
        path: path.resolve(__dirname, '../.env.local')
      }),

      new HtmlWebpackPlugin({
        title: 'Сайт Атута | Локальная версия',
        host: process.env.HOST,
        filename: '../index.html',
        template: 'index-template.html',
        inject: false,
      }),
    ],
  }
);