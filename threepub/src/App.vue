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
    var router = new VueRouter({hashbang: false, history: true})
    router.map({
      '/library': {
        name: 'library',
        component: Library
      },
      '/book': {
        component: RenderBook
      },
      '/authed': {
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
  height: 100%;
}

#app {
  margin-top: -100px;
  max-width: 600px;
  font-family: Helvetica, sans-serif;
  text-align: center;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
