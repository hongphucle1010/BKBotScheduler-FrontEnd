import { Sidebar as SidebarFlowbite } from 'flowbite-react'
import type { CustomFlowbiteTheme } from 'flowbite-react'
import { HiMenu, HiOutlineViewGrid } from 'react-icons/hi'
import { SiChatbot } from 'react-icons/si'
import { HiOutlineUserGroup } from 'react-icons/hi2'
import { useState, useRef, useEffect } from 'react'
import { Flowbite } from 'flowbite-react'
import upgrade from '../../assets/Sidebar/upgrade.png'
import { IoAddCircleOutline } from 'react-icons/io5'
import { IoMdSettings } from 'react-icons/io'
import { MdLogout } from 'react-icons/md'

const customThemeSidebar: CustomFlowbiteTheme = {
  sidebar: {
    root: {
      inner: 'h-full overflow-y-auto overflow-x-hidden rounded bg-teal-300 px-3 py-4 dark:bg-teal-400'
    },
    collapse: {
      button:
        'group flex w-full items-center rounded-lg p-2 text-base font-semibold text-gray-700 transition duration-75 hover:bg-cyan-500 hover:text-black dark:text-white dark:hover:bg-gray-700'
    },
    item: {
      base: 'flex items-center justify-center rounded-lg p-2 text-base font-semibold text-gray-700 hover:bg-cyan-500 hover:text-black dark:text-white dark:hover:bg-gray-700 active:bg-cyan-500 active:text-black',
      icon: {
        base: 'h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-red-900 dark:text-gray-400 dark:group-hover:text-white',
        active: 'text-gray-700 dark:text-gray-100'
      }
    },
    itemGroup: {
      base: 'mt-4 space-y-2 border-t border-teal-600 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700'
    }
  }
}

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true) // Initially collapsed on mobile
  const [isDropdownOpen, setIsDropdownOpen] = useState(false) // State for dropdown visibility
  const dropdownRef = useRef<HTMLDivElement>(null) // Ref for the dropdown

  const toggleSidebar = (): void => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleDropdown = (): void => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <div className='relative'>
      {' '}
      {/* Needed for absolute positioning of the button */}
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className='bg-red-600 fixed top-4 left-4 z-50 p-2 rounded-md focus:outline-none md:hidden'
      >
        <HiMenu className='h-6 w-6' />
      </button>
      <Flowbite theme={{ theme: customThemeSidebar }}>
        <SidebarFlowbite
          aria-label='Default sidebar example'
          className={`fixed md:relative top-0 left-0 h-full z-40 pt-16 md:pt-0 transition-transform duration-300 ease-in-out ${
            isCollapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'
          } `} // Added width and background color
        >
          <SidebarFlowbite.Items>
            <SidebarFlowbite.ItemGroup>
              <button onClick={toggleDropdown} className='w-full h-20 flex items-center pl-3 gap-2.5'>
                <img src='' alt='' className='w-12 h-12' />
                <p className='text-lg text-blue-800'>Hồng Phúc Lê</p>
                {isDropdownOpen && (
                  <div ref={dropdownRef} className='absolute top-20 left-20 bg-white rounded-xl shadow-lg z-50 w-52'>
                    <div className='p-2 pb-1'>
                      <a href='#' className='pl-2 hover:bg-orange-300 flex items-center gap-2 h-14 rounded-xl'>
                        <IoMdSettings className='w-6 h-6' />
                        <span className='text-2xl font-semibold'>Cài đặt</span>
                      </a>
                    </div>
                    <div className='p-2 pt-1'>
                      <a href='#' className='px-2 hover:bg-orange-300 flex items-center gap-2 h-14 rounded-xl'>
                        <MdLogout className='w-6 h-6' />
                        <span className='text-2xl font-semibold'>Đăng xuất</span>
                      </a>
                    </div>
                  </div>
                )}
              </button>
            </SidebarFlowbite.ItemGroup>
            <SidebarFlowbite.ItemGroup>
              <SidebarFlowbite.Item href='#' icon={HiOutlineViewGrid}>
                Dashboard
              </SidebarFlowbite.Item>
              <SidebarFlowbite.Item href='#' icon={SiChatbot}>
                Chatbot
              </SidebarFlowbite.Item>
              <SidebarFlowbite.Item href='#' icon={HiOutlineUserGroup}>
                Nhóm
              </SidebarFlowbite.Item>
            </SidebarFlowbite.ItemGroup>
            <SidebarFlowbite.ItemGroup>
              <div className='flex justify-between px-4'>
                <p className='text-md font-semibold'>Nhóm</p>
                <button>
                  <IoAddCircleOutline className='w-5 h-5' />
                </button>
              </div>
              <div className='w-full h-40 overflow-y-auto'>
                <SidebarFlowbite.Item href='#'>
                  <div className='flex gap-3 items-center'>
                    <img src='' alt='' className='w-6 h-6' />
                    <p>CNPM - TN01</p>
                  </div>
                </SidebarFlowbite.Item>
                <SidebarFlowbite.Item href='#'>
                  <div className='flex gap-3 items-center'>
                    <img src='' alt='' className='w-6 h-6' />
                    <p>CNPM - TN01</p>
                  </div>
                </SidebarFlowbite.Item>
                <SidebarFlowbite.Item href='#'>
                  <div className='flex gap-3 items-center'>
                    <img src='' alt='' className='w-6 h-6' />
                    <p>CNPM - TN01</p>
                  </div>
                </SidebarFlowbite.Item>
                <SidebarFlowbite.Item href='#'>
                  <div className='flex gap-3 items-center'>
                    <img src='' alt='' className='w-6 h-6' />
                    <p>CNPM - TN01</p>
                  </div>
                </SidebarFlowbite.Item>
                <SidebarFlowbite.Item href='#'>
                  <div className='flex gap-3 items-center'>
                    <img src='' alt='' className='w-6 h-6' />
                    <p>CNPM - TN01</p>
                  </div>
                </SidebarFlowbite.Item>
                <SidebarFlowbite.Item href='#'>
                  <div className='flex gap-3 items-center'>
                    <img src='' alt='' className='w-6 h-6' />
                    <p>CNPM - TN01</p>
                  </div>
                </SidebarFlowbite.Item>
                <SidebarFlowbite.Item href='#'>
                  <div className='flex gap-3 items-center'>
                    <img src='' alt='' className='w-6 h-6' />
                    <p>CNPM - TN01</p>
                  </div>
                </SidebarFlowbite.Item>
              </div>
            </SidebarFlowbite.ItemGroup>
            <div className='w-full h-24 pt-4 flex flex-col items-center'>
              <img src={upgrade} alt='' className='w-full' />
              <p className='text-lg text-center text-blue-800 pb-2'>Nâng cấp để trải nghiệm phân tích AI vượt trội</p>
              <button className='rounded-3xl bg-cyan-100 shadow-xl hover:bg-orange-300'>
                <span className='text-blue-500 w-36 h-12 flex items-center justify-center font-semibold hover:text-red-600'>
                  Nâng cấp
                </span>
              </button>
            </div>
          </SidebarFlowbite.Items>
        </SidebarFlowbite>
      </Flowbite>
    </div>
  )
}

export default Sidebar
