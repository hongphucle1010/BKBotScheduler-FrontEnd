import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Router from './routes'
import { useEffect } from 'react'
import { REFRESH_TOKEN_EXPIRED } from './api'
import { logOut } from './lib/helper/authentication'
import { getMyGroupsApi } from './api/group/group'
import { setGroups } from './lib/redux/reducers/group'
import { RootState } from './lib/redux/store'

function App() {
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.value)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user.role === 'STUDENT') {
          const groups = await getMyGroupsApi()
          dispatch(setGroups(groups.groups))
        }
      } catch (error) {
        if (error instanceof Error && error.message === REFRESH_TOKEN_EXPIRED) {
          logOut(dispatch)
        } else throw error
      }
    }
    fetchData()
  }, [])

  return <Router />
}

export default App
