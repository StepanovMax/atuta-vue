const path = require('path');
const webpack = require('webpack');
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

module.exports = {
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
    overlay: {
      warnings: true,
      errors: true,
    },
    clientLogLevel: 'error',
  },
  output: {
    filename: 'index.js',
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
      // {
      //   // test: /\.(jpe?g|png|gif|svg|ico)$/i,
      //   test: /\.(jpg|png|svg)$/i,
      //   exclude: [/node_modules/],
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '/[name]-[hash:8].[ext]',
      //         // publicPath: `${PATHS.public}/images/img`,
      //         // outputPath: `${PATHS.public}/images`,
      //         // useRelativePath: true,
      //         // context: '/',
      //         // context: `${PATHS.public}/src/images/ads`,
      //         // include: `${PATHS.src}`,
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i,
        // exclude: /node_modules/,
        include: PATHS.src,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name]-[hash:8].[ext]',
              emitFile: true,
            },
          },
        ],
      },
      // {
      //   test: /\.(jpe?g|png|gif|svg|ico)$/i,
      //   use: [
      //     {
      //       loader: 'image-webpack-loader',
      //       options: {
      //         name: '/[name]-[hash:8].[ext]',
      //         // publicPath: `${PATHS.public}/images/img`,
      //         // outputPath: `${PATHS.public}/images`,
      //         // useRelativePath: true,
      //         context: `${PATHS.public}/src/images/ads`,
      //         // include: `${PATHS.src}`,
      //       }
      //     }
      //   ]
      // },
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
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: `${PATHS.src}/images`, to: `${PATHS.public}/images` },
    //   ],
    // }),
    // new CleanWebpackPlugin(),
    new Dotenv({
      path: `${PATHS.client}/.env`,
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Сайт Атута | Локальная версия',
      host: process.env.host_front,
      mode: 'local',
      filename: `${PATHS.public}/index.html`,
      template: 'index-template.html',
      inject: false,
    }),
  ],
}