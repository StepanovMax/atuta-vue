const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
  entry: path.join(__dirname, '../src/index.js'),
  // entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    // publicPath: path.join(__dirname, '../build'),
    publicPath: '/build/',
    path: path.join(__dirname, '../build'),
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

  plugins: [
    new VueLoaderPlugin(),
  ],
}