export type Role = 'GUEST' | 'STUDENT' | 'ADMIN'

export interface User {
  id: string
  name: string
  role: Role
  email: string
  avatar: string
}

export interface Message {
  content: string
}

export type MessagePair = [Message, Message]

export interface Group {
  description: string
  name: string
  createTime: Date
  numMember: number
  id: string
  avatar?: string
}
