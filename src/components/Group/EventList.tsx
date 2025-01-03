'use client'
import { useState } from 'react'
import { EventFormData } from '../../lib/validation'
import { ProgressCircle } from '../Event/ProgressCircle'
import { CreateEventDialog } from '../Event/CreateEventDialog'
import { EditEventDialog } from '../Event/EditEventDialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Checkbox } from '../ui/checkbox'
import { createEvent, deleteEvent, updateEvent } from '../../api/event/event'
import { useGroupContext } from '../../context/GroupContext'

export default function EventList() {
  const { groupId, events, setEvents } = useGroupContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'priority' | 'startTime' | 'endTime'>('priority')
  const [filterComplete, setFilterComplete] = useState<'all' | 'complete' | 'incomplete'>('all')

  const handleCreateEvent = async (data: EventFormData) => {
    await createEvent({ ...data, group_id: groupId }).then((res) => {
      setEvents([...events, res])
    })
  }

  const handleEditEvent = async (data: EventFormData) => {
    const { startTime, endTime, ...rest } = data
    await updateEvent(data.eventId!, {
      ...rest,
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString()
    }).then(() => {
      const updatedEvents = events.map((event) => (event.eventId === data.eventId ? { ...event, ...data } : event))
      setEvents(updatedEvents)
    })
  }

  const handleDeleteEvent = async (eventId: string) => {
    await deleteEvent(eventId).then(() => setEvents(events.filter((event) => event.eventId !== eventId)))
  }

  const handleFastChangeComplete = async (eventId: string) => {
    const event = events.find((event) => event.eventId === eventId)

    if (!event) return

    await updateEvent(eventId, { isComplete: !event.isComplete }).then(() => {
      setEvents(
        events.map((event) => (event.eventId === eventId ? { ...event, isComplete: !event.isComplete } : event))
      )
    })
  }

  const handleFastChangePriority = async (eventId: string, newPriority: number) => {
    const event = events.find((event) => event.eventId === eventId)

    if (!event) return

    await updateEvent(eventId, { priority: newPriority }).then(() => {
      setEvents(events.map((event) => (event.eventId === eventId ? { ...event, priority: newPriority } : event)))
    })
  }

  const filteredAndSortedEvents = events
    .filter(
      (event) =>
        event.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((event) => {
      if (filterComplete === 'complete') return event.isComplete
      if (filterComplete === 'incomplete') return !event.isComplete
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'priority') return b.priority - a.priority
      if (sortBy === 'startTime') return new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      if (sortBy === 'endTime') return new Date(a.endTime).getTime() - new Date(b.endTime).getTime()
      return 0
    })

  const completedEventsCount = events.filter((event) => event.isComplete).length
  const totalProgress = Math.round((completedEventsCount / events.length) * 100) || 0

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between w-full items-center mb-8'>
        <div className='flex flex-col justify-start items-start space-y-4'>
          <Card className='w-full'>
            <CardHeader>
              <CardTitle>Total Events</CardTitle>
            </CardHeader>
            <CardContent>{events.length}</CardContent>
            <CardFooter>
              <CardDescription>
                Complete: {events.filter((event) => event.isComplete).length}, In Progress:{' '}
                {events.filter((event) => !event.isComplete).length}
              </CardDescription>
            </CardFooter>
          </Card>
        </div>
        <div>
          <h2 className='text-2xl font-bold mb-2'>Overall Progress</h2>
          <ProgressCircle progress={totalProgress} size={200} strokeWidth={20} />
        </div>

        <div>
          <CreateEventDialog onCreateEvent={handleCreateEvent} />
        </div>
      </div>

      <div className='mb-8'>
        <h2 className='text-xl font-semibold mb-2'>Manage Events</h2>
        <div className='flex space-x-4 mb-4 w-full'>
          <Input
            placeholder='Search events...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='flex-1'
          />
          <Select value={sortBy} onValueChange={(value: 'priority' | 'startTime' | 'endTime') => setSortBy(value)}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='priority'>Priority</SelectItem>
              <SelectItem value='startTime'>Start Time</SelectItem>
              <SelectItem value='endTime'>End Time</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filterComplete}
            onValueChange={(value: 'all' | 'complete' | 'incomplete') => setFilterComplete(value)}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Filter by status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All</SelectItem>
              <SelectItem value='complete'>Complete</SelectItem>
              <SelectItem value='incomplete'>Incomplete</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Summary</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Complete</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Priority </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedEvents.map((event) => (
              <TableRow key={event.eventId}>
                <TableCell>{event.summary}</TableCell>
                <TableCell>{new Date(event.startTime).toLocaleString()}</TableCell>
                <TableCell>{new Date(event.endTime).toLocaleString()}</TableCell>
                <TableCell>{event.priority}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={event.isComplete}
                    onCheckedChange={() => handleFastChangeComplete(event.eventId)}
                  />
                </TableCell>
                <TableCell>
                  <div className='flex space-x-2'>
                    <EditEventDialog event={event} onEditEvent={handleEditEvent} />
                    <Button onClick={() => handleDeleteEvent(event.eventId)} variant='destructive'>
                      Delete
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Select
                    value={event.priority.toString()}
                    onValueChange={(value) => handleFastChangePriority(event.eventId, parseInt(value))}
                  >
                    <SelectTrigger className='w-[100px]'>
                      <SelectValue placeholder='Priority' />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((priority) => (
                        <SelectItem key={priority} value={priority.toString()}>
                          {priority}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
