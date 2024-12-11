import { TokenResponse } from '@react-oauth/google'
import { Dispatch } from '@reduxjs/toolkit'
import { fetchUserInfo } from '../../api/authentication/authentication'
import { logInReducer } from '../redux/reducers/userState'

export function setAccessToken(token: string) {
  localStorage.setItem('accessToken', token)
}

export function getAccessToken() {
  return localStorage.getItem('accessToken')
}

export function clearAccessToken() {
  localStorage.removeItem('accessToken')
}

export function setRefreshToken(token: string) {
  localStorage.setItem('refreshToken', token)
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken')
}

export function clearRefreshToken() {
  localStorage.removeItem('refreshToken')
}

export async function logInWithGoogle(
  codeResponse: Omit<TokenResponse, 'error' | 'error_description' | 'error_uri'>,
  dispatch: Dispatch
) {
  setAccessToken(codeResponse.access_token)
  fetchUserInfo().then((userInfo) => {
    console.log('User info:', userInfo)
    dispatch(
      logInReducer({
        id: userInfo.id,
        name: userInfo.name,
        role: 'STUDENT',
        email: userInfo.email,
        avatar: userInfo.picture
      })
    )
  })
}
