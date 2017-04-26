var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_HOST: '"http://localhost:8000"',
  PHOTO_HOST: '""',
  PICTURES_CDN: '"/"'
})
