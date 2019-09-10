const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    test: './src/login.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname,'dist')  // 出口路径必须是绝对路径
  }, // 出口文件

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true,  // 打包之后的文件名加上hash串 避免缓存
      chunks: ['index'],
      filename: 'index1.html',
      title: 'hello',
      minify: {
        re
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/login.html',
      hash: true,
      chunks: ['login'],
      filename: 'login1.html',
      title: 'world'
    })
  ]
};
