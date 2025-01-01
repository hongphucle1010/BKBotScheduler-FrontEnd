import { Dispatch } from '@reduxjs/toolkit'
import { logInWithGoogleApi, logInWithGoogleOneTapApi } from '../../api/authentication/authentication'
import { logInReducer, logOutReducer } from '../redux/reducers/userState'
import { CredentialResponse } from '@react-oauth/google'
import { clearMessages } from '../redux/reducers/message'

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

export async function logInWithGoogle(code: string, dispatch: Dispatch) {
  logInWithGoogleApi(code).then((userInfo) => {
    console.log(userInfo)
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

/**
 * @deprecated
 */
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

export function logOut(dispatch: Dispatch) {
  dispatch(logOutReducer())
  dispatch(clearMessages())
}
