/**
 * Created by Yes.Man on 2021/3/9 10:57 下午.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    environment: {
      arrowFunction: false
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  // 指定环境的插件
                  '@babel/preset-env',
                  // 配置信息
                  {
                    targets: {
                      'chrome': '88'
                    },
                    'corejs': '3',
                    'useBuiltIns': 'usage'
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ],
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
