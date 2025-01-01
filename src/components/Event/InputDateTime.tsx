import { Input } from '../ui/input'
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'

interface DateTimeInputProps {
  control: any
  name: 'startTime' | 'endTime'
  form: any
  className?: string
}

const validateDate = (start: string, end: string): boolean => {
  const now = new Date()
  const startDate = new Date(start)
  const endDate = new Date(end)
  if (startDate < now) {
    return false
  }
  if (end && endDate <= startDate) {
    return false
  }
  return true
}

export const InputDateTime = ({
  control,
  name,
  form,
  className = 'border-none focus:border-b-2 focus:border-slate-400'
}: DateTimeInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      rules={{
        validate: (value) =>
          name === 'startTime'
            ? validateDate(value, form.getValues('endTime'))
            : validateDate(form.getValues('startTime'), value)
      }}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <Input
              type='datetime-local'
              className={className}
              min={
                name === 'endTime' && form.watch('startTime')
                  ? form.watch('startTime')
                  : new Date().toISOString().slice(0, 16)
              }
              {...field}
            />
          </FormControl>
          {fieldState.error && (
            <FormMessage className='text-red-500'>{fieldState.error.message || `Invalid ${name} date`}</FormMessage>
          )}
        </FormItem>
      )}
    />
  )
}
