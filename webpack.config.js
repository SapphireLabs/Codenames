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
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  devServer: {
    historyApiFallback: true
  }
};
