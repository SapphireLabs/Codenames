var path = require('path');

module.exports = {
  // sourcemaps without slowing down rebunding
  devtool: 'eval-source-map',
  entry: path.join(__dirname, 'client/main.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: 'style!css' // add css loader
    }]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx']
  },
  devServer: {
    historyApiFallback: true
  }
};
