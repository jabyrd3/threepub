<template>

<div class="control" v-on:click="prevPage">‹</div>
  <div class="epub" id="area">
  </div>
<div class="control" v-on:click="nextPage">›</div>
</template>

<script>
import epub from 'epub.js/build/epub.js'
import book from 'epub.js/books/alice.epub'
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
    z-index: 1000;

  }
  .control:first-of-type{
    left: 0;
  }
  .control:last-of-type{
    right: 0;
  }
</style>