/*
 * @Author: zhanghongqiao
 * @Date: 2018-05-29 21:07:35
 * @Description: 路由配置
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-06-04 16:55:44
 */

import Vue from 'vue'
import Router from 'vue-router'
 

// 注册Router
Vue.use(Router)
// 配置项
import config from '@/config/base.config'
// 登录
const Login = () => import('@/containers/login/index.vue')
// 编辑
const Editor = () => import('@/containers/editor/index.vue')
// 首页
const Home = () => import('@/containers/home/index.vue')


const routes = [
  {
    path: '/',
    name: 'index',
    // redirect: `/index`,
    component: () => import('@/containers/main/index.vue'),
  }, 
  {
    path: '/home',
    component: Home,
    children: [
      {
        path: 'data',
        component: () => import('@/containers/home/data.vue'),
        meta: {
          title: '数据管理',
        },
      },
      {
        path: 'data/add',
        component: () => import('@/containers/home/dataAdd.vue'),
        meta: {
          title: '添加数据源',
        },
      },
      {
        path: 'chart',
        component: () => import('@/containers/home/chart.vue'),
        meta: {
          title: '我的可视化',
        },
      },
      {
        path: '',
        redirect: 'chart',
      },
    ],
  }, {
    path: '/edit',
    component: Editor,
    children: [
      {
        path: ':id',
        component: () => import('@/containers/editor/Canvas.vue'),
        meta: {
          title: '大屏编辑',
        },
      },
    ],
  },{
    path: '/view/:id',
    name: 'view',
    component: () => import('@/containers/viewer/index.vue'),
    meta: {
      title: '大屏查看 | ChartFun',
    },
  },
]

export default new Router({
  // mode: 'history',
  base: config.routerPath,
  routes
})

 