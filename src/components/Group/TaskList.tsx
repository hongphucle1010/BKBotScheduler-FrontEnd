import React, { useState } from 'react'
import { useTaskContext } from '../../context/TaskContext'
import { Task as TaskComponent } from '../Task/Task'
import { AddTask } from '../Task/AddTask'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { sortTasks } from '../../lib/helper/task'

export const TaskList: React.FC = () => {
  const { tasks } = useTaskContext()
  const [sortBy, setSortBy] = useState<'priority' | 'progress' | 'overdue'>('priority')

  const sortedTasks = sortTasks(tasks, sortBy)

  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Task List</h1>
        <div className='flex items-center space-x-2'>
          <span className='text-sm font-medium'>Sort by:</span>
          <Select value={sortBy} onValueChange={(value: 'priority' | 'progress' | 'overdue') => setSortBy(value)}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='priority'>Priority</SelectItem>
              <SelectItem value='progress'>Progress</SelectItem>
              <SelectItem value='overdue'>Overdue</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <AddTask />
      {sortedTasks.map((task) => (
        <TaskComponent key={task.id} task={task} />
      ))}
    </div>
  )
}
