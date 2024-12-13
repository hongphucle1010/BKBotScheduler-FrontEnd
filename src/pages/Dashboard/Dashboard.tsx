import { Button, Progress } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineArrowRight } from 'react-icons/hi'

const Navigation: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div>
      <div>
        <p>Quản lý thời gian với BKBotScheduler!</p>
        <p>Giảm giá 30% phiên bản Premium ngày hôm nay!</p>
      </div>
      <div className='flex'>
        <Button color='blue' onClick={() => navigate('/overall')}>
          Quản lý chung <HiOutlineArrowRight className='ml-2 h-5 w-5' />
        </Button>
        <Button color='warning' onClick={() => navigate('/group-progress')}>
          Tiến độ nhóm <HiOutlineArrowRight className='ml-2 h-5 w-5' />
        </Button>
        <Button color='purple' onClick={() => navigate('/personal-event')}>
          Sự kiện cá nhân <HiOutlineArrowRight className='ml-2 h-5 w-5' />
        </Button>
      </div>
    </div>
  )
}

interface ProgressBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  completed: number
  total: number
  color: string
}

const ProgressBox: React.FC<ProgressBoxProps> = ({ title, completed, total, color, ...props }) => {
  return (
    <div {...props}>
      <p>{title}</p>
      <p>{`${completed}/${total} hoàn thành`}</p>
      <Progress progress={(completed / total) * 100} color={color} />
    </div>
  )
}

const Overview: React.FC = () => {
  return (
    <div>
      <p>Tổng quan</p>
      <ProgressBox title='Tiến độ hôm nay' completed={10} total={20} color='blue' />
      <ProgressBox title='Tiến độ tuần này' completed={30} total={40} color='green' />
    </div>
  )
}

interface TaskProps {
  title: string
  description: string
  deadline: Date
}

const Task: React.FC<TaskProps> = ({ title, description, deadline }) => {
  return (
    <div>
      <h3>{title}</h3>
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
    <div>
      <p>Nhiệm vụ</p>
      {tasks.map((task) => (
        <Task key={task.title} {...task} />
      ))}
    </div>
  )
}

const Dashboard: React.FC = () => {
  return (
    <div>
      <Navigation />
      <div className='flex'>
        <Overview />
        <TaskList />
      </div>
    </div>
  )
}

export default Dashboard
