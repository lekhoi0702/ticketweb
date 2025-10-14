import axios from 'axios'

export const api = axios.create({
  baseURL: '/api'
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      // Let the app redirect by throwing the error
    }
    return Promise.reject(error)
  }
)

export async function login(payload) {
  const { data } = await api.post('/login/', payload)
  return data
}


