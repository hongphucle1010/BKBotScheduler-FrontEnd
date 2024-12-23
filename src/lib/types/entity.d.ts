export interface GroupElementProps {
  groupId: string
  name: string
  description: string
  numberOfMembers: number
  avatar: string
}

export interface Subtask {
  id: number
  name: string
  description: string
  completed: boolean
  deadline?: Date
  priority: 'low' | 'medium' | 'high'
  assignedMembers: Member[]
}

export interface Task {
  id: number
  name: string
  description: string
  subtasks: Subtask[]
  deadline?: Date
  priority: 'low' | 'medium' | 'high'
  assignedMembers: Member[]
}

export interface Member {
  id: number
  name: string
}
