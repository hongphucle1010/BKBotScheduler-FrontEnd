import { useSelector } from 'react-redux'
import { RootState } from '../../lib/redux/store'
import { MessageElement } from './MessageElement'
import MessageTypingArea from './MessageTypingArea'
import { useEffect, useRef, useState } from 'react'
import { FaArrowCircleDown } from 'react-icons/fa'

const ScrollToBottomButton = ({ scrollToBottom }: { scrollToBottom: () => void }) => {
  return (
    <button
      onClick={scrollToBottom}
      className='p-0 fixed z-20 bottom-20 left-1/2 -translate-x-1/2 -translate-y-1/2 active:text-blue-700 dark:active:text-cyan-500'
    >
      <FaArrowCircleDown className='text-3xl opacity-30 bg-transparent' />
    </button>
  )
}

export const MessageBox = () => {
  const chatBoxRef = useRef<HTMLDivElement>(null)
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true)
  const messageList = useSelector((state: RootState) => state.message.value)

  const handleScroll = () => {
    if (chatBoxRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatBoxRef.current
      setIsAtBottom(scrollHeight - scrollTop < clientHeight + 100)
    }
  }

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
      setIsAtBottom(true)
    }
  }

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight
    }
  }, [messageList])

  useEffect(() => {
    const chatBox = chatBoxRef.current
    if (chatBox) {
      chatBox.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (chatBox) {
        chatBox.removeEventListener('scroll', handleScroll)
      }
    }
  }, [messageList])

  return (
    <>
      <div
        ref={chatBoxRef}
        className='gap-3 flex-1 justify-end overflow-y-auto beautiful-scrollbar'
        style={{
          height: '80%'
        }}
      >
        {messageList.map((pair, index) => (
          <>
            <MessageElement key={`${index}_0`} text={pair[0].content} isLeft={false} />
            <MessageElement key={`${index}_1`} text={pair[1].content} isLeft={true} />
          </>
        ))}
      </div>
      {!isAtBottom && <ScrollToBottomButton scrollToBottom={scrollToBottom} />}
    </>
  )
}

const Chatbot = () => {
  return (
    <div className='flex w-full h-full items-center justify-center'>
      <div
        className='outline outline-offset-4 outline-1	outline-blue-500 bg-white flex flex-col rounded-2xl drop-shadow-2xl'
        style={{
          width: '90%',
          height: '95%',
          minHeight: '0',
          maxHeight: '95%'
        }}
      >
        <MessageBox />
        <MessageTypingArea />
      </div>
    </div>
  )
}

export default Chatbot
