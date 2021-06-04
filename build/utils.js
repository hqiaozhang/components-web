'use strict'
const path = require('path')
const config = require('./base.config')
 
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

exports.assetsPath = function (_path) {
  console.log('process.env.NODE_ENV ', process.env.NODE_ENV)
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

/**
 *  获取项目下某个文件的绝对路径
 *  @param    {string}  dir 相对于项目根目录的路径
 *  @return   {string}  文件的绝对路径
 */
exports.resolve = function (dir) {
  return path.join(__dirname, '..', dir)
}
 

exports.htmlIncludeAssets = function() {
  return new HtmlIncludeAssetsPlugin({
    assets: [
      `${process.env.NODE_ENV === 'production' ? '' : '' + config.projectName + '/'}static/scripts/vendor.dll.js`], 
    append: false // false 在其他资源的之前添加 true 在其他资源之后添加
  })
}