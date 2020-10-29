const { merge } = require('webpack-merge');
const baseConfig = require('./base.config.js');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// Pass .env to webpack
const webpack = require('webpack');
const dotenv = require('dotenv').config({
  path: path.join(__dirname, '../.env.local')
});


console.log('process.env.HOST ::', process.env.HOST);


module.exports = merge(
  baseConfig,
  {
    devtool: 'eval-source-map',

    mode: 'development',

    plugins: [
      new webpack.DefinePlugin({
        "process.env": dotenv.parsed
      }),

      new HtmlWebpackPlugin({
        title: 'Сайт Атута | Для разработчиков',
        host: process.env.HOST,
        filename: '../index.html',
        template: 'index-template.html',
        inject: false,
      }),
    ],
  }
);