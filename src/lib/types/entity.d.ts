export interface GroupElementProps {
  groupId: string
  name: string
  description: string
  numberOfMembers: number
  avatar?: string
}

export interface Event {
  summary: string
  description: string
  startTime: string
  endTime: string
  isRecurring: boolean
  isComplete: boolean
  type: string
  priority: number
  eventId: string
}

export interface Member {
  id: string
  name: string
  email: string
}
