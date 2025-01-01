import ggLogo from '../../assets/LandingPage/gg-logo.png'
const SigninButtonGG: React.FC = () => {
  return (
    <button
      className='p-2 bg-gray-200 rounded-full font-semibold flex gap-2 items-center'
      onClick={() => (location.href = 'http://103.82.133.50:5000/auth/login')}
    >
      <img src={ggLogo} alt='google logo' />
      <span className='text-sm md:text-base'>Sign in with Google</span>
    </button>
  )
}

export default SigninButtonGG
