import { host } from './config'
import fetch from './fetch'

export default {
  token: (credentials) => fetch.post(host + '/login', null, credentials),
  isAuth: () => fetch.get(host + '/isAuth')
}
