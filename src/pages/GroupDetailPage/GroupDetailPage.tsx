'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import EventList from '../../components/Group/EventList'
import MemberList from '../../components/Group/MemberList'
import EventSchedule from '../../components/Group/EventSchedule'
import ChatBubble from '../../components/Group/ChatBubble'
import { TaskProvider } from '../../context/TaskContext'
// there will be leave group button

const GroupDetailPage = () => {
  const [activeTab, setActiveTab] = useState('tasks')

  return (
    <div className='container mx-auto p-4 w-full'>
      <h1 className='text-2xl font-bold mb-4'>Group Management</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className='w-full'>
        <TabsList className='w-full flex justify-between items-center'>
          <TabsTrigger className='w-full flex justify-center items-center' value='tasks'>
            Tasks
          </TabsTrigger>
          <TabsTrigger className='w-full flex justify-center items-center' value='members'>
            Members
          </TabsTrigger>
          <TabsTrigger className='w-full flex justify-center items-center' value='events'>
            Events
          </TabsTrigger>
        </TabsList>
        <TabsContent value='tasks'>
          <TaskProvider>
            <EventList />
          </TaskProvider>
        </TabsContent>
        <TabsContent value='members'>
          <MemberList />
        </TabsContent>
        <TabsContent value='events'>
          <EventSchedule />
        </TabsContent>
      </Tabs>
      <ChatBubble />
    </div>
  )
}

export default GroupDetailPage
