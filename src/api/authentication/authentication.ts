import { CredentialResponse } from '@react-oauth/google'
import axios from 'axios'
import { getAccessToken } from '../../lib/helper/authentication'
import { apiClient } from '..'

export async function logInWithGoogleOneTapApi(credentialResponse: CredentialResponse) {
  try {
    const credential: LogInWithGoogleOneTapRequest = {
      credential: credentialResponse.credential
    }
    const response = await apiClient.post<LogInWithGoogleOneTapResponse>('/auth/google/one-tap', {
      credential
    })
    return response
  } catch (error) {
    console.error(error)
    throw new Error('Login failed')
  }
}

export async function fetchUserInfo() {
  try {
    const response = await axios.get<UserInfoResponse>('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Failed to fetch user info: ', error)
    throw error
  }
}
