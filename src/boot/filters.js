const moneyConfig = { style: 'currency', currency: 'MXN' }
const MONTHS = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

export default ({ Vue }) => {
  Vue.filter('readableDate', (value) => {
    const date = new Date(value)
    if (date !== null || date !== undefined) {
      return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getFullYear()}`
    }
    return ''
  })

  Vue.filter('readableDateTime', (value) => {
    const date = new Date(value)
    if (date !== null || date !== undefined) {
      return `${MONTHS[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getFullYear()} ${date.toLocaleTimeString()}`
    }
    return ''
  })

  Vue.filter('moneyFilter', (number) => new Intl.NumberFormat('es-MX', moneyConfig).format(number))

  Vue.filter('monthName', (value) => MONTHS[value - 1])

  Vue.filter('acronymFilter', (string) => {
    if (string != null && string !== '') {
      return string.match(/\b([A-Z])/g).join('')
    }
    return ''
  })
}
