/*
 * @Author: zhanghongqiao
 * @Date: 2018-05-07 21:06:45
 * @Email: 991034150@qq.com
 * @Description: 顶部导航数据请求
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-03-04 10:23:49
 */

import { fetch } from '@/utils/request'
 
let topActiveId = sessionStorage.getItem('topActiveId')
let leftActiveId = sessionStorage.getItem('leftActiveId')
const haveSideMenu =  sessionStorage.getItem('haveSideMenu')
const  isClickkTop = sessionStorage.getItem('isClickkTop')
const isOpenSideMenu = sessionStorage.getItem('isOpenSideMenu')
const state = {
  topActiveId: topActiveId,  
  topMenuList: [],
  leftActiveId: leftActiveId,
  isOpenSideMenu: isOpenSideMenu == 'true' ? true : false,
  haveSideMenu: haveSideMenu == 'true' ? true : false,
  rootMenu: [],
  isClickkTop: isClickkTop == 'true' ? true : false,
}


// /**
//  * 获取菜单地址
//  * @param {*} data 
//  * @param {*} hash 
//  */
// function getTopMenuActiveId(data, menuUrl) {
//   if(_.isEmpty(data)) {
//     return
//   }
//   data.map(item => {
//     if(item.menuUrl.includes(menuUrl)) {
//       return topActiveId = item.id
//     }
//   })
//   return topActiveId
// }


let activeId = ""
/**
 * 获取菜单地址
 * @param {*} data 
 * @param {*} hash 
 */
function getMenuActiveId(data, menuUrl) {
  if(_.isEmpty(data)) {
    return
  }
  data.map(item => {
    if(item.menuUrl.includes(menuUrl)) {
      return activeId = item.id
    }
    if(!_.isEmpty(item.childList)) {
      getMenuActiveId(item.childList, menuUrl)
    }
  })
  return activeId
}


// getters
const getters = {
  topMenuList: state => state.topMenuList,
  topActiveId: state => state.topActiveId,
  leftActiveId: state => state.leftActiveId,
  haveSideMenu: state => state.haveSideMenu, 
  rootMenu: state  => state.rootMenu, 
  isOpenSideMenu: state  => state.isOpenSideMenu, 
  isClickkTop: state  => state.isClickkTop, 
}

// 顶部导航actions
/**
 * Action 可以包含任意异步操作。
 * Action 通过 store.dispatch 方法触发(该方法在组件内调用)
 */
const actions = {
  /**
   * @description 获取头部导航数据
   * @param {function} {commit}
   */
  topMenuRequest ({commit}, params) {
    fetch('fetchMenus', params, (data) => { 
      if(_.isEmpty(data)) {
        return 
      }
       let topMenus = data.first 
        
       commit('topMenuSuccess', topMenus)
       commit('setSideMenu', data)
       
       // 获取顶部导航当前选择的
      //  let path = location.hash.slice(1)
      //  let topId = data[`${window.location.pathname}#${path}`]
      //  commit('setCurrentTopMenuId', topId)  
      
      // // 查找左边ID
      // for(let key in data) {
      //   let menus = data[key]  
      //   if (Array.isArray(menus)) {
      //     let item = this.getMenuActiveId(menus, path)
      //     this.$store.commit('setSideMenuDefActive', item) 
      //   } 
      // }  
      commit('setRootMenu',  data)
      commit('setCurrentTopMenuId', topActiveId)  // 设置顶部菜单当前Id 
      commit('setSideMenuState',  haveSideMenu == 'true' ? true : false )
    })
  }
}
// 顶部导航mutations
/**
 * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
 * Mutation 必须是同步函数
 * mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
 */
const mutations = {
  /**
   * @description 数据获取成功
   * @param {object} state
   * @param {array} data
   */
  topMenuSuccess (state, data) {
    state.topMenuList = data
  },
  /**
   * 
   * @param {object} state 
   * @param {string} path 当前路由
   */
  setCurrentTopMenuId(state, id) {
    state.topActiveId = id 
    state.isClickkTop = true 
    sessionStorage.setItem('topActiveId', id) 
    sessionStorage.setItem('isClickkTop', true) 
  },
   /**
   * 设备左边菜单的默认展开项
   * @param {Object} state 
   * @param {*} id 
   */ 
  setSideMenuDefActive(state, id) { 
    sessionStorage.setItem('leftActiveId', id)
    state.leftActiveId = id
    state.isClickkTop = false 
    sessionStorage.setItem('isClickkTop', false) 
  },

  /**
   * 菜单展开，收缩状态
   * @param {*} state 
   * @param {*} flag 
   */
  setOpenSideMenu(state, flag) {
    state.isOpenSideMenu = flag
    sessionStorage.setItem('isOpenSideMenu', flag)
  },

  /**
   * 是否展示左侧菜单
   * @param {*} state 
   * @param {*} flag 
   */
  setSideMenuState(state, flag) {   
    sessionStorage.setItem('haveSideMenu', flag)
    state.haveSideMenu = flag
  }, 

  setSideMenu(state, data) {
    state.rootMenu = data
    // sessionStorage.setItem('rootMenu', data)
  }, 
  /**
   * 获取所有菜单
   * @param {*} state 
   * @param {*} data 
   */
  setRootMenu(state, data) {
    state.rootMenu = data
    // sessionStorage.setItem('rootMenu', data)
  } 
}

export default {
  state,
  getters,
  actions,
  mutations
}
