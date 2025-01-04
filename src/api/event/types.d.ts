import { Event } from '../../lib/types/entity'

type CreateEventGroupProps = Omit<Event, 'eventId'> & { group_id: string }

type CreateEventUserProps = Omit<Event, 'eventId'>
