import { Notify } from 'quasar'
import { i18n } from 'boot/i18n'

const notifyOptionsSuccess = {
  icon: 'sentiment_satisfied',
  position: 'bottom-right',
  textColor: 'white',
  color: 'positive'
}

const notifyOptionsError = {
  icon: 'sentiment_dissatisfied',
  position: 'bottom-right',
  textColor: 'white',
  color: 'negative'
}

export const notifySuccess = (message) => {
  Notify.create({
    ...notifyOptionsSuccess,
    message: message !== undefined ? message : i18n.messages[i18n.locale].success
  })
}

export const notifyError = (message) => {
  Notify.create({
    ...notifyOptionsError,
    message: message !== undefined ? message : i18n.messages[i18n.locale].error
  })
}
