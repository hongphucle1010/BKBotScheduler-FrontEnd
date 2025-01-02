'use client'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { EventForm } from './EventForm'
import { Event } from '../../lib/types/entity'
import { EventFormData } from '../../lib/validation'

interface EditEventDialogProps {
  event: Event
  onEditEvent: (data: EventFormData) => void
}

export function EditEventDialog({ event, onEditEvent }: EditEventDialogProps) {
  const [open, setOpen] = useState(false)

  const handleEditEvent = (data: EventFormData) => {
    onEditEvent(data)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>Make changes to the event details.</DialogDescription>
        </DialogHeader>
        <EventForm onSubmit={handleEditEvent} initialData={event} />
      </DialogContent>
    </Dialog>
  )
}
