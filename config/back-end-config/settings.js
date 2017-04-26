var settings = {
  'development': {
    'url_base': 'YOUR_DOMAIN',
    'port': '8000',
    'db': {
      'uri': 'YOUR_DB_URI', // example: 'mysql://user:password@your_db_domain.com/example'
      'dbname': 'DB_NAME',
      'username': 'YOUR_DB_USER_NAME',
      'password': 'YOUR_DB_PASSWORD',
      'host': 'YOUR_DB_HOST',
      'port': '',
      'dialect': 'DYALECT' // example: 'mysql'
    },
    'secret': 'SECRET_KEY', // example: bc498a23877e37cac0086557a9eb90d0e3a657c1dd3db7bfdc4d736d5c017fd2
    'logs': false
  },
  'production': {
    'url_base': 'YOUR_DOMAIN',
    'port': '8000',
    'db': {
      'uri': 'YOUR_DB_URI', // example: 'mysql://user:password@your_db_domain.com/example'
      'dbname': 'DB_NAME',
      'username': 'YOUR_DB_USER_NAME',
      'password': 'YOUR_DB_PASSWORD',
      'host': 'YOUR_DB_HOST',
      'port': '',
      'dialect': 'DYALECT' // example: 'mysql'
    },
    'secret': 'SECRET_KEY', // example: bc498a23877e37cac0086557a9eb90d0e3a657c1dd3db7bfdc4d736d5c017fd2
    'logs': false
  }
}

var _ = require('underscore')
var env = settings[process.env.NODE_ENV] ? process.env.NODE_ENV : 'production'
var envConfig = _.extend(settings.development, settings[env])
envConfig.env = env

module.exports = envConfig
