export default {
  controls: false,
  book: 'roadside.epub',
  settings: {
    turnMode: 'swipe'
  },
  dropbox: {
    apiUrl: 'https://api.dropboxapi.com/',
    token: ''
  },
  commit () {
    window.localStorage.setItem('threepub', JSON.stringify(this))
  },
  seed () {
    this.dropbox = JSON.parse(window.localStorage.getItem('threepub')).dropbox
  }
}
