<template>
  <div class="hello">
    <h1>Library</h1>
	<p v-if="token.length == 0"><a href="https://www.dropbox.com/1/oauth2/authorize?client_id=r31566z4sbecjsk&response_type=token&redirect_uri=https://jordanbyrd.com/threepub/authed">db auth</a></p>
        <div v-if="files.length > 0">
          <ul>
            <li v-for="file in files" >
              <span v-on:click="fetchBookLink(file)">{{file.name}}</span>
            </li> 
          </ul> 
        </div>
        <p v-if="token && files.length === 0">
          ...fetching books... 
        </p>
  </div>
</template>

<script>
import state from '../state.js'
import panniers from '../assets/panniers.js/panniers.js'
export default {
  data () {
    return {
      token: state.dropbox.token,
      files: []
    }
  },
  ready () {
    if (this.token) {
      let panny = panniers({
        apiUrl: state.dropbox.apiUrl + '2',
        token: state.dropbox.token
      })
      console.log('there is a token')
      panny
        .files()
        .list_folder()
        .post({
          path: ''
        })
        .then(res => {
          console.log(res)
          this.files = res.response.entries
        })
        .catch()
      this.fetchBookLink = (file) => {
        panny
          .sharing()
          .create_shared_link_with_settings()
          .post({
            path: file.path_display
          }).then((res) => {
            console.log(res)
            state.currentBook = res.response
            this.$router.go({
              name: 'book'
            })
          })
      }
    } else {
      console.log('nah breh')
    }
  }
}
</script>
