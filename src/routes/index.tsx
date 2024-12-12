import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from '../layout/MainLayout/MainLayout'
import { useSelector } from 'react-redux'
import { RootState } from '../lib/redux/store'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import Dashboard from '../pages/Dashboard/Dashboard'
import LandingPage from '../pages/LandingPage/LandingPage'
import LogOut from '../pages/TestingPage/LogOut'

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
      path: '/logout',
      element: (
        <MainLayout>
          <LogOut />
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
