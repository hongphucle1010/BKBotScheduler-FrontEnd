import axios from 'axios'
import { getToken } from '../lib/helper/authentication'
import { BACKEND_URL } from '../lib/helper/constant'

const host = BACKEND_URL

export const apiHost = `${host}/api`

export const apiClient = axios.create({
  baseURL: apiHost
})

apiClient.interceptors.request.use(
  (config) => {
    // Use the getToken function to retrieve the token
    const token = getToken()

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
