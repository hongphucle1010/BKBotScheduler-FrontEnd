import { Dispatch } from '@reduxjs/toolkit'
import { logInWithGoogleApi, logInWithGoogleOneTapApi } from '../../api/authentication/authentication'
import { logInReducer, logOutReducer } from '../redux/reducers/userState'
import { CredentialResponse } from '@react-oauth/google'
import { clearMessages } from '../redux/reducers/message'
import { saveImageToIndexedDB, getImageFromIndexedDB, deleteImageFromIndexedDB } from './indexeddb'
import { clearGroup, setGroups } from '../redux/reducers/group'
import { getMyGroupsApi } from '../../api/group/group'
import { clearMessageHistoryApi } from '../../api/chatbot/chatbot'

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
  logInWithGoogleApi(code).then(async (userInfo) => {
    await saveImageToIndexedDB(userInfo.picture)
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
    getMyGroupsApi().then((groups) => {
      dispatch(setGroups(groups.groups))
    })
    // getMessageHistoryApi().then((messages) => {})
  })
}

/**
 * @deprecated
 */
export async function logInWithGoogleOneTap(credentialResponse: CredentialResponse, dispatch: Dispatch) {
  logInWithGoogleOneTapApi(credentialResponse).then(async (userInfo) => {
    if (!userInfo) return
    await saveImageToIndexedDB(userInfo.picture)
    const imageUrl = await getImageFromIndexedDB()
    dispatch(
      logInReducer({
        id: userInfo.id,
        name: userInfo.name,
        role: 'STUDENT',
        email: userInfo.email,
        avatar: imageUrl
      })
    )
    setAccessToken(userInfo.access_token)
    setRefreshToken(userInfo.refresh_token)
  })
}

export function logOut(dispatch: Dispatch) {
  dispatch(logOutReducer())
  dispatch(clearMessages())
  dispatch(clearGroup())
  deleteImageFromIndexedDB()
  clearMessageHistoryApi()
}
