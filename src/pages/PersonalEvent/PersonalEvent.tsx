import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { CreateEventDialog } from '../../components/Event/CreateEventDialog'
import { createEventUser, getAllEventsUser } from '../../api/event/event'
import { EventFormData } from '../../lib/validation'
import { ReturnEvent } from '../../api/event/types'
import { EVENT_TYPES } from '../../lib/helper/constant'
import { Badge } from '../../components/ui/badge'
import { Button } from '../../components/ui/button'
import { useNavigate } from 'react-router-dom'

type EventType =
  | 'TASK'
  | 'MEETING'
  | 'EVENT'
  | 'FOCUS_TIME'
  | 'OUT_OF_OFFICE'
  | 'WORKING_LOCATION'
  | 'APPOINTMENT_SCHEDULE'
type FilterType = EventType | 'All'

interface SidebarProps {
  setTypeFilter: (filterType: FilterType) => void
}

const Sidebar = ({ setTypeFilter }: SidebarProps) => {
  const types: FilterType[] = ['All', ...(EVENT_TYPES as FilterType[])]
  const [currentType, setCurrentType] = useState<FilterType>('All')
  const sidebarRef = useRef<HTMLDivElement>(null) // Add ref for SidebarFlowbite
  const [isCollapsed, setIsCollapsed] = useState(true) // Initially collapsed on mobile

  const toggleSidebar = (): void => {
    setIsCollapsed(!isCollapsed)
  }

  useEffect(() => {
    const handleClickOutsideSidebar = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsCollapsed(true)
      }
    }

    document.addEventListener('mousedown', handleClickOutsideSidebar)
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideSidebar)
    }
  }, [sidebarRef])

  return (
    <>
      {isCollapsed && (
        <button
          onClick={toggleSidebar}
          className='bg-slate-50 border-blue-400 drop-shadow-lg fixed top-2 right-2 z-50 p-2 rounded-full focus:outline-none lg:hidden'
        >
          <BsThreeDotsVertical className='h-6 w-6' />
        </button>
      )}
      <div
        className={`h-full flex flex-col w-2/5 md:w-1/6 gap-2 bg-teal-300 px-5 py-5 absolute right-0 lg:static transition-transform duration-300 ${isCollapsed ? 'translate-x-full lg:translate-x-0' : 'translate-x-0'}`}
        ref={sidebarRef}
      >
        <p className='text-xl font-bold'>Phân loại</p>
        <hr className='my-2 border-black' /> {/* Added a horizontal line */}
        {types.map((type, index) => (
          <div
            key={index}
            className={`w-full p-2 hover:bg-cyan-500 rounded-md cursor-pointer font-semibold ${
              currentType === type ? 'bg-cyan-500' : ''
            }`}
            onClick={() => {
              setTypeFilter(type)
              setCurrentType(type)
            }}
          >
            {type}
          </div>
        ))}
      </div>
    </>
  )
}

const PersonalEvent: React.FC = () => {
  const [typeFilter, setTypeFilter] = useState<FilterType>('All')
  const [events, setEvents] = useState<ReturnEvent[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    getAllEventsUser().then((res) => {
      setEvents(res)
    })
    /* setEvents(eventList) */
  }, [])

  const handleCreateEvent = async (data: EventFormData) => {
    await createEventUser(data).then((res) => {
      setEvents([...events, res])
    })
  }

  const filterEvents = typeFilter === 'All' ? events : events.filter((event) => event.type === typeFilter)

  const EventComponent = ({ event }: { event: ReturnEvent }) => {
    return (
      <div
        key={event.eventId}
        className='bg-red-200 p-2 my-2 w-full rounded-lg drop-shadow-md flex justify-between items-center'
      >
        <div>
          <div className='flex justify-start items-center space-x-4'>
            <p className='text-lg font-semibold'>{event.summary}</p>
            <Badge className='bg-green-400'>{event.type}</Badge>
          </div>
          From:
          {new Date(event.startTime).toLocaleString()} to {new Date(event.endTime).toLocaleString()}
          {event.description && <p>Description: {event.description}</p>}
        </div>
        <Button
          variant='link'
          onClick={() => navigate(`/group-management/${event.group_id}`)}
          className='font-bold text-lg '
        >
          Go to group
        </Button>
      </div>
    )
  }

  return (
    <div className='flex w-full h-full justify-between overflow-hidden'>
      <div className='overflow-auto flex-1 flex justify-center w-full py-12'>
        <div className='w-4/5'>
          <div className='w-full flex justify-between items-center'>
            <div className='w-full text-3xl font-bold'>Sự kiện cá nhân</div>
            <CreateEventDialog onCreateEvent={handleCreateEvent} />
          </div>

          <div className='flex flex-col gap-3 py-10'>
            {filterEvents.map((event, index) => (
              <EventComponent key={index} event={event} />
            ))}
          </div>
        </div>
      </div>
      <Sidebar setTypeFilter={setTypeFilter} />
    </div>
  )
}

export default PersonalEvent
