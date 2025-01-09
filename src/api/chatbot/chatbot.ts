import { AxiosError } from 'axios'
import { apiClient } from '..'

export async function getMessageHistoryApi() {
  try {
    const response = await apiClient.get<GetChatbotMessageHistoryResponse[]>('/chatbot')
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
    const response = await apiClient.post<ChatbotApiResponse>('/chatbot', { message })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error: ', error)
      throw new Error(error.response?.data)
    } else console.error(error)
    throw new Error('Failed to send message')
  }
}

export async function clearMessageHistoryApi() {
  try {
    const response = await apiClient.delete('/chatbot/all')
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error: ', error)
      throw new Error(error.response?.data)
    } else console.error(error)
    throw new Error('Failed to clear message history')
  }
}

export async function clearMessageApi(messageId: string) {
  try {
    const response = await apiClient.delete('/chatbot', { data: { messageId } })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error: ', error)
      throw new Error(error.response?.data)
    } else console.error(error)
    throw new Error('Failed to clear message history')
  }
}
