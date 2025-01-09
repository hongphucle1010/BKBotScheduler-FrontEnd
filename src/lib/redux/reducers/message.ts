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
    setMessages: (state: MessageState, action: PayloadAction<MessagePair[]>) => {
      state.value = action.payload
    },

    addMessagePair: (state: MessageState, action: PayloadAction<MessagePair>) => {
      state.value.push(action.payload)
    },

    clearMessages: (state: MessageState) => {
      state.value = []
    },

    updateLastBotMessage: (state: MessageState, action: PayloadAction<string>) => {
      if (state.value.length > 0) {
        state.value[state.value.length - 1][1].content = action.payload
      }
    }
  }
})

export const { addMessagePair, clearMessages, updateLastBotMessage } = messageSlice.actions

const messageReducer = messageSlice.reducer
export default messageReducer
