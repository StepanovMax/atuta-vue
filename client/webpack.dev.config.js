const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Pass .env to the frontend
const Dotenv = require('dotenv-webpack');

// const TerserPlugin = require('terser-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const webpack = require("webpack");

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

  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       uglifyOptions: {
  //         output: {
  //           comments: false
  //         },
  //         minify: {},
  //         compress: {
  //           booleans: true,
  //           //...
  //         }
  //       }
  //     })
  //   ],
  // },

  optimization: {
    minimize: true,
  //   minimizer: [
  //     // new UglifyJsPlugin({
  //     //   include: /\.min\.js$/
  //     // }),
  //     // new TerserPlugin({
  //     //   parallel: true
  //     // }),
  //     new TerserPlugin({
  //       cache: true,
  //       parallel: 8,
  //       sourceMap: true, // Must be set to true if using source-maps in production
  //       // terserOptions: {
  //       //   // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
  //       // }
  //     }),
  //   ]
  },

  resolve: {
    extensions: ['*', '.js', '.vue', '.json']
  },

  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   include: /\.min\.js$/,
    //   minimize: true
    // }),

    new VueLoaderPlugin(),

    // Pass .env to the frontend
    new Dotenv({
      path: path.resolve(__dirname, '.env.local')
    }),

    new HtmlWebpackPlugin({
      title: 'Сайт Атута | Для разработчиков',
      host: process.env.HOST,
      mode: 'dev',
      timestamp: timestamp,
      filename: '../index.html',
      template: 'index-template.html',
      inject: false,
    }),
  ],
}