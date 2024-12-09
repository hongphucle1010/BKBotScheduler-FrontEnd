import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header.tsx'
// import styles from './MainLayout.module.scss' // Import the CSS module

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={`h-screen flex flex-col overflow-hidden relative`}>
      <Header />
      <div className='flex-1 overflow-auto p-0 m-0'>{children}</div>
      <Outlet />
      {/* <Footer /> */}
    </div>
  )
}

export default MainLayout
