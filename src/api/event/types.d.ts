import { Event } from '../../lib/types/entity'

type CreateEventProps = Omit<Event, 'eventId'> & { group_id: string }
