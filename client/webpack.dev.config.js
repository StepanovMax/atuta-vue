const path = require('path');
const webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const timestamp = new Date().getTime();

module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  devtool: 'none',
  mode: 'development',
  output: {
    filename: `bundle-${timestamp}.js`,
    publicPath: '/build/',
    path: path.join(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env"]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '/[name]-[hash:8].[ext]',
              publicPath: '',
              outputPath: 'img',
              useRelativePath: true
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.json'],
    alias: {
      'rootEnv': path.resolve(__dirname, '/env'),
    }
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new VueLoaderPlugin(),
    new Dotenv({
      path: path.resolve(__dirname, 'env/.env.development'),
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') // default value if not specified
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Сайт Атута | Для разработчиков',
      host: process.env.host_front,
      mode: 'dev',
      timestamp: timestamp,
      filename: '../index.html',
      template: 'index-template.html',
      inject: false,
    }),
  ],
}