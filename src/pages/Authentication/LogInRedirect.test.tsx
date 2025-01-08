import { render } from '@testing-library/react'
import LogInRedirect from './LogInRedirect'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(() => mockNavigate)
}))

describe('LogInRedirect', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('renders and redirects properly', () => {
    render(<LogInRedirect />)
    expect(mockNavigate).toHaveBeenCalledWith('/')
  })
})
