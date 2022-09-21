import { axiosInstance } from 'boot/axios'

export const index = (payload) => {
  const URL = '/api/task-assignments'
  return axiosInstance.get(URL, payload).then((res) => res.data.taskAssignments)
}
