'use client'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { EventForm } from './EventForm'
import { EventFormData } from '../../lib/validation'

interface CreateEventDialogProps {
  onCreateEvent: (data: EventFormData) => Promise<void>
}

export function CreateEventDialog({ onCreateEvent }: CreateEventDialogProps) {
  const [open, setOpen] = useState(false)

  const handleCreateEvent = async (data: EventFormData) => {
    await onCreateEvent(data).then(() => setOpen(false))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Event</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>Fill in the details to create a new event.</DialogDescription>
        </DialogHeader>
        <EventForm onSubmit={handleCreateEvent} />
      </DialogContent>
    </Dialog>
  )
}
