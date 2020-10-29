import { getToken, setToken, removeToken, encryption } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'

const state = {
  isLogin: !!getToken(),
  userInfo: {}
}

const mutations = {
  UPDATE_USER_INFO(state, info) {
    state.userInfo = info
  },
  UPDATE_IS_LOGIN(state, isLogin) {
    state.isLogin = isLogin
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo

    const login_info = encryption({
      data: {
        username,
        password
      },
      param: ['password']
    })
    return new Promise((resolve, reject) => {
      login(login_info)
        .then(response => {
          setToken(response.token)
          commit('UPDATE_IS_LOGIN', true)
          resolve()
        }).catch(error => {
          reject(error)
        })
    })
  },
  updateUserInfo({ commit }, info) {
    commit('UPDATE_USER_INFO', info)
  },
  updateIsLogin({ commit }, isLogin) {
    commit('UPDATE_IS_LOGIN', isLogin)
  },
  /* 处理 github 登陆后的消息 */
  githubLogin({ commit }, data) {
    const { token, userInfo } = data

    commit('UPDATE_USER_INFO', userInfo)

    setToken(token)
    commit('UPDATE_IS_LOGIN', true)

    return Promise.resolve()
  },
  getUserInfo({ commit }, data) {
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then(res => {
          commit('UPDATE_USER_INFO', res)
          resolve()
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  logout({ commit }) {
    removeToken()
    commit('UPDATE_IS_LOGIN', false)
    commit('UPDATE_USER_INFO', {})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
