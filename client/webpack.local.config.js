const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: path.join(__dirname, './src/index.js'),
  devtool: 'eval',
  mode: 'none',
  devServer: {
    port: 9000,
    inline: true,
    disableHostCheck: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname),
    overlay: {
      warnings: true,
      errors: true,
    },
    clientLogLevel: 'error',
  },
  output: {
    filename: 'bundle.js',
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
    new Dotenv({
      path: path.resolve(__dirname, '/env/.env.localhost'),
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Сайт Атута | Локальная версия',
      host: process.env.host_front,
      mode: 'local',
      filename: '../index.html',
      template: 'index-template.html',
      inject: false,
    }),
  ],
}