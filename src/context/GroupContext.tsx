'use client'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { Event, Member } from '../lib/types/entity'
import { getGroupDetail } from '../api/group/group'
import { getEventsFromGroup } from '../api/event/event'

interface GroupContextType {
  events: Event[]
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>
  members: Member[]
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>
  groupId: string
}

const GroupContext = createContext<GroupContextType | undefined>(undefined)

interface GroupProviderProps {
  children: ReactNode
  groupId: string
}

export const GroupProvider = ({ children, groupId }: GroupProviderProps) => {
  const [events, setEvents] = useState<Event[]>([])
  const [members, setMembers] = useState<Member[]>([])

  useEffect(() => {
    getEventsFromGroup(groupId).then((res) => {
      setEvents(res)
    })
    getGroupDetail(groupId).then((res) => {
      setMembers(res.users)
    })
  }, [groupId])

  return (
    <GroupContext.Provider value={{ events, setEvents, members, setMembers, groupId }}>
      {children}
    </GroupContext.Provider>
  )
}

export const useGroupContext = () => {
  const context = useContext(GroupContext)
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider')
  }
  return context
}
