import { host } from './config'
import fetch from './fetch'

export default {
  get: () => fetch.get(host + '/admin/setting/get'),
  update: (settings) => fetch.post(host + '/admin/setting/update', null, settings),
  updateSettings: (answerId, settings) => fetch.post(host + '/game/updateSettings', null, { settings: settings, answer: answerId })
}
