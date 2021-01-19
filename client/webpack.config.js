const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const TerserPlugin = require('terser-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/index.js',
  mode: 'none',
  // node: {
  //   fs: "empty"
  // },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/',
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
    extensions: ['*', '.js', '.vue', '.json']
  },
  devtool: 'source-map',
  devServer: {
    port: 9000,
    inline: true,
    disableHostCheck: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname),
    overlay:{
      warnings: true,
      errors: true
    },
    clientLogLevel: 'error',
  },
  // optimization: {
  //   minimize: false,
  // },
  // optimization: {
  //   minimizer: [
  //     new TerserPlugin({
  //       cache: true,
  //       parallel: true,
  //       sourceMap: true, // Must be set to true if using source-maps in production
  //     }),
  //   ],
  // },
  // optimization: {
  //   minimizer: [
  //     (compiler) => {
  //       const TerserPlugin = require('terser-webpack-plugin');
  //       new TerserPlugin({ /* your config */ }).apply(compiler);
  //     }
  //   ],
  // },

  node: {
    fs: "empty"
  },

  plugins: [
    new VueLoaderPlugin(),
    // new BundleAnalyzerPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   minimize: true
    // })
    // new Dotenv(),
  ],
  // resolve: {
  //   alias: {
  //     'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
  //   },
  // },
}