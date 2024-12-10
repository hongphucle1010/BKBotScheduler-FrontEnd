import React from 'react'
import logo from '../../assets/LandingPage/Logo.png'
import studentImg from '../../assets/LandingPage/student.png'
import SigninButtonGG from '../../components/LandingPage/signinGG.tsx'
import { useGoogleOneTapLogin } from '@react-oauth/google'

const LandingPage: React.FC = () => {
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse)
    },
    onError: () => {
      console.log('Login Failed')
    },
    hosted_domain: 'hcmut.edu.vn'
  })
  return (
    <div className='flex flex-col justify-between h-screen'>
      <div className='flex items-center justify-between py-6 px-20'>
        <div className='text-xl font-semibold text-cyan-400 flex items-center gap-2'>
          <img src={logo} alt='logo' />
          <span>BKBotScheduler</span>
        </div>

        <SigninButtonGG />
      </div>

      <div className='flex px-80 justify-between'>
        <div className='flex flex-col justify-between py-20'>
          <span className='text-5xl text-cyan-400'>BKBotScheduler</span>
          <span className='text-4xl'>Lập kế hoạch thông minh, đạt tối đa hiệu quả</span>
          <div className='text-2xl'>
            <span>Hệ thống chatbot cho sinh viên HCMUT</span>
            <br />
            <span>Sắp xếp lịch trình, theo dõi tiến độ, và đồng bộ với Google Calendar</span>
          </div>
          <div className='inline'>
            <SigninButtonGG />
          </div>
        </div>
        <img src={studentImg} alt='' className='' />
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
