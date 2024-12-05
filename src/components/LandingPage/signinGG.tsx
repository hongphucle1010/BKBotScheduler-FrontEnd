import ggLogo from '../../assets/LandingPage/gg-logo.png'

const signinButtonGG: React.FC = () => {
  return (
    <button className='p-2 bg-gray-200 rounded-full font-semibold flex gap-2 items-center'>
      <img src={ggLogo} alt='google logo' />
      <span>Sign in with Google</span>
    </button>
  )
}

export default signinButtonGG
