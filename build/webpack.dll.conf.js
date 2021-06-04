/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-10-17 22:54:44 
 * @Description: 提取第三方库到vendor.dll
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2020-03-09 11:46:02
 */


const compiler_vendors = [
  'vue',
  'vue-router',
  'lodash',
  'axios',
  // ...其它库
];
 

var path = require("path");
var webpack = require("webpack");

module.exports = {
  // 要打包的模块的数组
  entry: {
    vendor: compiler_vendors
  },
  output: {
    path: path.join(__dirname, '../static/scripts'), // 打包后文件输出的位置
    filename: '[name].dll.js',// vendor.dll.js中暴露出的全局变量名。
    library: '[name]_library' // 与webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      name: '[name]_library', 
      context: path.join(__dirname)
    }),
  ]
};