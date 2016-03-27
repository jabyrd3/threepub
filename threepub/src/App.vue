<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  import VueTouch from 'vue-touch'
  import RenderBook from './components/RenderBook'
  import Library from './components/Library'
  import Authed from './components/Authed'
  import state from './state'
  // import Dropbox from './components/Dropbox'
  export default {
    components: {
      RenderBook,
      Library
      // Dropbox
    }
  }
  window.onload = function () {
    Vue.use(VueTouch)
    Vue.use(VueRouter)
    var App = Vue.extend({})
    Vue.config.debug = true
    if (window.localStorage.getItem('threepub')) {
      state.seed()
    }
    var router = new VueRouter({hashbang: false, history: true})
    router.map({
      '/threepub': {
        name: 'library',
        component: Library
      },
      '/threepub/book': {
        name: 'book',
        component: RenderBook
      },
      '/threepub/authed': {
        component: Authed
      }
    })
    router.start(App, '#app')
  }
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px;
  maring: 0px;
  height: 100vh;
  width: 100vw;
}
iframe{
  height: 100vh;
  width: 100vw;
}
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
