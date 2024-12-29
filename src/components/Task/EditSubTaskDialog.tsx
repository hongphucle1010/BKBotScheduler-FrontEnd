import React, { useState } from 'react'
import { useTaskContext } from '../../context/TaskContext'
import { Subtask } from '../../lib/types/entity'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Button } from '../../components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Calendar } from '../../components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

interface EditSubtaskDialogProps {
  subtask: Subtask
  taskId: number
  isOpen: boolean
  onClose: () => void
}

export const EditSubtaskDialog: React.FC<EditSubtaskDialogProps> = ({ subtask, taskId, isOpen, onClose }) => {
  const { setTasks, members } = useTaskContext()
  const [editedSubtask, setEditedSubtask] = useState(subtask)

  const handleSave = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((st) => (st.id === subtask.id ? editedSubtask : st))
            }
          : task
      )
    )
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Subtask</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <Input
            value={editedSubtask.name}
            onChange={(e) => setEditedSubtask({ ...editedSubtask, name: e.target.value })}
            placeholder='Subtask name'
          />
          <Textarea
            value={editedSubtask.description}
            onChange={(e) => setEditedSubtask({ ...editedSubtask, description: e.target.value })}
            placeholder='Subtask description'
          />
          <Select
            value={editedSubtask.priority}
            onValueChange={(value: 'low' | 'medium' | 'high') =>
              setEditedSubtask({ ...editedSubtask, priority: value })
            }
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
                {editedSubtask.deadline ? format(editedSubtask.deadline, 'PPP') : 'Pick a deadline'}
                <CalendarIcon className='ml-2 h-4 w-4' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0'>
              <Calendar
                mode='single'
                selected={editedSubtask.deadline}
                onSelect={(date) => setEditedSubtask({ ...editedSubtask, deadline: date })}
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
                    id={`subtask-member-${member.id}`}
                    checked={editedSubtask.assignedMembers.some((m) => m.id === member.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setEditedSubtask({
                          ...editedSubtask,
                          assignedMembers: [...editedSubtask.assignedMembers, member]
                        })
                      } else {
                        setEditedSubtask({
                          ...editedSubtask,
                          assignedMembers: editedSubtask.assignedMembers.filter((m) => m.id !== member.id)
                        })
                      }
                    }}
                  />
                  <label htmlFor={`subtask-member-${member.id}`}>{member.name}</label>
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
