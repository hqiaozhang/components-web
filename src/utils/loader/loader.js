/*
 * @Author: baizn 
 * @Email: baizhanning@hiynn.com 
 * @Description: 页面渲染前加载配置项
 * @Date: 2018-03-07 09:22:24 
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2020-01-02 15:32:57
  */

import { resetSize } from '@/utils/util'
import config from '@/config'
import apis from './apiloader'

export default {
  /**
   * 执行初始化操作，然后执行app的初始化逻辑
   * @param    {Object}  app 页面实例配置
   * @example 参数示例
   * {
   *  config: {},
   *  apis: {}
   * }
   */
  load(app) {

    // 将应用配置合并到全局api
    config.merge(app.config)
    // 将应用的接口配置合并到全局api
    apis.merge(app.apis)
    // 加载字体大小重置(做响应式)
    // resetSize()
  }
}
