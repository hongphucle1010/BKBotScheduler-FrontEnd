import { Event } from '../../lib/types/entity'

type CreateEventGroupProps = Omit<Event, 'eventId'> & { group_id: string }

type CreateEventUserProps = Omit<Event, 'eventId'>

type ReturnEvent = Event & { group_id: string }
