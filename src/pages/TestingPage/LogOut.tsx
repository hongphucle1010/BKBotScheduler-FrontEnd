import { useDispatch } from 'react-redux'
import { logOut } from '../../lib/helper/authentication'

const LogOut = () => {
  const dispatch = useDispatch()
  logOut(dispatch)
  return <></>
}

export default LogOut
