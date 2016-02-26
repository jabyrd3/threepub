<template>
  <div class="controls">
      <button v-on:click="toggleTurnMode">turnmode</button>
  </div>
</template>

<script>
import state from '../state'
export default {
  data () {
    return {
      settings: state.settings
    }
  },
  ready () {
  },
  methods: {
    toggleTurnMode: function () {
      this.settings.turnMode === 'swipe' ? this.settings.turnMode = 'press' : this.settings.turnMode = 'swipe'
    }
  }
}
</script>
<style type="text/css">
    .controls{
        height: 20vh;
        position: fixed;
        top:0px;
        background-color: #666;
        width: 100vw;
        left: 0;
        z-index: 1002;
        color: white;
    }
</style>