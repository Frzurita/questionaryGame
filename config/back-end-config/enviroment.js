
var bodyParser = require('body-parser')
var express = require('express')
var path = require('path')
var logger = require('morgan')
var multipart = require('connect-multiparty')
var config = require('../index.js')
var cors = require('cors')
var nodeadmin = require('../../nodeadmin')

var db = require('./db')

var env = process.env.NODE_ENV
if (env === 'production') {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
  process.env.API_HOST = JSON.parse(config.dev.env.API_HOST)
  process.env.PHOTO_HOST = JSON.parse(config.dev.env.PHOTO_HOST)
  process.env.PICTURES_CDN = JSON.parse(config.dev.env.PICTURES_CDN)
}

module.exports = function (app) {
    // Logs
  app.use(logger('dev', { skip: function () { return env === 'test' } }))

    // Recieving data
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(bodyParser.json())
  app.use(multipart())
  app.use(nodeadmin(app))
  app.use(cors())

  app.use('/', express.static(path.join(__dirname, '../../dist')))
  app.use('/assets', express.static(path.join(__dirname, '../../src/assets'),
    {
      maxage: '10d',
      setHeaders: function (res, path) {
        res.setHeader('Expires', new Date(Date.now() + 2592000000 * 30).toUTCString())
        res.setHeader('Cache-Control', 'public, max-age=2592000')
      }
    }))
    // DB
  app.use(function (req, res, next) {
    req.models = db.models
    req.Sequelize = db.Sequelize
    req.sequelize = db.sequelize
    next()
  })
}
