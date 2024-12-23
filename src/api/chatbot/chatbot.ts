import { AxiosError } from 'axios'
import { apiClient } from '..'
import { Message, MessagePair } from '../../lib/redux/reducers/types'

export async function getMessageHistoryApi() {
  try {
    const response = await apiClient.get<MessagePair[]>('/chatbot/history')
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error: ', error)
      throw new Error(error.response?.data)
    } else console.error(error)
    throw new Error('Failed to get message history')
  }
}

export async function sendMessageApi(message: string) {
  try {
    const response = await apiClient.post<Message>('/chatbot/send', { message })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error: ', error)
      throw new Error(error.response?.data)
    } else console.error(error)
    throw new Error('Failed to send message')
  }
}
