import { axiosInstance } from 'boot/axios'

export const index = (payload) => {
  const URL = '/api/initiative'
  return axiosInstance.get(URL, payload).then((res) => res.data.initiative)
}

export const store = (payload) => {
  const URL = '/api/initiative'
  return axiosInstance.post(URL, payload).then((res) => res.data)
}

export const destroy = (id) => {
  const URL = `/api/initiative/${id}`
  return axiosInstance.delete(URL).then((res) => res.data)
}

export const destroyRepository = (id) => {
  const URL = `/api/repository/${id}`
  return axiosInstance.delete(URL).then((res) => res.data)
}

export const destroyKnowledge = (id) => {
  const URL = `/api/knowledge/${id}`
  return axiosInstance.delete(URL).then((res) => res.data)
}

export const edit = (id) => {
  const URL = `/api/initiative/${id}/edit`
  return axiosInstance.get(URL).then((res) => res.data.initiative)
}

export const update = (payload, id) => {
  const URL = `/api/initiative/${id}`
  return axiosInstance.put(URL, payload).then((res) => res.data)
}

export const getTecnology = (payload) => {
  const URL = '/api/unasignated-technologies'
  return axiosInstance.get(URL, payload).then((res) => res.data.technologies)
}
