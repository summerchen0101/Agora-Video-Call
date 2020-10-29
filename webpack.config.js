/* eslint-disable @typescript-eslint/no-var-requires */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const path = require('path');
module.exports = {
  entry: path.resolve(__dirname, 'src/index.tsx'),
  plugins: [
    new CaseSensitivePathsPlugin(),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['public'],
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  output: {
    publicPath: '/',
    path: __dirname + '/public',
    filename: 'build/[name].[contenthash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
};
