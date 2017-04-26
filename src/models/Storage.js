import store from '../../node_modules/store/store.min.js'

export default {
  items: {
    AUTH: 'auth'
  },
  get: (key) => store.get(key),
  set: (key, val) => store.set(key, val),
  remove: (key) => store.remove(key)
}
