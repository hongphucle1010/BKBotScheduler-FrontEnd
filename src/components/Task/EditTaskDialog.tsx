import React, { useState } from 'react'
import { useTaskContext } from '../../context/TaskContext'
import { Task } from '../../lib/types/entity'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Button } from '../../components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Calendar } from '../../components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

interface EditTaskDialogProps {
  task: Task
  isOpen: boolean
  onClose: () => void
}

export const EditTaskDialog: React.FC<EditTaskDialogProps> = ({ task, isOpen, onClose }) => {
  const { setTasks, members } = useTaskContext()
  const [editedTask, setEditedTask] = useState(task)

  const handleSave = () => {
    setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? editedTask : t)))
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <Input
            value={editedTask.name}
            onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
            placeholder='Task name'
          />
          <Textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            placeholder='Task description'
          />
          <Select
            value={editedTask.priority}
            onValueChange={(value: 'low' | 'medium' | 'high') => setEditedTask({ ...editedTask, priority: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select priority' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='low'>Low</SelectItem>
              <SelectItem value='medium'>Medium</SelectItem>
              <SelectItem value='high'>High</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline'>
                {editedTask.deadline ? format(editedTask.deadline, 'PPP') : 'Pick a deadline'}
                <CalendarIcon className='ml-2 h-4 w-4' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                selected={editedTask.deadline}
                onSelect={(date) => setEditedTask({ ...editedTask, deadline: date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div>
            <h3 className='mb-2 font-medium'>Assigned Members</h3>
            <div className='space-y-2'>
              {members.map((member) => (
                <div key={member.id} className='flex items-center space-x-2'>
                  <input
                    type='checkbox'
                    id={`member-${member.id}`}
                    checked={editedTask.assignedMembers.some((m) => m.id === member.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setEditedTask({
                          ...editedTask,
                          assignedMembers: [...editedTask.assignedMembers, member]
                        })
                      } else {
                        setEditedTask({
                          ...editedTask,
                          assignedMembers: editedTask.assignedMembers.filter((m) => m.id !== member.id)
                        })
                      }
                    }}
                  />
                  <label htmlFor={`member-${member.id}`}>{member.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='mt-4 flex justify-end space-x-2'>
          <Button onClick={onClose} variant='outline'>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
