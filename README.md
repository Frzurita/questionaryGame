# Questionary game

> A webapp using node.js, sequelize, vue.js, firebase and heroku

- [Build setup](#build-setup)
- [Creating user](#creating-user)
- [Todo](#todo)

## Build setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run devGame

# back end serve at localhost:8000
npm run dev

# build for production with minification (mandatory if you deploy it in heroku)
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

```

## Creating user

A superAdmin user is able to access the admin panel.

It should be done changing the parameters of user in user_generator.js file:

```javascript
db.models.user.create({
  name: 'USER_NAME',
  email: 'USER_EMAIL',
  password: bcrypt.hashSync('USER_PASSWORD'),
  role: 'USER_ROLE' // options: normal, superAdmin
}).then(() => {
}).catch((err) => {
  console.log(err)
})
```
And then executing the next command

```
npm run createUser
```

## Todo

- Cover it with tests
- Create a better way to add users
