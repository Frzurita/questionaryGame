import { host } from './config'
import fetch from './fetch'

export default {
  list: () => fetch.get(host + '/admin/question/list'),
  create: (question) => fetch.post(host + '/admin/question/create', null, question),
  createAnswer: (answer) => fetch.post(host + '/admin/answer/create', null, answer),
  update: (question) => fetch.post(host + '/admin/question/update', null, question),
  updateAnswer: (answer) => fetch.post(host + '/admin/answer/update', null, answer),
  delete: (question) => fetch.post(host + '/admin/question/delete', null, question),
  deleteAnswer: (answer) => fetch.post(host + '/admin/question/delete', null, answer),
  nextQuestion: (settings) => fetch.post(host + '/game/nextQuestion', null, settings)
}
