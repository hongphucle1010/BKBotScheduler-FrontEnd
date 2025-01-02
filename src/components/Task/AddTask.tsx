import React, { useState } from 'react'
import { useTaskContext } from '../../context/TaskContext'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

export const AddTask: React.FC = () => {
  const { tasks, setTasks } = useTaskContext()
  const [newTaskName, setNewTaskName] = useState('')

  const handleAddTask = () => {
    if (newTaskName.trim()) {
      const newTask = {
        id: tasks.length + 1,
        name: newTaskName,
        description: '',
        subtasks: [],
        priority: 'medium' as const,
        assignedMembers: []
      }
      setTasks([...tasks, newTask])
      setNewTaskName('')
    }
  }

  return (
    <div className='flex space-x-2'>
      <Input
        type='text'
        value={newTaskName}
        onChange={(e) => setNewTaskName(e.target.value)}
        placeholder='New task name'
      />
      <Button onClick={handleAddTask}>Add Task</Button>
    </div>
  )
}
