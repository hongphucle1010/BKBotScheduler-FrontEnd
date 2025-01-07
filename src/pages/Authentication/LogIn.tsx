import { useSearchParams } from 'react-router-dom'
import { Spinner } from 'flowbite-react'
import { logInWithGoogle } from '../../lib/helper/authentication'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const LogIn = () => {
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const code = searchParams.get('code')
  //   const scope = searchParams.get('scope')
  //   const authuser = searchParams.get('authuser')
  //   const hd = searchParams.get('hd')
  //   const prompt = searchParams.get('prompt')

  useEffect(() => {
    if (code) {
      console.log("Code is: ", code)
      logInWithGoogle(code, dispatch).then((response) => {
        console.log(response)
      })
    }
  }, [code])

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='mb-4'>
        <Spinner aria-label='Default status example' />
      </div>
      <h1>Đang đăng nhập...</h1>
      <p>Bạn vui lòng chờ một chút nhé 😉</p>
    </div>
  )
}

export default LogIn
