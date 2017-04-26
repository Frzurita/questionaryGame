import * as types from '../mutation-types'
import { plainToClass } from 'class-transformer'
import Question from 'models/Question'
import { question } from 'api'
import Q from 'q'

// initial state
const state = {
  questionSettings: {},
  questions: [],
  currentQuestion: new Question()
}

// getters
const getters = {
  questionSettings: state => state.questionSettings,
  questions: state => state.questions,
  totalOfQuestions: state => state.questions.length,
  currentQuestion: state => state.currentQuestion
}

// actions
const actions = {
  retrieveQuestions ({ commit }) {
    return Q.Promise((resolve, reject, notify) => {
      question.list()
      .then(res => {
        let questions = []
        let settings = {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0
        }
        res.map((value) => {
          settings[value.range] += 1
          questions.push(plainToClass(Question, value))
        })
        commit(types.RETRIEVE_QUESTIONS, {settings, questions})
        resolve()
      })
      .catch(() => {
        commit(types.AUTH_LOG_ERROR)
        reject()
      })
    })
  },
  nextQuestion ({ commit }, settings) {
    return Q.Promise((resolve, reject, notify) => {
      question.nextQuestion(settings)
      .then((response) => {
        resolve(response)
      })
      .catch(() => {
        console.log('error en next question')
      })
    })
  }
}

// mutations
const mutations = {
  [types.RETRIEVE_QUESTIONS] (state, {settings, questions}) {
    state.questions = questions
    state.questionSettings = settings
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
