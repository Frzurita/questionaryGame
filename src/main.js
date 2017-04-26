// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VeeValidate from 'vee-validate'
import Materials from 'vue-materials'
import firebase from 'firebase'
import App from './App'
import router from './router'
import store from './store'

// CSS
import './styles/materialize.config.scss'

let config = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_FIREBASE_DOMAIN',
  databaseURL: 'YOUR_FIREBASE_DB',
  storageBucket: 'YOUR_FIREBASE_APP',
  messagingSenderId: 'YOUR_FIREBASE_ID'
}
firebase.initializeApp(config)
Vue.prototype.$firebase = firebase

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(Materials)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  component: App
})
