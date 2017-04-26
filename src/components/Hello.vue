<template>
  <div class="hello">
    <div v-for="example in examples">
      <h1>{{ example.title }}</h1>
      <h2>{{ example.description }}</h2>
    </div>
    <div class="button" @click="createNewOne()">
      Create a New one
    </div>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
import { helloWorld } from 'api'
export default {
  name: 'hello',
  data () {
    return {
      examples: []
    }
  },
  mounted () {
    this.sayHello()
  },
  methods: {
    createNewOne () {
      const ctx = this
      helloWorld.create().then(() => {
        ctx.sayHello()
      })
    },
    sayHello () {
      const ctx = this
      helloWorld.helloWorld().then((res) => {
        this.examples = res
      }).catch((error) => {
        console.log(error)
        ctx.msg = error
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button {
  cursor: pointer;
  width: 140px;
  color: white;
  margin: 0 auto;
  border-radius: 4px;
  background-color: #b2b2b2;
  padding: 10px 20px;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
