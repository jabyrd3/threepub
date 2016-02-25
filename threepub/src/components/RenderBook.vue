<template>

<div class="control" v-on:click="prevPage">
  <span>‹</span>
</div>
  <div class="catcher" v-touch:panleft="test"></div>
  <div class="epub" id="area">
  </div>
<div class="control" v-on:click="nextPage">
  <span>›</span>
</div>
</template>

<script>
import epub from 'epub.js/build/epub.js'
import book from '../../roadside.epub'
let Book
export default {
  data () {
    return {}
  },
  ready () {
    Book = epub(book)
    Book.renderTo('area')
  },
  methods: {
    test: function () {
      console.log('test')
      Book.nextPage()
    },
    prevPage: function () {
      Book.prevPage()
    },
    nextPage: function () {
      Book.nextPage()
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
</style>