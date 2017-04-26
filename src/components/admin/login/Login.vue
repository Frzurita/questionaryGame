<template >
<div class="auth">
  <div class="forms">

    <login-form
    @finish="finish"
    />
  </div>
</div>

</template>

<script>
import { mapActions } from 'vuex'
import LoginForm from './LoginForm'

export default {
  name: 'auth',
  props: ['small', 'next', 'signupFirst'],
  data () {
    return {
      loginDisplayed: !this.signupFirst,
      isSmall: window.innerWidth < 600 || this.small,
      user: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions({
      changeModalDisplay: 'changeModalDisplay',
      retrieveCategories: 'retrieveCategories'
    }),
    handleResize () {
      this.isSmall = window.innerWidth < 600 || this.small
    },
    updateUser (user) {
      if (!this.isSmall) {
        this.user = user
      }
    },
    finish () {
      if (this.user.token) {
        this.$router.replace({name: 'manage'})
      }
    }
  },
  mounted () {
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.handleResize)
  },
  components: {
    LoginForm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
.auth {
  margin-top: 60px;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
}
.forms {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

</style>
