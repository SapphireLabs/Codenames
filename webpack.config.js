var path = require('path');

module.exports = {
  // sourcemaps without slowing down rebundling
  devtool: 'cheap-module-source-map',
  entry: path.join(__dirname, 'client/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.json$/,
      loader: 'json' // add json loader
    }]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx']
  },
  devServer: {
    historyApiFallback: true
  }
};
