import { axiosInstance } from 'boot/axios'

export const store = (payload) => {
  const URL = '/api/task-status'
  return axiosInstance.post(URL, payload).then((res) => res.data)
}

export const edit = (id) => {
  const URL = `/api/task-status/${id}/status`
  return axiosInstance.get(URL).then((res) => res.data.status)
}

export const getStatus = (id) => {
  const URL = `/api/task-status/${id}`
  return axiosInstance.get(URL).then((res) => res.data.status)
}
