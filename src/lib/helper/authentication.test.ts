import { Dispatch } from '@reduxjs/toolkit'
import {
  setAccessToken,
  getAccessToken,
  clearAccessToken,
  setRefreshToken,
  getRefreshToken,
  clearRefreshToken,
  clearAllTokens,
  logOut
} from './authentication'
import { logOutReducer } from '../redux/reducers/userState'
import { clearMessages } from '../redux/reducers/message'

jest.mock('../../api/authentication/authentication')

describe('Authentication Helper Functions', () => {
  let dispatch: Dispatch

  beforeEach(() => {
    dispatch = jest.fn()
    localStorage.clear()
  })

  test('setAccessToken and getAccessToken', () => {
    setAccessToken('test_token')
    expect(getAccessToken()).toBe('test_token')
  })

  test('clearAccessToken', () => {
    setAccessToken('test_token')
    clearAccessToken()
    expect(getAccessToken()).toBeNull()
  })

  test('setRefreshToken and getRefreshToken', () => {
    setRefreshToken('refresh_token')
    expect(getRefreshToken()).toBe('refresh_token')
  })

  test('clearRefreshToken', () => {
    setRefreshToken('refresh_token')
    clearRefreshToken()
    expect(getRefreshToken()).toBeNull()
  })

  test('clearAllTokens', () => {
    setAccessToken('test_token')
    setRefreshToken('refresh_token')
    clearAllTokens()
    expect(getAccessToken()).toBeNull()
    expect(getRefreshToken()).toBeNull()
  })

  test('logOut', () => {
    logOut(dispatch)
    expect(dispatch).toHaveBeenCalledWith(logOutReducer())
    expect(dispatch).toHaveBeenCalledWith(clearMessages())
  })
})
