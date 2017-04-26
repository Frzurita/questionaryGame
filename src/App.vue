<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'app',
  methods: {
    ...mapActions([
      'initSettings'
    ])
  },
  mounted () {
    this.initSettings()
  }
}
</script>

<style>
@font-face {
		font-family: Gotham-Book;
		src: url("/assets/fonts/Gotham-Book.otf") format('opentype');
  }

	@font-face {
		font-family: Gotham-Bold;
		font-weight: bold;
		src: url("/assets/fonts/Gotham-Bold.otf") format('opentype');
  }

  @font-face {
		font-family: Gotham-Light;
		font-weight: 100;
		src: url("/assets/fonts/Gotham-Light.otf") format('opentype');
  }

	@font-face {
		font-family: Gotham-Medium;
		src: url("/assets/fonts/Gotham-Medium.otf") format('opentype');
  }
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
