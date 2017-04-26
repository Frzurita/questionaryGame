var app = require('../app')
var config = require('../config/back-end-config/settings')
var port = process.env.PORT || config.port

var https = require('https')
var http = require('http')
var fs = require('fs')

if (port === 443) {
  var options = {
    key: fs.readFileSync('ssl/privkey.pem'),
    cert: fs.readFileSync('ssl/cert.pem'),
    ca: fs.readFileSync('ssl/ca.pem')
  }
  https.createServer(options, app).listen(port, function () {
    console.log('Listen on port ' + port)
  })

  http.createServer(function (req, res) {
  }).listen(80)
} else {
  console.log('process created', process.env.NODE_ENV, config.port)
  app.listen(port, '0.0.0.0')
}
