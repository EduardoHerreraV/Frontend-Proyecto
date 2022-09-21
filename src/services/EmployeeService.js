import { axiosInstance } from 'boot/axios'

/* La nomenclatura sugerida es la siguiente

  * index: /api/user GET
  * get: /api/user/{id} GET
  * store: /api/user POST
  * update: /api/user PUT
  * destroy: /api/user DELETE
  * */
export const index = (payload) => {
  const URL = '/api/employees'
  return axiosInstance.get(URL, payload).then((res) => res.data.employees)
}

export const store = (payload) => {
  const URL = '/api/employees'
  return axiosInstance.post(URL, payload).then((res) => res.data.employee)
}

export const findUser = (payload) => {
  const URL = '/api/findUser'
  return axiosInstance.get(URL, payload).then((res) => res.data)
}

export const searchByRFC = (payload) => {
  const URL = '/api/search-by-rfc'
  return axiosInstance.get(URL, payload).then((res) => res.data)
}

export const checkPSPExistence = (payload) => {
  const URL = '/api/check-psp-existence'
  return axiosInstance.get(URL, payload).then((res) => res.data)
}

export const getTask = (payload) => {
  const URL = '/api/employees'
  return axiosInstance.get(URL, payload).then((res) => res.data.task)
}
