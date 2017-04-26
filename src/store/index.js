import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import auth from './modules/auth'
import question from './modules/question'
import sound from './modules/sound'
import settings from './modules/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    auth,
    question,
    sound,
    settings
  },
  strict: true
})
