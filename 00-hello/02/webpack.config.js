/**
 * Created by Yes.Man on 2021/3/9 10:57 下午.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node-modules/
      }
    ]
  },

  // 配置webpack插件
  plugins: [
    new HtmlWebpackPlugin({
      // title: 'TypeScript & Webpack'
      template: './index.html'
    }),
    new CleanWebpackPlugin()
  ],

  // 用来设置引用模块
  resolve: {
    extensions: [ '.js', '.ts' ]
  }
};
