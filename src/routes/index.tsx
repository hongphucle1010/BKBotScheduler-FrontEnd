import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from '../layout/MainLayout/MainLayout'
import { useSelector } from 'react-redux'
import { RootState } from '../lib/redux/store'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import Dashboard from '../pages/Dashboard/Dashboard'
import LandingPage from '../pages/LandingPage/LandingPage'
import LogOut from '../pages/Authentication/LogOut'
import Chatbot from '../pages/Chatbot/Chatbot'
import GroupManagementPage from '../pages/GroupManagementPage/GroupManagementPage'
import SettingPage from '../pages/SettingPage/SettingPage'
import GroupDetailPage from '../pages/GroupDetailPage/GroupDetailPage'
import PersonalEvent from '../pages/PersonalEvent/PersonalEvent'
import LogIn from '../pages/Authentication/LogIn'
import LogInRedirect from '../pages/Authentication/LogInRedirect'

const Router: React.FC = () => {
  const role = useSelector((state: RootState) => state.user.value.role)
  const userRoutes = [
    {
      path: '/',
      element: (
        <MainLayout>
          <Dashboard />
        </MainLayout>
      ),
      errorElement: <ErrorPage />
    },
    {
      path: '/group-management',
      element: (
        <MainLayout>
          <GroupManagementPage />
        </MainLayout>
      ),
      errorElement: <ErrorPage />
    },
    {
      path: '/group-management/:groupId',
      element: (
        <MainLayout>
          <GroupDetailPage />
        </MainLayout>
      )
    },
    {
      path: '/chat',
      element: (
        <MainLayout>
          <Chatbot />
        </MainLayout>
      ),
      errorElement: <ErrorPage />
    },
    {
      path: '/login',
      element: <LogInRedirect />,
      errorElement: <ErrorPage />
    },
    {
      path: '/settings',
      element: (
        <MainLayout>
          <SettingPage />
        </MainLayout>
      ),
      errorElement: <ErrorPage />
    },
    {
      path: '/logout',
      element: (
        <MainLayout>
          <LogOut />
        </MainLayout>
      ),
      errorElement: <ErrorPage />
    },
    {
      path: '/personal-event',
      element: (
        <MainLayout>
          <PersonalEvent />
        </MainLayout>
      ),
      errorElement: <ErrorPage />
    },
    {
      path: '*',
      element: <ErrorPage />,
      errorElement: <ErrorPage />
    }
  ]

  const guestRoutes = [
    {
      path: '/',
      element: <LandingPage />,
      errorElement: <ErrorPage />
    },
    {
      path: '/logout',
      element: <></>
    },
    {
      path: '/login',
      element: <LogIn />
    },
    {
      path: '*',
      element: <ErrorPage />,
      errorElement: <ErrorPage />
    }
  ]
  const adminRoutes = [
    {
      path: '/',
      element: (
        <MainLayout>
          <p>Đây là trang Admin</p>
        </MainLayout>
      ),
      errorElement: (
        <div>
          <h1>Home Error</h1>
        </div>
      )
    },
    {
      path: '*',
      element: <ErrorPage />,
      errorElement: <ErrorPage />
    }
  ]
  const routes = role === 'STUDENT' ? userRoutes : role === 'ADMIN' ? adminRoutes : guestRoutes

  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}

export default Router
