import { Avatar } from 'flowbite-react'
import logo from '../../assets/LandingPage/Logo.png'
import ReactMarkdown from 'react-markdown'

export const MessageElement = ({ text, isLeft }: MessageElementProps) => {
  return text ? (
    <div className={`flex gap-2.5 items-center my-3 ${isLeft ? '' : 'justify-end'} px-2`}>
      {isLeft && <Avatar rounded img={logo} className='flex-shrink-0' />}
      <div
        className={`flex flex-col max-w-5/6 sm:max-w-4/6 leading-1.5 p-4 border-gray-200 ${
          isLeft
            ? 'bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700'
            : 'bg-blue-400 rounded-s-xl rounded-ee-xl dark:bg-blue-600'
        }`}
      >
        <p className='text-sm font-normal py-2.5 max-w-full text-gray-900 dark:text-white'>
          <ReactMarkdown>{text}</ReactMarkdown>
        </p>
      </div>
    </div>
  ) : (
    <div className={`flex gap-2.5 items-center my-3 opacity-50 ${isLeft ? '' : 'justify-end'} px-2`}>
      {isLeft && <Avatar rounded img={logo} className='flex-shrink-0' />}
      <div
        className={`flex flex-col max-w-5/6 sm:max-w-4/6 leading-1.5 p-4 border-gray-200 ${
          isLeft
            ? 'bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700'
            : 'bg-blue-500 rounded-s-xl rounded-ee-xl dark:bg-blue-600'
        }`}
      >
        <div className='h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4'></div>
      </div>
    </div>
  )
}

interface MessageElementProps {
  text: string
  isLeft: boolean
}
