import { axiosInstance } from 'boot/axios'

/* La nomenclatura sugerida es la siguiente

  * index: /api/user GET
  * get: /api/user/{id} GET
  * store: /api/user POST
  * update: /api/user PUT
  * destroy: /api/user DELETE
  * */
const basePath = '/api/student'

export const index = (payload) => {
  const URL = basePath
  return axiosInstance.get(URL, payload).then((res) => res.data.student)
}
export const store = (payload) => {
  const URL = basePath
  return axiosInstance.post(URL, payload).then((res) => res.data)
}
export const edit = (id) => {
  const URL = `${basePath}/${id}/edit`
  return axiosInstance.get(URL).then((res) => res.data.student)
}

export const update = (payload, id) => {
  const URL = `${basePath}/${id}`
  return axiosInstance.put(URL, payload).then((res) => res.data)
}

export const destroy = (id) => {
  const URL = `${basePath}/${id}`
  return axiosInstance.delete(URL).then((res) => res.data)
}
