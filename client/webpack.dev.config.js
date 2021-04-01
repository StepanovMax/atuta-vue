const path = require('path');
const webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const dotenv = require('dotenv').config({
  path: __dirname + '/.env'
});
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
  client: path.join(__dirname, '/'),
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
    publicPath: '/public/',
    path: PATHS.public,
    filename: `index-${timestamp}.js`,
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
        test: /\.(jpe?g|png|gif|ico|svg)$/i,
        include: PATHS.src,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: true,
              esModule: false,
              name: 'images/[name]-[hash:8].[ext]',
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
      'rootEnv': PATHS.client,
    }
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new Dotenv({
      path: `${PATHS.client}/.env`,
    }),
    new webpack.DefinePlugin({
      "process.env": dotenv.parsed,
    }),
    new HtmlWebpackPlugin({
      title: 'Development Atuta',
      host: process.env.host_front,
      timestamp: timestamp,
      filename: `${PATHS.client}/index.html`,
      template: 'index-template.html',
      inject: false,
      favicon: "./src/images/favicon/favicon.ico",
    }),
  ],
}