export type Role = 'GUEST' | 'STUDENT' | 'ADMIN'

export interface User {
  id: string
  name: string
  role: Role
}
