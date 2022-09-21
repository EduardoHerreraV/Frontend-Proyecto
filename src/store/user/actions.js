import { axiosInstance } from 'boot/axios'

import * as UserService from 'src/services/admin/UserService'

export function getUsers (context, payload) {
  UserService.index(payload).then((users) => {
    context.commit('setUsers', users)
  }).catch(() => {
  })
}

export function getCode (context, payload) {
  return UserService.getCode(payload).then((res) => {
    return res.code
  }).catch(() => {
  })
}

export function login (context, credentials) {
  const endPoint = '/api/login'
  return axiosInstance.post(endPoint, credentials)
    .then((res) => {
      const isAutenticated = res.data.authenticated
      if (isAutenticated) {
        const userData = res.data.user
        context.commit('setUserInformation', userData)
        window.sessionStorage.setItem('sci_token', res.data.sci_token)
        window.sessionStorage.setItem('sci_token_expiration', res.data.sci_token_expiration)
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${res.data.sci_token}`
      }
      return res.data
    }).catch(() => false)
}

export function verify (context, credentials) {
  const endPoint = '/api/verify'
  return axiosInstance.post(endPoint, credentials)
    .then((res) => {
      const isAuthenticated = res.data.authenticated
      if (isAuthenticated) {
        const userData = res.data.user
        context.commit('setUserInformation', userData)
        window.sessionStorage.setItem('sci', res.data.sci_token)
        window.sessionStorage.setItem('sci_token_expiration', res.data.sci_token_expiration)
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${res.data.sci_token}`
      }
      return res.data
    })
}

export function refreshInformation (context) {
  const endPoint = '/api/getUserInfo'
  axiosInstance.get(endPoint)
    .then((res) => {
      const userData = res.data.user
      context.commit('setUserInformation', userData)
    })
    .catch(() => {
      this.loadingState = false
    })
}

export function clearInformation (context) {
  const endPoint = '/api/logout'
  axiosInstance.get(endPoint)
    .then((response) => {
      context.commit('setUserInformation', {})
      window.sessionStorage.removeItem('sci_token_expiration')
      window.sessionStorage.removeItem('sci_token')
      window.sessionStorage.clear()
    })
    .catch(() => {
      this.loadingState = false
    })
}
