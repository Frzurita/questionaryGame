import axios from 'axios'
import Q from 'q'
import store from 'models/Storage'

const headers = function headers () {
  let _headers = {
    'Content-Type': 'application/json'
  }

  const token = store.get(store.items.AUTH)
  if (token) {
    _headers['Authorization'] = token
  }
  return _headers
}

const call = function call (method, path, params, data) {
  const url = path
  let headers = {
    'Content-Type': 'application/json'
  }

  const token = store.get(store.items.AUTH)
  if (token) {
    headers['Authorization'] = token
  }
  const config = {
    url,
    headers,
    method,
    params,
    data: data ? JSON.stringify(data) : {}
  }

  return Q.Promise((resolve, reject, notify) => {
    axios(config)
    .then(response => {
      if (response && response.status === 200) {
        resolve(response.data)
      } else {
        reject(response.status)
      }
    })
    .catch((error) => {
      reject(error)
    })
  })
}

const get = function get (path, pathParams, body) {
  return call('GET', path, pathParams, body)
}
const post = (path, pathParams, data) => call('POST', path, pathParams, data)
const put = (path, pathParams, data) => call('PUT', path, pathParams, data)

export default {
  get,
  post,
  put,
  headers
}
