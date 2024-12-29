import React, { useState } from 'react'
import { Subtask as SubtaskComponent } from './SubTask'
import { EditTaskDialog } from './EditTaskDialog'
import { AddSubtask } from './AddSubTask'
import { useTaskContext } from '../../context/TaskContext'
import { Task as TaskType } from '../../lib/types/entity'
import { calculateProgress, isOverdue } from '../../lib/helper/task'
import { Button } from '../../components/ui/button'
import { Progress } from '../../components/ui/progress'
import { Badge } from '../../components/ui/badge'

interface TaskProps {
  task: TaskType
}

export const Task: React.FC<TaskProps> = ({ task }) => {
  const { setTasks } = useTaskContext()
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const progress = calculateProgress(task)

  const deleteTask = () => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id))
  }

  return (
    <div className='border p-4 rounded-lg space-y-2'>
      <div className='flex justify-between items-start'>
        <div>
          <h2 className='text-xl font-semibold'>{task.name}</h2>
          <p className='text-sm text-gray-500'>{task.description}</p>
        </div>
        <div className='space-x-2'>
          <Button variant='outline' size='sm' onClick={() => setIsEditDialogOpen(true)}>
            Edit
          </Button>
          <Button variant='destructive' size='sm' onClick={deleteTask}>
            Delete
          </Button>
        </div>
      </div>
      <div className='flex space-x-2'>
        <Badge>{task.priority}</Badge>
        {task.deadline && (
          <Badge variant={isOverdue(task.deadline) ? 'destructive' : 'secondary'}>
            {isOverdue(task.deadline) ? 'Overdue' : new Date(task.deadline).toLocaleDateString()}
          </Badge>
        )}
      </div>
      <div className='space-y-1'>
        <div className='flex justify-between text-sm'>
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className='w-full' />
      </div>
      <div className='space-y-2'>
        <h3 className='font-medium'>Subtasks</h3>
        {task.subtasks.map((subtask) => (
          <SubtaskComponent key={subtask.id} subtask={subtask} taskId={task.id} />
        ))}
        <AddSubtask taskId={task.id} />
      </div>
      <EditTaskDialog task={task} isOpen={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} />
    </div>
  )
}
