<template>
  <div>
    <p>you authed, token is {{token}}</p>
  </div>
</template>

<script>
import state from '../state'
export default {
  data () {
    return {
      token: ''
    }
  },
  ready () {
    var spilt = window.location.hash.substr(1, window.location.hash.length).split('=')
    this.token = state.dropbox.token = spilt[1].split('&')[0]
    state.dropbox.uid = spilt[spilt.length - 1]
    state.commit()
    console.log(this)
    window.setTimeout(() => {
      this.$router.go({name: 'library'})
    }, 500)
  }
}
</script>
