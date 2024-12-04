import React from 'react'
import logo from '../../assets/Logo.png'
import ggLogo from '../../assets/gg-logo.png'

const LandingPage: React.FC = () => {
  return (
    <div className='flex items-center justify-between py-2 px-4'>
      <div className='text-xl font-semibold text-cyan-400 flex items-center gap-2'>
        <img src={logo} alt='logo' />
        <span>BKBotScheduler</span>
      </div>

      <button className='p-2 bg-gray-300 rounded-full font-semibold '>
        <img src={ggLogo} alt='google logo' />
        <span>Sign in with Google</span>
      </button>
    </div>
  )
}

export default LandingPage
