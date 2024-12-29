'use client'

import { Button } from '../../components/ui/button'
import { MessageCircle, X } from 'lucide-react'
import { useState } from 'react'
import MessageTypingArea from '../../pages/Chatbot/MessageTypingArea'
import { MessageBox } from '../../pages/Chatbot/Chatbot'

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='fixed bottom-4 right-4'>
      {isOpen ? (
        <div className='bg-white border rounded-lg shadow-lg w-[400px] h-[600px] flex flex-col'>
          <div className='flex justify-between items-center p-2 border-b'>
            <h3 className='font-semibold'>Chat with AI</h3>
            <Button variant='ghost' size='icon' onClick={() => setIsOpen(false)}>
              <X className='h-4 w-4' />
            </Button>
          </div>
          <div className='flex-grow overflow-y-auto p-2 space-y-2'>
            <MessageBox />
          </div>
          <div className='p-2 border-t flex'>
            <MessageTypingArea />
          </div>
        </div>
      ) : (
        <Button onClick={() => setIsOpen(true)} className='rounded-full w-12 h-12 flex items-center justify-center'>
          <MessageCircle className='h-6 w-6' />
        </Button>
      )}
    </div>
  )
}
