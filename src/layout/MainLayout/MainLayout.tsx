import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
// import Header from '../../components/Header/Header.tsx'
// import styles from './MainLayout.module.scss' // Import the CSS module

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    // <div className={`h-screen w-full flex flex-col overflow-hidden relative`}>
    <div className={`h-screen w-full flex overflow-hidden relative`}>
      <Sidebar />
      <div className='flex-1 overflow-auto p-0 m-0'>
        {/* <div className='w-full h-16 bg-teal-300 md:hidden'></div> */}
        {children}
      </div>
      <Outlet />
      {/* <Footer /> */}
    </div>
  )
}

export default MainLayout
