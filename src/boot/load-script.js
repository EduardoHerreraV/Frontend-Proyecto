import Vue from 'vue'
import LoadScript from 'vue-plugin-load-script'

Vue.use(LoadScript)

Vue.loadScript('FielUtil-1.2-min.js')
  .then(() => {
    // This is intentional
  })
  .catch(() => {
    // This is intentional
  })

Vue.loadScript('scan.js')
  .then(() => {
    // This is intentional
  })
  .catch(() => {
    // This is intentional
  })
