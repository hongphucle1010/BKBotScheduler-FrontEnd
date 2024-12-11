import { useGoogleLogin } from '@react-oauth/google'
import ggLogo from '../../assets/LandingPage/gg-logo.png'
import { useDispatch } from 'react-redux'
import { logInWithGoogle } from '../../lib/helper/authentication'

const SigninButtonGG: React.FC = () => {
  const dispatch = useDispatch()
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      await logInWithGoogle(codeResponse, dispatch)
    },
    hosted_domain: 'hcmut.edu.vn'
  })

  return (
    <button className='p-2 bg-gray-200 rounded-full font-semibold flex gap-2 items-center' onClick={() => login()}>
      <img src={ggLogo} alt='google logo' />
      <span className='text-sm md:text-base'>Sign in with Google</span>
    </button>
  )
}

export default SigninButtonGG
