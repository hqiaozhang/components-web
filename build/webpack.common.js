const path = require('path')
const config = require('./base.config')
const utils = require('./utils')
// vue-loader插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')

/**
 * @param {string} dir 目录 
 */
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  // 出口
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.scss'],
    alias: {
      vue: 'vue/dist/vue.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true // 上述内容将自动处理 *.vue 文件内的 <style> 提取
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/, // 排除不处理的目录
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
        // include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-hot-middleware/client')],
        options: {
          cacheDirectory: true // 开启缓存
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|.ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(), // vue-loader插件
  ],
};