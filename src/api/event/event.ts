import { AxiosError } from 'axios'
import { apiClient } from '..'
import { Event } from '../../lib/types/entity'
import { CreateEventGroupProps, CreateEventUserProps } from './types'

export async function getEventsFromGroup(groupId: string): Promise<Event[]> {
  try {
    const response = await apiClient.get(`/events/group/${groupId}`)

    console.log('response: ', response.data)

    const events: Event[] = response.data.events.map((event: any) => {
      return {
        eventId: event.id,
        summary: event.summary,
        description: event.description,
        startTime: event.startTime,
        endTime: event.endTime,
        isComplete: event.isComplete,
        isRecurring: event.isRecurring ? event.isRecurring : false,
        type: event.type,
        priority: event.priority,
        groupId: event.group_id
      }
    })

    return events
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error: ', error)
      throw new Error(error.response?.data)
    } else throw error
  }
}

export async function createEventGroup(data: CreateEventGroupProps): Promise<Event> {
  try {
    const response = await apiClient.post('/events/group', data)
    const event: Event = {
      eventId: response.data.id,
      summary: response.data.summary,
      description: response.data.description,
      startTime: response.data.startTime,
      endTime: response.data.endTime,
      isComplete: response.data.isComplete,
      isRecurring: response.data.isRecurring ? response.data.isRecurring : false,
      type: response.data.type,
      priority: response.data.priority,
      groupId: response.data.group_id
    }
    return event
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error: ', error)
      throw new Error(error.response?.data)
    } else throw error
  }
}

export async function updateEvent(eventId: string, data: Partial<Event>): Promise<Event> {
  try {
    const response = await apiClient.put(`/events/${eventId}`, data)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error: ', error)
      throw new Error(error.response?.data)
    } else throw error
  }
}

export async function deleteEvent(eventId: string): Promise<void> {
  try {
    await apiClient.delete(`/events/${eventId}`)
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error: ', error)
      throw new Error(error.response?.data)
    } else throw error
  }
}

export async function getAllPersonalEvents(): Promise<Event[]> {
  try {
    const response = await apiClient.get(`/events/getme`)

    console.log('response: ', response.data)

    const events: Event[] = response.data.events.map((event: any) => {
      return {
        eventId: event.id,
        summary: event.summary,
        description: event.description,
        startTime: event.startTime,
        endTime: event.endTime,
        isComplete: event.isComplete,
        isRecurring: event.isRecurring ? event.isRecurring : false,
        type: event.type,
        priority: event.priority,
        groupId: event.group_id
      }
    })

    return events
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error: ', error)
      throw new Error(error.response?.data)
    } else throw error
  }
}

export async function createEventUser(data: CreateEventUserProps): Promise<Event> {
  try {
    const response = await apiClient.post(`/events`, data)
    const event: Event = {
      eventId: response.data.id,
      summary: response.data.summary,
      description: response.data.description,
      startTime: response.data.startTime,
      endTime: response.data.endTime,
      isComplete: response.data.isComplete,
      isRecurring: response.data.isRecurring ? response.data.isRecurring : false,
      type: response.data.type,
      priority: response.data.priority,
      groupId: response.data.group_id
    }
    return event
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error: ', error)
      throw new Error(error.response?.data)
    } else throw error
  }
}
