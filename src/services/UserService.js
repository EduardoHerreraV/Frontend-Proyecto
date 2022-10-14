import { axiosInstance } from 'boot/axios'

/* La nomenclatura sugerida es la siguiente

  * index: /api/user GET
  * get: /api/user/{id} GET
  * store: /api/user POST
  * update: /api/user PUT
  * destroy: /api/user DELETE
  * */
const basePath = '/api/user'

export const index = (payload) => {
  const URL = basePath
  return axiosInstance.get(URL, payload).then((res) => res.data.user)
}

export const store = (payload) => {
  const URL = basePath
  return axiosInstance.post(URL, payload).then((res) => res.data)
}

export const edit = (id) => {
  const URL = `${basePath}/${id}/edit`
  return axiosInstance.get(URL).then((res) => res.data.user)
}

export const update = (payload, id) => {
  const URL = `${basePath}/${id}`
  return axiosInstance.put(URL, payload).then((res) => res.data)
}

export const destroy = (id) => {
  const URL = `${basePath}/${id}`
  return axiosInstance.delete(URL).then((res) => res.data)
}

export const updatePasswordUser = (payload) => {
  const URL = '/api/users/update-password-user'
  return axiosInstance.put(URL, payload).then((res) => res.data)
}
