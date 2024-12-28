import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Avatar } from 'flowbite-react'
import logo from '../../assets/LandingPage/Logo.png'
// import Header from '../../components/Header/Header.tsx'
// import styles from './MainLayout.module.scss' // Import the CSS module

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // <div className={`h-screen w-full flex flex-col overflow-hidden relative`}>
    <div className={`h-screen w-full flex overflow-hidden relative`}>
      <Sidebar />
      <div className='flex-1 overflow-auto p-0 m-0 flex flex-col h-full'>
        <div className='w-full sticky top-0 bg-slate-50/50 z-20 backdrop-blur-md h-16 border-b-2 flex items-center justify-center md:hidden'>
          <Avatar img={logo} />
        </div>
        <div
          className='flex-1'
          style={{
            height: 'calc(100% - 4rem)'
          }}
        >
          {children}
        </div>
      </div>
      <Outlet />
      {/* <Footer /> */}
    </div>
  )
}

export default MainLayout
