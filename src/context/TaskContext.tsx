'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Event, Member } from '../lib/types/entity'

interface TaskContextType {
  tasks: Event[]
  setTasks: React.Dispatch<React.SetStateAction<Event[]>>
  members: Member[]
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Event[]>([])
  const [members, setMembers] = useState<Member[]>([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
  ])

  return <TaskContext.Provider value={{ tasks, setTasks, members, setMembers }}>{children}</TaskContext.Provider>
}

export const useTaskContext = () => {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider')
  }
  return context
}
