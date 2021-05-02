const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const source = path.resolve(__dirname, '../src');
const outputPath = path.resolve(__dirname, '../build');
const entryPath = path.resolve(__dirname, '../src/index.jsx');

module.exports = {
  entry: [entryPath],
  output: {
    path: outputPath,
    filename: 'app[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: source,
        use: 'babel-loader',
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.css$/,
        use:
          [
            {
              loader: 'style-loader',
              options: {
                esModule: true,
                modules: {
                  namedExport: false,
                },
              },
            },
            {
              loader: 'css-loader',
              options: {
                esModule: true,
                modules: {
                  namedExport: false,
                },
              },
            },
          ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      inject: 'body',
      template: './src/index.html',
    }),
  ],
  stats: {
    children: true,
  }
};
