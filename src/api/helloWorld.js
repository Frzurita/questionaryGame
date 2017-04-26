import { host } from './config'
import fetch from './fetch'

export default {
  helloWorld: () => fetch.get(host + '/hello-world'),
  create: () => fetch.get(host + '/create')
}
