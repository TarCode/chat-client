module.exports = {
  entry: './src',
  output: {
    filename: 'bundle.js',
    path: './dist',
    publicPath: '/'
  },
  devServer: {
    inline: true,
    contentBase: './dist',
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [ 'es2015', 'react', 'stage-2' ]
        }
      }
    ]
  }
}
