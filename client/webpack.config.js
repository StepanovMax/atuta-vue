const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
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
    host: '192.168.0.100',
    disableHostCheck: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname),
    overlay:{
      warnings: true,
      errors: true
    },
    clientLogLevel: 'error',
  },
  plugins: [
    new VueLoaderPlugin(),
    // new BrowserSyncPlugin({
    //   host: '192.168.0.100',
    //   port: 9000,
    //   proxy: 'http://192.168.0.100:9000/'
    // }),
  ],
  // resolve: {
  //   alias: {
  //     'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
  //   },
  // },
}