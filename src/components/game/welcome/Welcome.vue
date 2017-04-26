<template >
<div class="welcome">
  <div class="game_header">
    <div class="game_header_icon">
    </div>
    <div class="game_header_score">

    </div>
    <div class="game_header_sound" v-show="localUser.score">
      <span>Your Best Score: {{localUser.score}} MM €</span>
    </div>
  </div>
  <div class="game_content">
    <div class="game_title">
    </div>
    <div class="game_button" @click="$router.push({name: 'questions'})">
      START!
    </div>
    <div class="game_button" @click="$router.push({name: 'bestScored'})">
      BEST SCORES
    </div>
  </div>
  <div class="game_bottom">
    ©Glovo 2017 for II International <br>
    Glovo Hackaton
  </div>
</div>

</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'welcome',
  props: [],
  data () {
    return {
      audio: true,
      localUser: JSON.parse(localStorage.getItem('glovo_game_user')) || {}
    }
  },
  mounted () {
    this.initSettings()
  },
  methods: {
    ...mapActions([
      'initSettings'
    ])
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
</style>
