import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MessagePair } from './types'

interface MessageState {
  value: MessagePair[]
}

const initialState: MessageState = {
  value: []
}

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    addMessagePair: (state: MessageState, action: PayloadAction<MessagePair>) => {
      state.value.push(action.payload)
    },

    clearMessages: (state: MessageState) => {
      state.value = []
    }
  }
})

export const { addMessagePair, clearMessages } = messageSlice.actions

const messageReducer = messageSlice.reducer
export default messageReducer
