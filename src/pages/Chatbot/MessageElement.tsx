import { Avatar } from 'flowbite-react'
import logo from '../../assets/LandingPage/Logo.png'

export const MessageElement = ({ text, isLeft }: MessageElementProps) => {
  return (
    <div className={`flex gap-2.5 w-5/6 sm:w-4/6 ${isLeft ? '' : 'self-end'}`}>
      {isLeft && <Avatar rounded className='self-start' img={logo} />}
      <div
        className={`flex flex-col w-full leading-1.5 p-4 border-gray-200 ${isLeft ? 'bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700' : 'bg-blue-500 rounded-s-xl rounded-ee-xl dark:bg-blue-600'}`}
      >
        <p className='text-sm font-normal py-2.5 text-gray-900 dark:text-white'>{text}</p>
      </div>
    </div>
  )
}

interface MessageElementProps {
  text: string
  isLeft: boolean
}
