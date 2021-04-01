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

module.exports = env => {
  let mode;
  let devtool;
  let minimize;
  let title;

  if (env === 'local') {
    mode = 'none';
    devtool = 'eval';
    minimize = false;
    title = 'Local development Atuta';
  } else if (env === 'dev') {
    mode = 'development';
    devtool = 'none';
    minimize = false;
    title = 'Server development Atuta';
  } else if (env === 'stage') {
    mode = 'production';
    devtool = 'none';
    minimize = true;
    title = 'Стейдж Атута';
  } else if (env === 'prod') {
    mode = 'production';
    devtool = 'none';
    minimize = true;
    title = 'Атута';
  }

  return {
    externals: {
      paths: PATHS
    },
    entry: `${PATHS.src}/index.js`,
    devtool: devtool,
    mode: mode,
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
      minimize: minimize,
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
        title: title,
        host: process.env.host_front,
        timestamp: timestamp,
        filename: `${PATHS.client}/index.html`,
        template: 'index-template.html',
        inject: false,
        favicon: "./src/images/favicon/favicon.ico",
      }),
    ],
  }
}