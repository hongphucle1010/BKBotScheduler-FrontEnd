import React, { useState } from 'react'
import { useTaskContext } from '../../context/TaskContext'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

interface AddSubtaskProps {
  taskId: number
}

export const AddSubtask: React.FC<AddSubtaskProps> = ({ taskId }) => {
  const { setTasks } = useTaskContext()
  const [newSubtaskName, setNewSubtaskName] = useState('')

  const handleAddSubtask = () => {
    if (newSubtaskName.trim()) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                subtasks: [
                  ...task.subtasks,
                  {
                    id: task.subtasks.length + 1,
                    name: newSubtaskName,
                    description: '',
                    completed: false,
                    priority: 'medium' as const,
                    assignedMembers: []
                  }
                ]
              }
            : task
        )
      )
      setNewSubtaskName('')
    }
  }

  return (
    <div className='flex space-x-2'>
      <Input
        type='text'
        value={newSubtaskName}
        onChange={(e) => setNewSubtaskName(e.target.value)}
        placeholder='New subtask name'
      />
      <Button onClick={handleAddSubtask}>Add Subtask</Button>
    </div>
  )
}
