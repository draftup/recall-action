const webpack = require('webpack')
const path = require('path')

const BUILD_DIR = path.resolve(__dirname, 'build')
const SRC_DIR = path.resolve(__dirname, 'src')

const WebpackConfig = {

  entry: SRC_DIR + '/index.js',

  output: {
    path: BUILD_DIR,
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'recall-bucket'
  },

  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /.js$/,
        exclude: /node_modules/,
        include: SRC_DIR,
        options: {
          presets: [ 'env' ]
        }
      }
    ]
  }

}

// webpack production config.
if (process.env.NODE_ENV === 'production') {
  WebpackConfig.plugins = [
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true
      },
      compress: {
        warnings: false,
        screw_ie8: true
      },
      comments: false
    })
  ]
}

module.exports = WebpackConfig
