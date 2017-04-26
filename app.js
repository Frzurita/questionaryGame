var express = require('express')
var enviroment = require('./config/back-end-config/enviroment')
var app = express()

enviroment(app)

app.use(require('./config/back-end-config/routes'))

module.exports = app
