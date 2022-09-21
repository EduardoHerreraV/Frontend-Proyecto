import VueTour from 'vue-tour'

require('vue-tour/dist/vue-tour.css')

export default async ({ Vue }) => {
  Vue.use(VueTour)
}
