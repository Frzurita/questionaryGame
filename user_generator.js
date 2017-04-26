var db = require('./config/back-end-config/db')
var bcrypt = require('./helpers/bcrypt')

db.models.user.create({
  name: 'fake',
  email: 'fake@fake.com',
  password: bcrypt.hashSync('fakefake'),
  role: 'superAdmin' // options: normal, superAdmin
}).then(() => {
}).catch((err) => {
  console.log(err)
})
