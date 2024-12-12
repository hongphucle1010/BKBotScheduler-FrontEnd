import { useDispatch } from 'react-redux'
import { logOutReducer } from '../../lib/redux/reducers/userState'

const LogOut = () => {
  const dispatch = useDispatch()
  dispatch(logOutReducer())
  return <></>
}

export default LogOut
