// import { GoogleLogin } from '@react-oauth/google'

// const SigninButtonGG: React.FC = () => {
//   return (
//     <GoogleLogin
//       onSuccess={(credentialResponse) => {
//         console.log(credentialResponse)
//       }}
//       onError={() => {
//         console.log('Login Failed')
//       }}
//       auto_select
//       shape='pill'
//     />
//   )
// }

// export default SigninButtonGG

import { useGoogleLogin } from '@react-oauth/google'
import ggLogo from '../../assets/LandingPage/gg-logo.png'

const SigninButtonGG: React.FC = () => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse)
    },
    hosted_domain: 'hcmut.edu.vn'
  })

  return (
    <button className='p-2 bg-gray-200 rounded-full font-semibold flex gap-2 items-center' onClick={() => login()}>
      <img src={ggLogo} alt='google logo' />
      <span>Sign in with Google</span>
    </button>
  )
}

export default SigninButtonGG
