'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Event } from '../../lib/types/entity'
import { eventSchema, EventFormData } from '../../lib/validation'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { InputDateTime } from './InputDateTime'
import { EVENT_TYPES } from '../../lib/helper/constant'
interface EventFormProps {
  onSubmit: (data: EventFormData) => Promise<void>
  initialData?: Event
}

export function EventForm({ onSubmit, initialData }: EventFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialData || {
      type: 'task',
      isRecurring: false,
      isComplete: false,
      priority: 1
    }
  })

  const handleSubmit = async (data: EventFormData) => {
    setIsSubmitting(true)
    await onSubmit(data).then(() => {
      setIsSubmitting(false)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='summary'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className='flex flex-col w-full space-y-4'>
          <div className='flex w-full justify-between items-center'>
            <Label>Start Time</Label>
            <InputDateTime control={form.control} name='startTime' form={form} />
          </div>
          <div className='flex w-full justify-between items-center'>
            <Label>End Time</Label>
            <InputDateTime control={form.control} name='endTime' form={form} />
          </div>
        </div>

        <FormField
          control={form.control}
          name='isRecurring'
          render={({ field }) => (
            <FormItem className='flex items-center space-x-2'>
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Recurring (weekly)</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='isComplete'
          render={({ field }) => (
            <FormItem className='flex items-center space-x-2'>
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormLabel>Completed</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={(value) => field.onChange(value)} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select type' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {EVENT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='priority'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Select priority' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((priority) => (
                    <SelectItem key={priority} value={priority.toString()}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className={`${isSubmitting ? 'bg-slate-500 cursor-not-allowed hover:bg-slate-500' : ''} w-full`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900'></div>
          ) : (
            'Submit'
          )}
        </Button>
      </form>
    </Form>
  )
}
