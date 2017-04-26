import { host } from './config'
import fetch from './fetch'

export default {
  me: () => fetch.get(host + '/me', null, null)
}
