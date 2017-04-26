var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"docker"',
  API_HOST: '"http://localhost:8000"',
  PHOTO_HOST: '""',
  // const _picturesCDN = 'http://res.cloudinary.com/glovoapp/image/fetch/http://devsite.glovoapp.com/'
  PICTURES_CDN: '"/"'
})
