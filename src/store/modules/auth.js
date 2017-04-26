import * as types from '../mutation-types'
import { plainToClass } from 'class-transformer'
import User from 'models/User'
import { user } from 'api'
import Q from 'q'

// initial state
const state = {
  authenticated: false,
  user: new User()
}

// getters
const getters = {
  user: state => state.user,
  authenticated: state => state.authenticated
}

// actions
const actions = {
  login ({ commit }, token) {
    return Q.Promise((resolve, reject, notify) => {
      user.me(token)
      .then(res => {
        const user = plainToClass(User, res)
        commit(types.AUTH_LOGGED_IN, user)
        resolve(user)
      })
      .catch(() => {
        commit(types.AUTH_LOG_ERROR)
        reject()
      })
    })
  },
  logout ({ commit }) {
    commit(types.AUTH_LOG_ERROR)
  }
}

// mutations
const mutations = {
  [types.AUTH_LOGGED_IN] (state, user) {
    state.authenticated = true
    state.user = user
  },

  [types.AUTH_LOG_ERROR] (state) {
    state.authenticated = false
    state.user = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
