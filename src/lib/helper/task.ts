import { Task, Subtask } from '../types/entity'

export const calculateProgress = (task: Task): number => {
  if (task.subtasks.length === 0) return 0
  const completedSubtasks = task.subtasks.filter((subtask) => subtask.completed).length
  return Math.round((completedSubtasks / task.subtasks.length) * 100)
}

export const isOverdue = (date?: Date): boolean => {
  if (!date) return false
  return new Date(date) < new Date()
}

export const sortTasks = (tasks: Task[], sortBy: 'priority' | 'progress' | 'overdue'): Task[] => {
  return [...tasks].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        return priorityToNumber(b.priority) - priorityToNumber(a.priority)
      case 'progress':
        return calculateProgress(b) - calculateProgress(a)
      case 'overdue':
        return Number(isOverdue(b.deadline)) - Number(isOverdue(a.deadline))
      default:
        return 0
    }
  })
}

const priorityToNumber = (priority: 'low' | 'medium' | 'high'): number => {
  switch (priority) {
    case 'low':
      return 1
    case 'medium':
      return 2
    case 'high':
      return 3
  }
}
