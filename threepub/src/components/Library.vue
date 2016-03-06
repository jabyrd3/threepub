<template>
  <div class="hello">
    <h1>Library</h1>
	<p v-if="token.length == 0"><a href="https://www.dropbox.com/1/oauth2/authorize?client_id=r31566z4sbecjsk&response_type=token&redirect_uri=http://localhost:8080/authed">db auth</a></p>
        <p v-else>
          ...fetching books... 
        </p>
  </div>
</template>

<script>
import state from '../state.js'
export default {
  data () {
    return {
      token: state.dropbox.token // state.dropbox.token.length > 0
    }
  },
  ready () {
    if (this.token) {
      console.log('there is a token')
    } else {
      console.log('nah breh')
    }
  }
}
</script>
