import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Spinner } from 'flowbite-react'

const LogIn = () => {
  const [searchParams] = useSearchParams()

  const code = searchParams.get('code')
  const scope = searchParams.get('scope')
  const authuser = searchParams.get('authuser')
  const hd = searchParams.get('hd')
  const prompt = searchParams.get('prompt')

  useEffect(() => {
    console.log({
      code,
      scope,
      authuser,
      hd,
      prompt
    })

    console.log(searchParams)
  }, [code, scope, authuser, hd, prompt, searchParams])

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
