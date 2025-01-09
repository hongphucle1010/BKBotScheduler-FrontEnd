import { Button } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { LuSendHorizonal } from 'react-icons/lu'
import { useDispatch } from 'react-redux'
import { MessagePair } from '../../lib/redux/reducers/types'
import { addMessagePair, updateLastBotMessage } from '../../lib/redux/reducers/message'
import { sendMessageApi } from '../../api/chatbot/chatbot'

const MessageTypingArea = React.memo(() => {
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()

  const sendMessage = async () => {
    if (!message) {
      return
    }
    // Dispatch user's message with an empty bot reply
    const messagePair: MessagePair = [
      { content: message },
      { content: '' } // Empty bot message as placeholder
    ]
    dispatch(addMessagePair(messagePair))
    setMessage('')

    // Get the bot's response
    // const answer = await runGemini(message, messageList)
    console.log('Sending message:', message)
    const response = await sendMessageApi(message)
    console.log(response)
    const answer = response.message
    // Update the last bot message
    dispatch(updateLastBotMessage(answer))
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
    <div className='my-0 h-16 flex w-full items-center gap-2.5 p-2.5'>
      <input
        ref={inputRef}
        type='text'
        placeholder='Type a message'
        className='flex-1 p-2.5 rounded-xl text-sm'
        onChange={(e) => {
          setMessage(e.target.value)
        }}
        value={message}
        id='message-input'
      />
      <Button
        color='purple'
        className='px-0 active:bg-blue-500'
        onClick={() => {
          sendMessage()
        }}
        aria-label="Send message"
      >
        <LuSendHorizonal />
      </Button>
    </div>
  )
})

export default MessageTypingArea
