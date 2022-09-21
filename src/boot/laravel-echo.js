import Echo from 'laravel-echo'

window.Pusher = require('pusher-js')

const echo = new Echo({
  broadcaster: 'pusher',
  key: process.env.VUE_APP_WEBSOCKETS_KEY,
  wsHost: process.env.VUE_APP_WEBSOCKETS_SERVER,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  enabledTransports: ['ws', 'wss']
})

export default ({ Vue }) => {
  Vue.prototype.$echo = echo
}
