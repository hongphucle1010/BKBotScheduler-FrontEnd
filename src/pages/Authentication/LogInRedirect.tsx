import { Button } from 'flowbite-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LogInRedirect = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/')
  })

  return (
    <div>
      <h1>Đang chuyển hướng...</h1>
      <div>
        <p>Nếu trang không tự điều hướng, bấm vào đây</p>
        <Button onClick={() => navigate('/')}>Trang chủ</Button>
      </div>
    </div>
  )
}

export default LogInRedirect
