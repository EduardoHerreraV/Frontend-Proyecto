import { axiosInstance } from 'boot/axios'

export const index = (payload) => {
  const URL = '/api/task'
  return axiosInstance.get(URL, payload).then((res) => res.data.task)
}

export const getUnasignatedTasks = (payload) => {
  const URL = '/api/unasignated-tasks'
  return axiosInstance.get(URL, payload).then((res) => res.data.tasks)
}

export const store = (payload) => {
  const URL = '/api/task'
  return axiosInstance.post(URL, payload).then((res) => res.data)
}

export const destroy = (id) => {
  const URL = `/api/task/${id}`
  return axiosInstance.delete(URL).then((res) => res.data)
}

export const edit = (id) => {
  const URL = `/api/task/${id}/edit`
  return axiosInstance.get(URL).then((res) => res.data.task)
}

export const update = (payload, id) => {
  const URL = `/api/task/${id}`
  return axiosInstance.put(URL, payload).then((res) => res.data)
}

export const binnacle = (payload) => {
  const URL = '/api/m-data-task'
  /* const params = {
    params: { task: 11 }
  } */
  return axiosInstance.get(URL, payload).then((res) => res.data)
}
