<template>
<div class="authForm" id="loginForm">
  <span class="login_title">Login</span>
  <input
    name="loginEmail"
    class="glovoInput emailInput"
    type="email"
    placeholder="hola@glovoapp.com"
    v-model="user.email" />
  <!-- <span v-show="errors.has('loginEmail') && showErrors" class="help is-danger">{{ errors.first('loginEmail') }}</span> -->
  <input
    name="loginPassword"
    class="glovoInput passwordInput"
    type="password"
    placeholder="*******"
    v-model="user.password" />
  <!-- <span v-show="errors.has('loginPassword') && showErrors" class="help is-danger">{{ errors.first('loginPassword') }}</span> -->
  <span id="forgotLink" class="hint link" >Cannot login?</span>

  <div
    class="formButton loginButton btn"
    @click="login"
    >
    Login
    <v-progress-circular small yellow :class="{'active': callInProgress}" class="circ_progress" />
  </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { auth } from 'api'
import store from 'models/Storage'

export default {
  name: 'loginForm',
  props: ['small', 'sharedUser'],
  data () {
    return {
      showErrors: false,
      callInProgress: false,
      user: {
        email: this.user ? this.user.email : '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    ...mapActions({
      authLogin: 'login'
    }),
    login (token) {
      const ctx = this
      if (this.callInProgress) {
        return
      }

      this.callInProgress = true
      let credentials = {
        email: this.user.email,
        password: this.user.password
      }
      auth.token(credentials)
      .then(function (res) {
        const token = res.token
        store.set(store.items.AUTH, token)
        ctx.callInProgress = false
        ctx.$router.replace({name: 'manage'})
      })
      .catch(function (err, res) {
        console.log('err:', res)
        console.log(err)
        ctx.callInProgress = false
      })
    }
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">

.circ_progress {
  max-height: 26px;
  max-width: 26px;
    position: absolute;
    right: 10px;
    top: 4px;
}

.login_title {
  font-size: 25px
}

.authForm {
  width: 300px;
  display: flex;
  flex-direction: column;
  margin: 0px 40px;
}

.formButton {
  margin-top: 20px;
  border-radius: 6px;
  position:relative;
  margin-bottom: 10px;
}


.hint {
  font-size: 12px;
}

.link {
  margin-top:5px;
  text-decoration: underline;
  cursor: pointer;
}

.help {
  font-size: 12px;
  color: red;
  text-align: left;
  margin-bottom: 10px;
}
</style>
