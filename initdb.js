const exec = require('child_process').exec
const config = require('./config/back-end-config/settings.js')
exec('mysql -h ' + config.db.host + ' -u ' + config.db.username + ' -p' + config.db.password + ' ' + config.db.dbname + ' < init.sql', (error, stdout, stderr) => {
  if (error) {
    console.log(error)
  } else {
    console.log('db created')
  }
})
