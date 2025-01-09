interface ChatbotApiResponse {
  message: string
  status: 'success' | 'error'
  data?: Object
}

interface GetChatbotMessageHistoryResponse {
    id: string
    userId: string
    createTime: string
    text: string
    response: string
    textBot: string
}