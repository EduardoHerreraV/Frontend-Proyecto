import Vue from 'vue'
import axios from 'axios'

const axiosInstance = axios.create({
  // baseURL: `${process.env.APP_BASE_URL}`,
  // baseURL: 'http://pspsystemtest.ddns.net:9000',
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json'
  }
})
/*
const pspToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTA1Y2U2MWM2MWYxNzhlYzhjNGY4ZTNmN2FjYWQ3OTMwMjc3MGNkODM4ODg3OTNjY2Q1YmI0MGM3YjE5MmI5NWVlZTFiMGI3NzJjNmY5NmUiLCJpYXQiOjE2NTM5MjQxNzcuNTUwNzYsIm5iZiI6MTY1MzkyNDE3Ny41NTA3NjYsImV4cCI6MTY4NTQ2MDE3Ny40Mjk4MzIsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.swZl59l-VJxz4SolWfqkw79vfFOxplSBhonyQbs5v16zO3oJzf0nAFnnW7VdOtFHrJoiE6aXl9XvbUm3Xar0chOoQtGAp0bqlnUPXAZ6HjXDHbnnxHmtZw6EAHWEiHeMkrgZMQGhUvt1jPg4TLCzADdcgHH9IOCGHwrWDw1yGDONOF0EstT3Hpyj-mDhtmU4v9uws0L-ZRuUoUFNJWsWDDh0o_lR5E5LRzjoYkZo-p3QAlp7F2IrNt4J4LyCe14Tp1e7IhXIu0PnTNiChbZx-kA8IimRokHqAdkt7Ez5sPoZYU9ZzWkKbr91aapTbwsqHV49jMwcQUUuOqWBrqnKDbk0sHdLNRP1-N0P-vuqjT9ahEKHG2CY2cwG91Ukc18hrCDOzKsczgBLEs4nirugPGv7-NwMhabiXSnlnkB7Ybzlbw5S9Nq6AtDy9L9hx-fSc7rvByohvdv1H3heQog8HCocFsG0HqxXBaNx6XviEmbdZdzI2faONrA5JTryChvBxL0cJwn5Ld7XT2pkFER0k4K3qCsB7agWSvQjHVF0ODEZgc3Z4tdfjKW58YUyoJgZuoTCsh_bQsSgQ3k-ZfASZ5Qv8e1wOywGZQNQQpTFMl578UpO_sDFx7wnEGNLo0kWxnZ2yCOvJIBFiTcOSKcyw-9RAUSr7L_3KgokBhwnsOA'
const axiosPSPInstance = axios.create({
  baseURL: 'http://pspsystemtest.ddns.net:9000',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${pspToken}`
  }
})
*/
const token = sessionStorage.getItem('sci_token')

if (token) {
  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`
    return config
  })
}

axiosInstance.interceptors.response.use(
  (response) => response,
  // eslint-disable-next-line consistent-return
  (error) => {
    if (error.response.status === 401) {
      sessionStorage.removeItem('sci_token')
      sessionStorage.removeItem('sci_token_expiration')
      window.location = '/login'
    } else {
      return Promise.reject(error)
    }
  }
)
// for use inside Vue files through this.$axios
Vue.prototype.$axios = axiosInstance
export { axiosInstance }
