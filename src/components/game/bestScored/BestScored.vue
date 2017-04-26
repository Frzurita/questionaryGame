<template >
<div class="welcome bestScored">
  <div class="game_header">
    <div class="game_header_icon">
    </div>
    <div class="game_header_score">

    </div>
    <div class="game_header_sound" v-show="localUser.score">
      <span>Your Best Score: {{localUser.score}} MM €</span>
    </div>
  </div>
  <div class="bestScored_title">
    List of Scores:
  </div>
  <div class="loading_wrapper" v-if="users.length === 0">
      <v-progress-circular  small yellow active class="circ_progress" ></v-progress-circular>
  </div>
  <div class="game_button bestScored_back" @click.stop="$router.push({name: 'welcome'})">
    BACK TO START
  </div>
  <div class="bestScored_list" v-if="users.length > 0">
    <div class="" v-for="(user, index) in users">
      <div class="bestScored_item" :class="{'bestScored_item_yellow': user[2] === localUser.id}">
        <div class="">
          {{index + 1}}º {{user[0]}}
        </div>
        <div class="dotted_fill" :class="{'dotted_fill_yellow': user[2] === localUser.id}">
        </div>
        <div class="">
          {{user[1]}} MM €
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'bestScore',
  props: [],
  data () {
    return {
      audio: true,
      players: '',
      localUser: JSON.parse(localStorage.getItem('glovo_game_user')) || {},
      users: []
    }
  },
  mounted () {
    let db = this.$firebase.database()
    this.players = db.ref('players/')
    this.setFirebaseListeners()
  },
  methods: {
    ...mapActions([
      'initSettings'
    ]),
    setFirebaseListeners () {
      const ctx = this
      this.players.on('value', function (snap) {
        ctx.users = []
        let hash = snap.val()
        for (let key in hash) {
          ctx.users.push([hash[key].name, hash[key].score, hash[key].id])
        }
        ctx.users.sort(function (a, b) {
          return b[1] - a[1]
        })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
  .welcome {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100vw;
    min-height: 100vh;
  }
  .bestScored {
    justify-content: flex-start!important;
    padding-top: 60px;
    &_title {
      color: white;
      font-size: 30px;
      margin-top: 3em;
    }
    &_list {
      padding: 5px;
      background-color: transparent;
      display: flex;
      flex-direction: column;
      min-width: 320px;
      max-width: 600px;
      width: 95%;
    }
    &_item {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      color: white!important;
      font-size: 25px;
      font-family: Gotham-Medium;
      @media(max-width: 600px) {
        font-size: 20px;
      }
      &_yellow {
        color: #f2cc38!important
      }
    }
    &_back {
      z-index: 10;
      position: absolute;
      top: 41px;
      max-width: 250px;
      font-size: 18px!important;
    }
  }
  .game_title {
    @media(max-width: 600px) {
      margin-bottom: 1em;
    }
  }
  .game_button {
    @media(max-width: 600px) {
      font-size: 22px;
    }
  }
  .dotted_fill{
    flex: 1;
    background: radial-gradient(rgba(255,255,255,1) 10%, transparent 10%);
    background-size: 5px 6px;
    height: 4px;
    background-repeat: repeat-x;
    padding-bottom: 14px;
    &_yellow {
      background: radial-gradient(rgba(242,204,56,1) 10%, transparent 10%);
      background-size: 5px 6px;
      height: 4px;
      background-repeat: repeat-x;
      padding-bottom: 14px;
    }
  }
  .loading_wrapper {
    margin-top: 4em;
  }
</style>
