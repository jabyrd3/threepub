<template>
  <div id="app">
    <render-book ></render-book>
  </div>
</template>

<script>
// import rsvp from 'rsvp/dist/rsvp.min.js'
// import localforage from 'epub.js/build/libs/localforage.min.js'
// window.RSVP = rsvp
// window.localforage = localforage
import RenderBook from './components/RenderBook'
import Vue from 'vue'
import VueTouch from 'vue-touch'
Vue.use(VueTouch)
export default {
  components: {
    RenderBook
  }
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
