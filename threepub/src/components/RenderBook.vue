<template>
  <div v-if="settings.turnMode === 'press'" class="control" v-on:="prevPage">
    <span>‹</span>
  </div>
  <controls v-show="controls" transition="slide"></controls>
  <div 
    v-if="settings.turnMode === 'swipe'" 
    class="catcher" 
    v-touch:swipeleft="nextPage" 
    v-touch:swiperight="prevPage" 
    v-touch:tap="toggleControls"></div>
  <div 
    v-if="settings.turnMode !== 'swipe'" 
    class="catcher" 
    v-touch:tap="toggleControls"></div>
  <div class="epub" id="area"></div>
  <div v-if="settings.turnMode === 'press'" class="control" v-on:click="nextPage">
    <span>›</span>
  </div>
</template>

<script>
import epub from 'epub.js/build/epub.js'
import state from '../state'
// import book from '../../roadside.epub'
import Controls from './Controls'
// import panniers from '../assets/panniers.js/panniers.js'
// console.log(panniers({apiUrl: 'http://google.com'}).get().then(res => { console.log(res) }))
let Book
export default {
  data () {
    return {
      controls: state.controls,
      settings: state.settings
    }
  },
  ready () {
    console.log(this)
    Book = epub(this.$route.params.link)
    Book.renderTo('area')
  },
  components: {
    Controls
  },
  methods: {
    test: function () {
      Book.nextPage()
    },
    prevPage: function () {
      Book.prevPage()
    },
    nextPage: function () {
      Book.nextPage()
    },
    toggleControls: function () {
      this.controls = !this.controls
    }
  }
}
</script>
<style type="text/css">
  .catcher{
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    right:0;
    z-index:1000;
  }
  iframe{
    position: fixed;
    height: 90vh;
    width: 90vw;
    margin-left: 5vw;
    margin-top: 5vw;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
  } 
  .control{
    position: absolute;
    top: 0;
    z-index: 1001;
    font-size: 38px;
    font-weight: bold;
    background-color: #666;
    color: white;
    font-weight: bold;
    height: 100vh;
    text-align: center;
  }
  .control:first-of-type{
    left: 0;
  }
  .control:last-of-type{
    right: 0;
  }
  .slide-transition{
    transition: all .3s ease;
    overflow: hidden;
    top: 0;
  }
  .slide-enter, .slide-leave{
    top:-20vh!important;
  }
</style>
