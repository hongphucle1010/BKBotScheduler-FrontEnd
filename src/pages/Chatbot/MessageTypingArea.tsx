import { Button } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { LuSendHorizonal } from 'react-icons/lu'
import { useDispatch } from 'react-redux'
import { MessagePair } from '../../lib/redux/reducers/types'
import { addMessagePair } from '../../lib/redux/reducers/message'

const MessageTypingArea = React.memo(() => {
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const sendMessage = () => {
    console.log(message)
    const messagePair: MessagePair = [
      {
        content: message
      },
      {
        content: 'Hello'
      }
    ]
    dispatch(addMessagePair(messagePair))
    if (message) {
      setMessage('')
    }
  }

  useEffect(() => {
    const pressEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        sendMessage()
      }
    }
    const input = inputRef.current
    if (input) {
      input.focus()
      input.addEventListener('keydown', pressEnter)
    }
    return () => {
      if (input) {
        input.removeEventListener('keydown', pressEnter)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message])

  return (
    <div className='my-0 h-16 flex items-center gap-2.5 p-2.5'>
      <input
        ref={inputRef}
        type='text'
        placeholder='Type a message'
        className='flex-1 p-2.5 rounded-xl'
        onChange={(e) => {
          setMessage(e.target.value)
        }}
        value={message}
      />
      <Button
        color='purple'
        className='px-0 active:bg-blue-500'
        onClick={() => {
          sendMessage()
        }}
      >
        <LuSendHorizonal />
      </Button>
    </div>
  )
})

export default MessageTypingArea
