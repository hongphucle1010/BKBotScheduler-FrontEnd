import { GoogleLogin } from '@react-oauth/google'

const signinButtonGG: React.FC = () => {
  return (
    <GoogleLogin
      hosted_domain='hcmut.edu.vn'
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse)
      }}
      onError={() => {
        console.log('Login Failed')
      }}
      shape='pill'
      auto_select={true}
    />
  )
}

export default signinButtonGG
