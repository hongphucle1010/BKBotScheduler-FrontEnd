import { logInWithGoogle, logInWithGoogleOneTap, logOut } from '../../lib/helper/authentication'
import * as authenticationApi from '../../api/authentication/authentication'
import { logInReducer, logOutReducer } from '../../lib/redux/reducers/userState'
import { clearMessages } from '../../lib/redux/reducers/message'

jest.mock('../../api/authentication/authentication')
jest.mock('../../lib/redux/reducers/userState')
jest.mock('../../lib/redux/reducers/message')

describe('Authentication Functions', () => {
  const dispatch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  test('logInWithGoogle should dispatch logInReducer and set tokens', async () => {
    const mockUserInfo = {
      id: '123',
      name: 'Test User',
      email: 'test@example.com',
      picture: 'avatar.png',
      access_token: 'access123',
      refresh_token: 'refresh123'
    }

    authenticationApi.logInWithGoogleApi.mockResolvedValue(mockUserInfo)

    await logInWithGoogle({ access_token: 'google_access' }, dispatch)

    expect(authenticationApi.logInWithGoogleApi).toHaveBeenCalledWith('google_access')
    expect(dispatch).toHaveBeenCalledWith(
      logInReducer({
        id: mockUserInfo.id,
        name: mockUserInfo.name,
        role: 'STUDENT',
        email: mockUserInfo.email,
        avatar: mockUserInfo.picture
      })
    )
    expect(localStorage.getItem('accessToken')).toBe('access123')
    expect(localStorage.getItem('refreshToken')).toBe('refresh123')
  })

  test('logInWithGoogleOneTap should dispatch logInReducer and set tokens', async () => {
    const mockUserInfo = {
      id: '456',
      name: 'One Tap User',
      email: 'onetap@example.com',
      picture: 'avatar2.png',
      access_token: 'access456',
      refresh_token: 'refresh456'
    }

    authenticationApi.logInWithGoogleOneTapApi.mockResolvedValue(mockUserInfo)

    await logInWithGoogleOneTap({ credential: 'credential123' }, dispatch)

    expect(authenticationApi.logInWithGoogleOneTapApi).toHaveBeenCalledWith({ credential: 'credential123' })
    expect(dispatch).toHaveBeenCalledWith(
      logInReducer({
        id: mockUserInfo.id,
        name: mockUserInfo.name,
        role: 'STUDENT',
        email: mockUserInfo.email,
        avatar: mockUserInfo.picture
      })
    )
    expect(localStorage.getItem('accessToken')).toBe('access456')
    expect(localStorage.getItem('refreshToken')).toBe('refresh456')
  })

  test('logOut should dispatch logOutReducer and clear messages', () => {
    logOut(dispatch)

    expect(dispatch).toHaveBeenCalledWith(logOutReducer())
    expect(dispatch).toHaveBeenCalledWith(clearMessages())
    expect(localStorage.getItem('accessToken')).toBeNull()
    expect(localStorage.getItem('refreshToken')).toBeNull()
  })
})
