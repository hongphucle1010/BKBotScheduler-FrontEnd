import React from 'react'
import logo from '../../assets/LandingPage/Logo.png'
import studentImg from '../../assets/LandingPage/student.png'
import SigninButtonGG from '../../components/LandingPage/signinGG.tsx'

const LandingPage: React.FC<LayoutProps> = () => {
  return (
    <div className='flex flex-col justify-between h-screen'>
      <div className='flex items-center justify-between py-3 px-8'>
        <div className='text-xl font-medium text-cyan-400 flex items-center gap-2'>
          <img src={logo} alt='logo' />
          <span className='text-2xl satoshi font-bold'>BKBotScheduler</span>
        </div>

        <SigninButtonGG />
      </div>
      <div className='w-4/5 flex justify-center'>
        <div className='flex gap-10 pl-12 items-center'>
          <div>
            <div className='mb-6'>
              <div className='mb-2'>
                <p className='text-5xl text-cyan-400 satoshi font-bold'>BKBotScheduler</p>
                <p className='text-4xl'>Lập kế hoạch thông minh, đạt tối đa hiệu quả</p>
              </div>
              <div className='text-2xl'>
                <p>Hệ thống chatbot cho sinh viên HCMUT</p>
                <p>Sắp xếp lịch trình, theo dõi tiến độ, và đồng bộ với Google Calendar</p>
              </div>
            </div>
            <div className='inline'>
              <SigninButtonGG />
            </div>
          </div>
          <img
            src={studentImg}
            alt=''
            style={{
              width: '450px'
            }}
            className='aspect-square'
          />
        </div>
      </div>

      <div className='flex items-center bg-teal-300 py-4 px-20 gap-4'>
        <span className='text-zinc-700'>Copyright © 2024</span>
        <span className='font-semibold'>BKBotScheduler</span>
        <span className='text-zinc-700'>|</span>
        <span className='text-zinc-700'>All Rights Reserved.</span>
      </div>
    </div>
  )
}

export default LandingPage
