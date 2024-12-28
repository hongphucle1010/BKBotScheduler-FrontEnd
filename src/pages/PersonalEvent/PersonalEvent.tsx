import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

type EventType = 'Task' | 'Meeting' | 'Event'
type FilterType = EventType | 'All'

interface Event {
  id: string // Unique identifier
  title: string
  description?: string // Optional description
  type: EventType
  startTime: Date
  endTime: Date
  location?: string // Optional location
  attendees?: string[] // Optional array of attendees
}

const eventList: Event[] = [
  {
    id: '1',
    title: 'Grocery Shopping',
    type: 'Task',
    startTime: new Date('2024-07-27T10:00:00'),
    endTime: new Date('2024-07-27T11:00:00')
  },
  {
    id: '2',
    title: 'Team Meeting',
    type: 'Meeting',
    startTime: new Date('2024-07-27T14:00:00'),
    endTime: new Date('2024-07-27T15:00:00'),
    location: 'Conference Room A',
    attendees: ['John Doe', 'Jane Smith']
  },
  {
    id: '3',
    title: 'Birthday Party',
    type: 'Event',
    startTime: new Date('2024-07-28T18:00:00'),
    endTime: new Date('2024-07-28T22:00:00'),
    location: "Mike's House"
  },
  {
    id: '4',
    title: 'Pay Bills',
    type: 'Task',
    startTime: new Date(),
    endTime: new Date(Date.now() + 3600000), // 1 hour from now
    description: 'Pay all outstanding utility and credit card bills.'
  },
  // Additional Events
  {
    id: '5',
    title: 'Gym Workout',
    type: 'Task',
    startTime: new Date('2024-12-24T07:00:00'),
    endTime: new Date('2024-12-24T08:00:00')
  },
  {
    id: '6',
    title: 'Client Call - Project X',
    type: 'Meeting',
    startTime: new Date('2024-12-26T10:00:00'),
    endTime: new Date('2024-12-26T11:00:00'),
    attendees: ['Sarah Lee', 'David Johnson']
  },
  {
    id: '7',
    title: 'Movie Night (Star Wars!)',
    type: 'Event',
    startTime: new Date('2024-12-27T19:00:00'),
    endTime: new Date('2024-12-28T01:00:00'),
    location: 'Home Theater'
  },
  {
    id: '8',
    title: 'Finish Project Report',
    type: 'Task',
    startTime: new Date('2024-12-28T09:00:00'),
    endTime: new Date('2024-12-28T12:00:00'),
    description: 'Finalize report for the marketing team.'
  },
  {
    id: '9',
    title: 'Book Club Meeting',
    type: 'Meeting',
    startTime: new Date('2024-12-29T18:00:00'),
    endTime: new Date('2024-12-29T20:00:00'),
    location: 'Coffee Shop',
    attendees: ['Emily Jones', 'Michael Chen']
  },
  {
    id: '10',
    title: 'Holiday Shopping',
    type: 'Task',
    startTime: new Date('2024-12-30T10:00:00'),
    endTime: new Date('2024-12-30T14:00:00'),
    description: 'Gifts for family and friends!'
  },
  {
    id: '11',
    title: 'New Year Eve Party',
    type: 'Event',
    startTime: new Date('2024-12-31T21:00:00'),
    endTime: new Date('2025-01-01T02:00:00'),
    location: 'Grand Ballroom'
  },
  {
    id: '12',
    title: 'Plan Next Quarter Goals',
    type: 'Meeting',
    startTime: new Date('2025-01-02T10:00:00'),
    endTime: new Date('2025-01-02T12:00:00'),
    attendees: ['Team Leaders']
  },
  {
    id: '13',
    title: 'Return Library Books',
    type: 'Task',
    startTime: new Date('2025-01-03T14:00:00'),
    endTime: new Date('2025-01-03T15:00:00')
  },
  {
    id: '14',
    title: 'Doctor Appointment',
    type: 'Event',
    startTime: new Date('2025-01-06T09:00:00'),
    endTime: new Date('2025-01-06T10:00:00'),
    location: 'City Hospital'
  },
  {
    id: '15',
    title: 'Prepare Presentation',
    type: 'Task',
    startTime: new Date('2025-01-07T13:00:00'),
    endTime: new Date('2025-01-07T17:00:00'),
    description: 'Create slides and rehearse presentation for the conference.'
  },
  {
    id: '16',
    title: 'Project Kick-off Meeting',
    type: 'Meeting',
    startTime: new Date('2025-01-08T11:00:00'),
    endTime: new Date('2025-01-08T12:00:00'),
    location: 'Online Meeting Room',
    attendees: ['Project Team']
  },
  {
    id: '17',
    title: 'Weekend Getaway',
    type: 'Event',
    startTime: new Date('2025-01-10T18:00:00'),
    endTime: new Date('2025-01-12T16:00:00'),
    location: 'Mountain Resort'
  },
  {
    id: '18',
    title: 'Review Performance Metrics',
    type: 'Task',
    startTime: new Date('2025-01-13T09:00:00'),
    endTime: new Date('2025-01-13T12:00:00'),
    description: 'Analyze data from the last quarter.'
  },
  {
    id: '19',
    title: 'Attend Workshop',
    type: 'Event',
    startTime: new Date('2025-01-15T10:00:00'),
    endTime: new Date('2025-01-15T16:00:00'),
    location: 'Convention Center'
  },
  {
    id: '20',
    title: 'Schedule Social Media Posts',
    type: 'Task',
    startTime: new Date('2025-01-16T14:00:00'),
    endTime: new Date('2025-01-16T16:00:00')
  }
]

interface SidebarProps {
  setTypeFilter: (filterType: FilterType) => void
}

const Sidebar = ({ setTypeFilter }: SidebarProps) => {
  const types: FilterType[] = ['All', 'Event', 'Meeting', 'Task']
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
        {types.map((type) => (
          <div
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
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    setEvents(eventList)
  }, [])

  const filterEvents = typeFilter === 'All' ? events : events.filter((event) => event.type === typeFilter)

  const EventComponent = ({ event }: { event: Event }) => {
    return (
      <div key={event.id} className='bg-red-200 p-2 my-2 w-full rounded-lg drop-shadow-md'>
        <div className='text-lg font-semibold'>{event.title}</div>({event.type}) - {event.startTime.toLocaleString()} to{' '}
        {event.endTime.toLocaleString()}
        {event.location && <p>Location: {event.location}</p>}
        {event.description && <p>Description: {event.description}</p>}
        {event.attendees && <p>Attendees: {event.attendees.join(', ')}</p>}
      </div>
    )
  }

  return (
    <div className='flex w-full h-full justify-between overflow-hidden'>
      <div className='overflow-auto flex-1 flex justify-center w-full py-12'>
        <div className='w-4/5'>
          <div className='w-full text-3xl font-bold'>Sự kiện cá nhân</div>
          <div className='flex flex-col gap-3 py-10'>
            {filterEvents.map((event) => (
              <EventComponent event={event} />
            ))}
          </div>
        </div>
      </div>
      <Sidebar setTypeFilter={setTypeFilter} />
    </div>
  )
}

export default PersonalEvent
