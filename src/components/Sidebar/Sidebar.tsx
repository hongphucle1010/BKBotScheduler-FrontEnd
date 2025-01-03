import { Avatar, Sidebar as SidebarFlowbite } from 'flowbite-react'
import type { CustomFlowbiteTheme } from 'flowbite-react'
import { HiMenu, HiOutlineViewGrid } from 'react-icons/hi'
import { SiChatbot } from 'react-icons/si'
import { HiOutlineUserGroup } from 'react-icons/hi2'
import { useState, useRef, useEffect } from 'react'
import { Flowbite } from 'flowbite-react'
import { IoAddCircleOutline } from 'react-icons/io5'
import { IoMdSettings } from 'react-icons/io'
import { MdLogout } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { RootState } from '../../lib/redux/store'
import { Link, useNavigate } from 'react-router-dom'
import { TbLayoutSidebarLeftCollapseFilled } from 'react-icons/tb'
import { getImageFromIndexedDB } from '../../lib/helper/indexeddb'

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

const Sidebar: React.FC = () => {
  const navigate = useNavigate() // Hook for programmatic navigation

  const handleRedirect = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault() // Prevent default link behavior

    const href = event.currentTarget.getAttribute('href')

    if (href) {
      // Check if href exists
      navigate(href)
    }
  }

  const user = useSelector((state: RootState) => state.user.value)

  const [isCollapsed, setIsCollapsed] = useState(true) // Initially collapsed on mobile
  const [isDropdownOpen, setIsDropdownOpen] = useState(false) // State for dropdown visibility
  const dropdownRef = useRef<HTMLDivElement>(null) // Ref for the dropdown
  const sidebarRef = useRef<HTMLDivElement>(null) // Add ref for SidebarFlowbite
  const [avatarUrl, setAvatarUrl] = useState('') // State for avatar URL

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

  // Handle clicks outside the sidebar to collapse it
  useEffect(() => {
    const handleClickOutsideSidebar = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsCollapsed(true)
      }
    }

    document.addEventListener('mousedown', handleClickOutsideSidebar)
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideSidebar)
    }
  }, [sidebarRef])

  useEffect(() => {
    getImageFromIndexedDB()
      .then((url) => {
        setAvatarUrl(url)
      })
      .catch(() => setAvatarUrl(user.avatar))
  }, [])

  const groups = useSelector((state: RootState) => state.group.groups)

  return (
    <div className='relative'>
      {isCollapsed && (
        <button
          onClick={toggleSidebar}
          className='bg-slate-50 border-blue-400 drop-shadow-lg fixed top-2 left-2 z-50 p-2 rounded-md focus:outline-none md:hidden'
        >
          <HiMenu className='h-6 w-6' />
        </button>
      )}
      <Flowbite theme={{ theme: customThemeSidebar }}>
        <div ref={sidebarRef} className='h-full'>
          <SidebarFlowbite
            aria-label='Default sidebar example'
            className={`fixed md:relative top-0 left-0 h-full z-40   md:pt-0 transition-transform duration-300 ease-in-out ${
              isCollapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'
            } `} // Added width and background color
          >
            <TbLayoutSidebarLeftCollapseFilled
              className='fixed bottom-4 right-2 text-4xl cursor-pointer md:hidden'
              onClick={toggleSidebar}
            />
            <SidebarFlowbite.Items>
              <SidebarFlowbite.ItemGroup>
                <button onClick={toggleDropdown} className='w-full h-20 flex items-center pl-3 gap-2.5 relative'>
                  <Avatar img={avatarUrl} alt='User avatar' rounded />
                  <p className='text-lg text-blue-800'>{user.name}</p>
                  {isDropdownOpen && (
                    <div
                      ref={dropdownRef}
                      className='absolute -bottom-24 right-0 bg-white rounded-xl shadow-lg z-50 w-42'
                    >
                      <div className='p-2 pb-1'>
                        <a
                          href='#'
                          onClick={handleRedirect}
                          className='pl-2 hover:bg-orange-300 flex items-center gap-2 h-10 rounded-xl'
                        >
                          <IoMdSettings className='w-5 h-5' />
                          <span className='text-xl font-semibold'>Cài đặt</span>
                        </a>
                      </div>
                      <div className='p-2 pt-1'>
                        <Link to='/logout' className='px-2 hover:bg-orange-300 flex items-center gap-2 h-10 rounded-xl'>
                          <MdLogout className='w-5 h-5' />
                          <span className='text-xl font-semibold'>Đăng xuất</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </button>
              </SidebarFlowbite.ItemGroup>
              <SidebarFlowbite.ItemGroup>
                <SidebarFlowbite.Item href='/' icon={HiOutlineViewGrid} onClick={handleRedirect}>
                  Dashboard
                </SidebarFlowbite.Item>
                <SidebarFlowbite.Item href='/chat' icon={SiChatbot} onClick={handleRedirect}>
                  Chatbot
                </SidebarFlowbite.Item>
                <SidebarFlowbite.Item href='/group-management' icon={HiOutlineUserGroup} onClick={handleRedirect}>
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
                <div className='w-full h-40 overflow-y-auto beautiful-scrollbar'>
                  {groups.map((group) => (
                    <SidebarFlowbite.Item
                      href={`/group-management/${group.id}`}
                      onClick={handleRedirect}
                      key={group.id}
                    >
                      <div className='flex gap-3 items-center'>
                        <Avatar img={group.avatar} alt='Group avatar' size='sm' />
                        <p>{group.name}</p>
                      </div>
                    </SidebarFlowbite.Item>
                  ))}
                </div>
              </SidebarFlowbite.ItemGroup>
            </SidebarFlowbite.Items>
          </SidebarFlowbite>
        </div>
      </Flowbite>
    </div>
  )
}

export default Sidebar
