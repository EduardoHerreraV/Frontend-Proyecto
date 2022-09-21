import { axiosInstance } from 'boot/axios'

/* La nomenclatura sugerida es la siguiente

  * index: /api/user GET
  * get: /api/user/{id} GET
  * store: /api/user POST
  * update: /api/user PUT
  * destroy: /api/user DELETE
  * */
export const index = (payload) => {
  const URL = '/api/project'
  return axiosInstance.get(URL, payload).then((res) => res.data.project)
}

export const store = (payload) => {
  const URL = '/api/project'
  return axiosInstance.post(URL, payload).then((res) => res.data)
}

export const edit = (id) => {
  const URL = `/api/project/${id}/edit`
  return axiosInstance.get(URL).then((res) => res.data.project)
}

export const update = (payload, id) => {
  const URL = `/api/project/${id}`
  return axiosInstance.put(URL, payload).then((res) => res.data)
}

export const destroy = (id) => {
  const URL = `/api/project/${id}`
  return axiosInstance.delete(URL).then((res) => res.data)
}
