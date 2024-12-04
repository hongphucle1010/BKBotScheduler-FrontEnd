import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Role, User } from './types'

interface AuthorizationState {
  value: {
    id: string
    name: string
    role: Role
  }
}

const authorization = createSlice({
  name: 'authorization',
  initialState: {
    value: {
      id: '',
      name: '',
      role: 'GUEST' as Role
    }
  },
  reducers: {
    logOutReducer: (state: AuthorizationState) => {
      state.value.id = ''
      state.value.name = ''
      state.value.role = 'GUEST'
    },
    logInReducer: (state: AuthorizationState, action: PayloadAction<User>) => {
      state.value = action.payload
    }
  }
})

export const { logOutReducer, logInReducer } = authorization.actions

const userReducer = authorization.reducer
export default userReducer
