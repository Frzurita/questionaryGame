<template>
	<div class="icon" :style="{ backgroundImage: source }"/>
</template>

<script>
  import {buildSmartUrl} from 'models/Images'
  export default {
    name: 'icon',
    props: ['name', 'url', 'extension', 'origin'],
    data () {
      return {
        source: '',
        defaultExtension: 'svg'
      }
    },
    computed: {
      iconName () {
        return this.name
      }
    },
    mounted () {
      this.initIcon()
    },
    updated () {
      this.initIcon()
    },
    methods: {
      initIcon () {
        const _extension = this.extension ? this.extension : this.defaultExtension
        let _source = 'url('
        if (this.url) {
          if (this.origin) {
            _source += buildSmartUrl(this.url, this.origin, 'h_100,w_100,c_fill')
          } else {
            _source += this.url
          }
        } else {
          // _source += cloudinaryCDN
          _source += '/assets/icons/' + _extension + '/'
          _source += this.iconName + '.' + _extension
        }
        _source += ')'
        this.source = _source
      }
    }
}
</script>
<style lang="stylus">
	.icon
		width 20px
		height 20px
		background-repeat no-repeat
		background-size contain
</style>
