
import { getCookie } from '@/utils/util'
let userId = getCookie('df_user_id')
let userName = getCookie('df_user_name')
let fullName = decodeURI(getCookie('df_full_name'))

const state = {
  // logged: !userId,
  logged: false,
  userId: userId,
  userName: userName,
  fullName: fullName,
}


// getters
const getters = {
  logged: state => state.logged,
  userId: state => state.userId,
  userName: state => state.userName,
  fullName: state => state.fullName
}

// 登录mutations
const mutations = {
  /**
   * @description 设置登录状态
   * @param {object} state 状态
   * @param {array} data 数据
   */
  setLoginState (state, logged) {
    state.logged = logged
    mutations.setUserId(state, getCookie('df_user_id'))
    mutations.setUserName(state, getCookie('df_user_name'))
  },

  /**
   * 设置用户id
   * @param state
   * @param userId
   */
  setUserId (state, userId) {
    state.userId = userId
  },

  /**
   * 设置用户名
   * @param state
   * @param userId
   */
  setUserName (state, userName) {
    state.userName = userName
  }

}

export default {
  state,
  getters,
  mutations
}
