import { CredentialResponse } from '@react-oauth/google'
import axios, { AxiosError } from 'axios'
import { LogInWithGoogleOneTapRequest, LogInWithGoogleResponse, UserInfoResponse } from './types'
// import { GoogleAuthPayload } from './types'
// import { jwtDecode } from 'jwt-decode'
import { apiClient } from '..'

export async function logInWithGoogleOneTapApi(credentialResponse: CredentialResponse) {
  try {
    const credential: LogInWithGoogleOneTapRequest = {
      credential: credentialResponse.credential
    }
    const response = await apiClient.post<LogInWithGoogleResponse>('/auth/google/one-tap', {
      credential
    })
    // const fakeApi = async (credential: LogInWithGoogleOneTapRequest): Promise<LogInWithGoogleResponse | null> => {
    //   console.log(credential.credential && jwtDecode(credential.credential))
    //   const decodePayload = credential.credential ? jwtDecode<GoogleAuthPayload>(credential.credential) : null
    //   if (!decodePayload) return null
    //   return {
    //     id: '123',
    //     access_token: '',
    //     refresh_token: '',
    //     email: decodePayload.email,
    //     verified_email: decodePayload.email_verified,
    //     name: decodePayload.name,
    //     given_name: decodePayload.given_name,
    //     family_name: decodePayload.family_name,
    //     picture: decodePayload.picture,
    //     hd: decodePayload.hd
    //   }
    // }
    // const response = await fakeApi(credential  )
    return response
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error: ', error)
      throw new Error(error.response?.data)
    } else console.error(error)
    throw new Error('Login failed')
  }
}

export async function logInWithGoogleApi(access_token: string) {
  try {
    const response = await apiClient.get<LogInWithGoogleResponse>('/auth/google?token=' + access_token)
    // const response: LogInWithGoogleResponse = await fetchUserInfo(access_token)
    return response
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error: ', error)
      throw new Error(error.response?.data)
    } else console.error(error)
    throw new Error('Login failed')
  }
}

export async function fetchUserInfo(access_token: string) {
  try {
    const response = await axios.get<UserInfoResponse>('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    const responseWithToken: LogInWithGoogleResponse = { ...response.data, access_token, refresh_token: '' }
    return responseWithToken
  } catch (error) {
    console.error('Failed to fetch user info: ', error)
    throw error
  }
}
