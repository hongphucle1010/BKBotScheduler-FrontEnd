import React, { useState } from 'react'
import { useTaskContext } from '../../context/TaskContext'
import { Subtask as SubtaskType } from '../../lib/types/entity'
import { EditSubtaskDialog } from './EditSubTaskDialog'
import { isOverdue } from '../../lib/helper/task'
import { Checkbox } from '../../components/ui/checkbox'
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'

interface SubtaskProps {
  subtask: SubtaskType
  taskId: number
}

export const Subtask: React.FC<SubtaskProps> = ({ subtask, taskId }) => {
  const { setTasks } = useTaskContext()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const toggleSubtask = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((st) => (st.id === subtask.id ? { ...st, completed: !st.completed } : st))
            }
          : task
      )
    )
  }

  const deleteSubtask = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, subtasks: task.subtasks.filter((st) => st.id !== subtask.id) } : task
      )
    )
  }

  return (
    <div className='flex items-center space-x-2'>
      <Checkbox checked={subtask.completed} onCheckedChange={toggleSubtask} />
      <span className={subtask.completed ? 'line-through' : ''}>{subtask.name}</span>
      <Badge>{subtask.priority}</Badge>
      {subtask.deadline && (
        <Badge variant={isOverdue(subtask.deadline) ? 'destructive' : 'secondary'}>
          {isOverdue(subtask.deadline) ? 'Overdue' : new Date(subtask.deadline).toLocaleDateString()}
        </Badge>
      )}
      <Button variant='outline' size='sm' onClick={() => setIsEditDialogOpen(true)}>
        Edit
      </Button>
      <Button variant='destructive' size='sm' onClick={deleteSubtask}>
        Delete
      </Button>
      <EditSubtaskDialog
        subtask={subtask}
        taskId={taskId}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      />
    </div>
  )
}
