<template>
  <div class="hello">
    <h1>Library</h1>
	<p><a href="https://www.dropbox.com/1/oauth2/authorize?client_id=r31566z4sbecjsk&response_type=token&redirect_uri=http://localhost:8080/authed">db auth</a></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello Worl!'
    }
  }
}
</script>
