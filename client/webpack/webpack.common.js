const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenvWebpack = require('dotenv-webpack');
const dotenv = require('dotenv').config({
  path: __dirname + '/.env'
});
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
  client: path.join(__dirname, './'),
  src: path.join(__dirname, './src'),
  env: path.join(__dirname, './env'),
  public: path.join(__dirname, './public'),
}

const timestamp = new Date().getTime();


module.exports = env => {
  console.log(' ');
  console.log('>> NODE_ENV ::', env);
  console.log(' ');

  return {
    externals: {
      paths: PATHS
    },
    entry: `${PATHS.src}/index.js`,
    devtool: 'eval',
    mode: 'none',
    devServer: {
      port: 9000,
      inline: true,
      disableHostCheck: true,
      historyApiFallback: true,
      contentBase: PATHS.client,
      writeToDisk: true,
      overlay: {
        warnings: true,
        errors: true,
      },
      clientLogLevel: 'error',
    },
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
          exclude: '/node_modules/',
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
              },
            },
          ],
        },
      ]
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
      new CleanWebpackPlugin(),
      new VueLoaderPlugin(),
      new dotenvWebpack({
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
}