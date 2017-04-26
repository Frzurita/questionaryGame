import * as types from '../mutation-types'
// import Q from 'q'

// initial state
const state = {
  sound: 'play'
}

// getters
const getters = {
  sound: state => state.sound
}

// actions
const actions = {
  play ({ commit }, token) {
    console.log('play')
    commit(types.PLAY_SOUND)
  },
  stop ({ commit }) {
    commit(types.STOP_SOUND)
  }
}

// mutations
const mutations = {
  [types.PLAY_SOUND] (state, user) {
    state.sound = 'play'
  },

  [types.STOP_SOUND] (state) {
    state.sound = 'stop'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
