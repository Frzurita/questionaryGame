<template>
<div>
  <div class="admin_section">
    <span>Admin panel</span>
    <div v-if="authenticated" class="logout" @click="logout()">
      Logout
    </div>
  </div>
  <div class="admin_view">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import store from 'models/Storage'
import Login from './login/Login'
import Manage from './manage/Manage'

export default {
  name: 'webapp',
  data () {
    return {}
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    logout () {
      store.remove(store.items.AUTH)
      this.logout()
      this.$router.push({name: 'game'})
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters([
      'authenticated'
    ])
  },
  components: {
    Login,
    Manage
  }
}
</script>


<style lang="stylus" rel="stylesheet/stylus">
.logout {
  position: absolute;
  top: 20px;
  right: 40px;
}
.glovo_btn.btn_homepage {
    font-size: 16px;
    background-color: #fdcf54;
}
.glovo_btn
    outline none
    background-color: #fdcf54;
    font-weight: 700;
    font-size: 20px;
    border: 0;
    color: #fff;
    cursor: pointer;
    text-transform: uppercase;
    btn-size: 60 32 auto;
    status-size: 32px 60px;
    display: -webkit-box;
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-flex: 0;
    flex: 0 auto;
    -webkit-box-align: center;
    align-items: center;
.admin
  &_section span
    position: relative
    margin 0
    font-size 30px
  &_view
    min-height 100vh
    width 100%
.image_preview{
  width: 80px;
  height: 120px;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
