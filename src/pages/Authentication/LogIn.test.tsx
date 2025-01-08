import { render, screen, waitFor } from '@testing-library/react'
import LogIn from './LogIn'
import { logInWithGoogle } from '../../lib/helper/authentication'

// Mock logInWithGoogle
vi.mock('../../lib/helper/authentication', () => ({
  logInWithGoogle: vi.fn(() => Promise.resolve('success'))
}))

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(() => vi.fn())
}))

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useSearchParams: vi.fn(() => [new URLSearchParams('?code=123'), vi.fn()])
  }
})

describe('LogIn component', () => {
  beforeEach(() => {
    // Clear all mocks to reset call counts between tests
    vi.clearAllMocks()
  })

  it('renders spinner and loading text', () => {
    render(<LogIn />)
    expect(screen.getByLabelText('Default status example')).toBeInTheDocument()
    expect(screen.getByText('Đang đăng nhập...')).toBeInTheDocument()
  })

  it('calls logInWithGoogle if code param is present', async () => {
    render(<LogIn />)

    await waitFor(() => {
      expect(logInWithGoogle).toHaveBeenCalledTimes(1)
      expect(logInWithGoogle).toHaveBeenCalledWith('123', expect.any(Function))
    })
  })
})
