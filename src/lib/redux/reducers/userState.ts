import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Role, User } from './types'
import { clearAllTokens } from '../../helper/authentication'

interface AuthorizationState {
  value: {
    id: string
    name: string
    role: Role
    email: string
    avatar: string
  }
}

const authorization = createSlice({
  name: 'authorization',
  initialState: {
    value: {
      id: '',
      name: '',
      role: 'GUEST' as Role,
      email: '',
      avatar: ''
    }
  },
  reducers: {
    logOutReducer: (state: AuthorizationState) => {
      state.value.id = ''
      state.value.name = ''
      state.value.role = 'GUEST'
      state.value.email = ''
      state.value.avatar = ''
      clearAllTokens()
      window.location.href = '/'
    },
    logInReducer: (state: AuthorizationState, action: PayloadAction<User>) => {
      state.value = action.payload
    }
  }
})

export const { logOutReducer, logInReducer } = authorization.actions

const userReducer = authorization.reducer
export default userReducer
