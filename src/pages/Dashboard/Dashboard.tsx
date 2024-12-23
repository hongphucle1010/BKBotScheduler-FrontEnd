import { Button, Progress } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineArrowRight } from 'react-icons/hi'
// import { useState } from 'react'
// import styles from './Dashboard.module.css'

const Navigation: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className='w-full rounded-xl bg-lime-600 px-7 py-5 shadow-lg'>
      <div>
        <p className='text-3xl text-white pb-2 font-semibold'>Quản lý thời gian với BKBotScheduler!</p>
        <p className='text-white pb-4'>Giảm giá 30% phiên bản Premium ngày hôm nay!</p>
      </div>
      <div className='w-full flex flex-col items-center'>
        <div className='flex flex-col items-center gap-2 sm:flex-row justify-between md:w-11/12 lg:w-4/5 2xl:w-4/6 py-2'>
          <Button className='py-1' color='blue' onClick={() => navigate('/overall')}>
            Quản lý chung <HiOutlineArrowRight className='ml-2 h-5 w-5' />
          </Button>
          <Button className='py-1' color='warning' onClick={() => navigate('/group-progress')}>
            Tiến độ nhóm <HiOutlineArrowRight className='ml-2 h-5 w-5' />
          </Button>
          <Button className='py-1' color='purple' onClick={() => navigate('/personal-event')}>
            Sự kiện cá nhân <HiOutlineArrowRight className='ml-2 h-5 w-5' />
          </Button>
        </div>
      </div>
    </div>
  )
}

interface ProgressBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  completed: number
  total: number
  color: string
}

const ProgressBox: React.FC<ProgressBoxProps> = ({ completed, total, color, ...props }) => {
  return (
    <div {...props}>
      <p>{`${completed}/${total} hoàn thành`}</p>
      <Progress progress={(completed / total) * 100} color={color} />
    </div>
  )
}

interface Meeting {
  title: string
  date: Date
  time: [number, number]
}

const Overview: React.FC = () => {
  const nextMeeting: Meeting = {
    title: 'Đồ án tông hợp - CNPM',
    date: new Date('2024-12-31'),
    time: [10, 12]
  }

  return (
    <div className='w-10/12 lg:w-5/12 flex flex-col gap-7'>
      <p className='text-3xl text-gray-600 font-semibold'>Tổng quan</p>
      <div className='w-5/6 bg-blue-200 rounded-3xl p-7 shadow-lg '>
        <p className='text-lg font-semibold text-teal-500 pb-5'>Tiến độ hôm nay</p>
        <ProgressBox className='text-center text-teal-500 font-semibold' completed={10} total={20} color='blue' />
      </div>

      <div className='w-5/6 bg-orange-200 rounded-3xl p-7 shadow-lg'>
        <p className='text-lg font-semibold text-gray-600 pb-5'>Tiến độ tuần này</p>
        <ProgressBox className='text-center text-gray-600 font-semibold' completed={30} total={40} color='green' />
      </div>

      <div className='w-5/6 bg-red-300 rounded-3xl p-7 shadow-lg'>
        <p className='text-lg font-semibold text-black pb-5'>Cuộc họp tiếp theo</p>
        <div className='w-full bg-gray-100 p-3 rounded-xl shadow-lg'>
          <p className='text-xl text-green-400'>{nextMeeting.title}</p>
          <p className='text-gray-500'>
            {nextMeeting.date.toLocaleDateString()}, {nextMeeting.time[0]} - {nextMeeting.time[1]}
          </p>
        </div>
      </div>
    </div>
  )
}

interface TaskProps {
  title: string
  description: string
  deadline: Date
}

const Task: React.FC<TaskProps> = ({ title, description, deadline }) => {
  // const [isFinished, setIsFinished] = useState(false)

  // const finishTask = () => {
  //   setIsFinished(true)
  // }

  const finishTask = (event: React.MouseEvent<HTMLDivElement>) => {
    const task = event.currentTarget
    task.classList.add('hidden')
  }

  return (
    <div
      className='w-full rounded-3xl bg-white shadow-lg px-4 py-3 transition-all duration-500 cursor-pointer'
      onClick={finishTask}
    >
      <h3 className='text-xl text-blue-600'>{title}</h3>
      <p>{description}</p>
      <p>Deadline: {deadline.toLocaleDateString()}</p>
    </div>
  )
}

const TaskList: React.FC = () => {
  const tasks: TaskProps[] = [
    {
      title: 'Task 1',
      description: 'Description 1',
      deadline: new Date('2024-12-31')
    },
    {
      title: 'Task 2',
      description: 'Description 2',
      deadline: new Date('2024-12-31')
    }
  ]
  return (
    <div className='w-10/12 lg:w-5/12 bg-violet-300 rounded-3xl px-10 py-5 shadow-lg'>
      <p className='text-3xl text-black font-semibold pb-5'>Nhiệm vụ</p>
      <div className='flex flex-col gap-4'>
        {tasks.map((task) => (
          <Task key={task.title} {...task} />
        ))}
      </div>
    </div>
  )
}

const Dashboard: React.FC = () => {
  return (
    <div className='flex flex-col items-center py-10 gap-12'>
      <div className='w-11/12 flex flex-col gap-12'>
        <Navigation />
        <div className='flex gap-20 flex-col lg:flex-row'>
          <Overview />
          <TaskList />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
