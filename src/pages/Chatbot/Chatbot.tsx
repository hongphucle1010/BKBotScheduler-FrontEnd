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
      className='p-0 fixed z-20 bottom-8 left-1/2 -translate-x-1/2 -translate-y-1/2 active:text-blue-700 dark:active:text-cyan-500'
    >
      <FaArrowCircleDown className='text-3xl opacity-30' />
    </button>
  )
}

const MessageBox = () => {
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
      <div ref={chatBoxRef} className='flex flex-col flex-1 gap-3 justify-end overflow-y-auto'>
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
    <div
      className='bg-purple-300 flex flex-col rounded-lg'
      style={{
        width: '95%',
        height: '95%',
        minHeight: '0',
        maxHeight: '95%'
      }}
    >
      <MessageBox />
      <MessageTypingArea />
    </div>
  )
}

export default Chatbot
