const path = require('path');
const webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
  client: path.join(__dirname, './'),
  src: path.join(__dirname, './src'),
  env: path.join(__dirname, './env'),
  public: path.join(__dirname, './public'),
}

const timestamp = new Date().getTime();

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: `${PATHS.src}/index.js`,
  devtool: 'none',
  mode: 'development',
  output: {
    filename: `index-${timestamp}.js`,
    publicPath: '/',
    path: PATHS.public,
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
              emitFile: true,
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
      'rootEnv': PATHS.env,
    }
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new VueLoaderPlugin(),
    new Dotenv({
      path: `${PATHS.client}/.env`,
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
      filename: `${PATHS.public}/index.html`,
      template: 'index-template.html',
      inject: false,
    }),
  ],
}