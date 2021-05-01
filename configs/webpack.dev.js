const path = require('path')
const { merge } = require('webpack-merge');

const commonConfig = require('./webpack.common');

const source = path.resolve(__dirname, '../src');

module.exports = merge(commonConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 8081,
    publicPath: '/',
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: '../src',
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
          },
        ],
      },
    ],
  },
});
