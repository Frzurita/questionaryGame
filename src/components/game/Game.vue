<template >
<div class="game">
  <audio ref="audio" id="audio" src="/assets/glover_life.m4a" preload="auto" loop></audio>
  <router-view></router-view>
</div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'game',
  props: [],
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'sound'
    ]),
    initialSound () {
      if (this.sound === 'play') {
        this.$refs.audio.pause()
      } else {
        this.$refs.audio.play()
      }
    }
  },
  mounted () {
    document.getElementById('audio').play()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss">
.game {
  padding: 0;
  margin: 0;
  background-image: url('/assets/background.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  &_header {
    z-index: 5;
    position: fixed;
    top: 0;
    display: flex;
    width: 100vw;
    justify-content: space-between;
    &_icon {
      margin: 10px;
      height: 40px;
      width: 40px;
      background-image: url('/assets/icons/svg/glovo_yellow.svg');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
    &_sound {
      margin: 10px;
      height: 40px;
      width: auto;
      color: white;
      font-family: Gotham-Medium;
    }
  }
  &_phantom {
    position: absolute;
    background-color: #40b39c;
    width: 100%;
    min-height: 100%;
    opacity: 0.3;
  }
  &_content {
    position: relative;
    width: 90%;
    max-width: 600px;
    height: 80%;
    max-height: 800px;
  }
  &_title {
    width: 80%;
    height: 15%;
    min-height: 200px;
    max-height: 100px;
    background-image: url('/assets/icons/svg/crazy_title.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    margin: 0 auto;
    margin-bottom: 5em;
  }
  &_button {
    cursor: pointer;
    background-image: url('/assets/icons/svg/gradient.svg');
    width: 60%;
    margin: 1em auto;
    padding: 3px;
    font-family: Gotham-Medium;
    font-size: 30px;
  }

  &_bottom {
    position: absolute;
    width: 100vw;
    text-align: center;
    bottom: 15px;
    color: white;
  }

}

</style>
