'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { TaskList } from '../../components/Group/TaskList'
import MemberList from '../../components/Group/MemberList'
import EventSchedule from '../../components/Group/EventSchedule'
import ChatBubble from '../../components/Group/ChatBubble'
import { TaskProvider } from '../../context/TaskContext'
// there will be leave group button

const GroupDetailPage = () => {
  const [activeTab, setActiveTab] = useState('tasks')

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Group Management</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value='tasks'>Tasks</TabsTrigger>
          <TabsTrigger value='members'>Members</TabsTrigger>
          <TabsTrigger value='events'>Events</TabsTrigger>
        </TabsList>
        <TabsContent value='tasks'>
          <TaskProvider>
            <TaskList />
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
