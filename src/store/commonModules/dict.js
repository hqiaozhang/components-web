/*
 * @Author: zhanghongqiao 
 * @Date: 2020-02-21 15:05:15 
 * @Email: 991034150@qq.com 
 * @Description: 数据源类型
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-04-01 09:37:33
 */
 
 
import { fetch } from '@/utils/request'
const state = {
  componentTypes: [],  
  dataSourceTypes: [], 
  runModes: [],
  useStates: [],
  analyzeFormat: [],
  statisticalFunction: [],
  statisticalType: [],
  templateType: [],
  typesValue: [],
}
 
// getters
const getters = {
  componentTypes: state => state.componentTypes,  
  dataSourceTypes: state => state.dataSourceTypes,   
  runModes: state => state.runModes,  
  useStates: state => state.useStates,  
  analyzeFormat: state => state.analyzeFormat,  
  statisticalFunction: state => state.statisticalFunction,  
  statisticalType: state => state.statisticalType,  
  templateType: state => state.templateType,  
  typesValue: state => state.typesValue,  
}

/**
 * Action 可以包含任意异步操作。
 * Action 通过 store.dispatch 方法触发(该方法在组件内调用)
 */
const actions = { 

  /**
   * @description 获取组件类型
   * @param {function} {commit}
   */
  componentTypesRequest ({commit}) {
    fetch('fetchDictComponent', data => {
      commit('componentTypesSuccess', data) 
    }) 
  }, 

  // 运行方式
  runModesRequest ({commit}) {
    fetch('fetchRunModes', data => {
      commit('runModesSuccess', data) 
    }) 
  },  

  // 状态
  useStatesRequest ({commit}) {
    fetch('fetchUseStates', data => {
      commit('useStatesSuccess', data) 
    }) 
  },   

  // 模板解析格式
  analyzeFormatRequest ({commit}) {
    fetch('fetchAnalyzeFormat', data => {
      commit('analyzeFormatSuccess', data) 
    }) 
  },

   // 模板统计函数
   statisticalFunctionRequest ({commit}) {
    fetch('fetchStatisticalFunction', data => {
      commit('statisticalFunctionSuccess', data) 
    }) 
  },

   // 模板统计数值类型
   statisticalTypeRequest ({commit}) {
    fetch('fetchStatisticalType', data => {
      commit('statisticalTypeSuccess', data) 
    }) 
  },

   // 模板类型
   templateTypeRequest ({commit}) {
    fetch('fetchTemplateType', data => {
      commit('templateTypeSuccess', data) 
    }) 
  }, 

   // 平台值类型字典接口
   typesValueRequest ({commit}) {
    fetch("fetchTypesValue", {}, data => { 
      commit('typesValueSuccess', data) 
    });
  },  
}

 
const mutations = {
  /**
   * @description 获取组件类型成功
   * @param {object} state
   * @param {array} data
   */

  componentTypesSuccess(state, data) {
    state.componentTypes = data
  },  

  /**
   * @description 获取运行方式成功
   * @param {object} state
   * @param {array} data
   */

  runModesSuccess(state, data) {
    state.runModes = data
  },  

   /**
   * @description 状态
   * @param {object} state
   * @param {array} data
   */ 
  useStatesSuccess(state, data) {
    state.useStates = data
  },  

   /**
   * @description 模板解析格式
   * @param {object} state
   * @param {array} data
   */ 
  analyzeFormatSuccess(state, data) {
    state.analyzeFormat = data
  },  


   /**
   * @description 模板统计函数
   * @param {object} state
   * @param {array} data
   */ 
  statisticalFunctionSuccess(state, data) {
    state.statisticalFunction = data
  }, 

  /**
   * @description 模板统计数值类型
   * @param {object} state
   * @param {array} data
   */ 
  statisticalTypeSuccess(state, data) {
    state.statisticalType = data
  },  

   /**
   * @description 模板类型
   * @param {object} state
   * @param {array} data
   */ 
  templateTypeSuccess(state, data) {
    state.templateType = data
  },  

   /**
   * @description 数据库字段数据类型
   * @param {object} state
   * @param {array} data
   */ 
  typesValueSuccess(state, data) {
    state.typesValue = data
  },   
}

export default {
  state,
  getters,
  actions,
  mutations
}
