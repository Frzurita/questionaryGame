import * as types from '../mutation-types'
import Q from 'q'
import { settings as APIsettings } from 'api'

// initial state
const state = {
  settingsEncoded: '',
  settings: {
    happiness: 35,
    money: 25,
    time: 0,
    current_stage: 0,
    question_related: [],
    question_showed: []
  }
}

// getters
const getters = {
  settings: state => state.settings
}

// actions
const actions = {
  initSettings ({ commit }) {
    commit(types.INIT_SETTINGS)
  },
  updateSettings ({ commit }, answer) {
    return Q.Promise((resolve, reject, notify) => {
      APIsettings.updateSettings(answer.id, state.settingsEncoded)
      .then((response) => {
        commit(types.UPDATE_SETTINGS_BY_SETTINGS, response)
        resolve()
      })
      .catch(() => {
        console.log('Something was wrong trying update settings')
      })
    })
  },
  updateSettingsBySettings ({ commit }, settings) {
    commit(types.UPDATE_SETTINGS_BY_SETTINGS, settings)
  }
}

// mutations
const mutations = {
  [types.INIT_SETTINGS] (state) {
    state.settings = {
      happiness: 35,
      money: 0,
      time: 0,
      current_stage: 0,
      question_related: [],
      question_showed: []
    }
  },
  [types.UPDATE_SETTINGS_BY_SETTINGS] (state, settings) {
    if (settings.settingsEncoded) {
      state.settings = settings.settings
      state.settingsEncoded = settings.settingsEncoded
    } else {
      state.settings = settings
    }
  },
  [types.UPDATE_SETTINGS] (state, answer) {
    if (state.settings.happiness <= 55 || state.settings.happiness >= 0 || (state.settings.happiness < 0 && answer > 0) || (state.settings.happiness > 55 && answer < 0)) {
      state.settings.happiness += answer.happiness
    }
    state.settings.money += answer.money
    state.settings.time += answer.time
    state.settings.current_stage = answer.current_stage
    if (answer.question_id) {
      state.settings.question_showed.push(answer.question_id)
    }
    if (answer.question_related) {
      state.settings.question_related.push(answer.question_related)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
