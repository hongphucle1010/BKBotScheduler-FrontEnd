import axios from 'axios'
import { BACKEND_URL } from '../lib/helper/constant'
import { getAccessToken, setAccessToken, getRefreshToken } from '../lib/helper/authentication'
import { RefreshTokenRequest, RefreshTokenResponse } from './types'

const host = BACKEND_URL

export const apiHost = `${host}`

export const apiClient = axios.create({
  baseURL: apiHost,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken() // use helper function to get access token
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}` // set in header
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = getRefreshToken() // use helper function to get refresh token
      if (refreshToken) {
        try {
          const response = await axios.post<RefreshTokenResponse>(`${apiHost}/auth/refreshToken`, {
            refreshToken
          } as RefreshTokenRequest)
          // don't use axios instance that already configured for refresh token api call
          const newAccessToken = response.data.access_token
          setAccessToken(newAccessToken) // use helper function to set new access token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return axios(originalRequest) // recall API with new token
        } catch (error) {
          // Handle token refresh failure
          // mostly logout the user and re-authenticate by login again
          console.error('Token refresh failed', error)
          throw Error(REFRESH_TOKEN_EXPIRED)
        }
      }
    }
    return Promise.reject(error)
  }
)

export const REFRESH_TOKEN_EXPIRED = 'REFRESH_TOKEN_EXPIRED'
