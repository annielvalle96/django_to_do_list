import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/tasks/api/v1/tasks/'
})

export function getAllTasks () {
  return api.get('/')
}

export function getTask (id) {
  return api.get(`/${id}/`)
}

export function createTasks (task) {
  return api.post('/', task)
}

export function deleteTasks (id) {
  return api.delete(`/${id}`)
}

export function updateTasks (id, task) {
  return api.put(`/${id}/`, task)
}
