import { Dispatch } from '@reduxjs/toolkit'
import { logInWithGoogleApi, logInWithGoogleOneTapApi } from '../../api/authentication/authentication'
import { logInReducer } from '../redux/reducers/userState'
import { GoogleLoginCodeResponse } from '../../api/authentication/types'
import { CredentialResponse } from '@react-oauth/google'

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

export function clearAllTokens() {
  clearAccessToken()
  clearRefreshToken()
}

export async function logInWithGoogle(codeResponse: GoogleLoginCodeResponse, dispatch: Dispatch) {
  logInWithGoogleApi(codeResponse.access_token).then((userInfo) => {
    dispatch(
      logInReducer({
        id: userInfo.id,
        name: userInfo.name,
        role: 'STUDENT',
        email: userInfo.email,
        avatar: userInfo.picture
      })
    )
    setAccessToken(userInfo.access_token)
    setRefreshToken(userInfo.refresh_token)
  })
}

export async function logInWithGoogleOneTap(credentialResponse: CredentialResponse, dispatch: Dispatch) {
  logInWithGoogleOneTapApi(credentialResponse).then((userInfo) => {
    if (!userInfo) return
    dispatch(
      logInReducer({
        id: userInfo.id,
        name: userInfo.name,
        role: 'STUDENT',
        email: userInfo.email,
        avatar: userInfo.picture
      })
    )
    setAccessToken(userInfo.access_token)
    setRefreshToken(userInfo.refresh_token)
  })
}
