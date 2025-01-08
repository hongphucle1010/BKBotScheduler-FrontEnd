import { fireEvent, render, screen } from '@testing-library/react'
import LandingPage from './LandingPage'

describe('Landing page tests', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { href: '' }
    })
  })

  it('should redirect to google login page when clicking on the google login button', () => {
    render(<LandingPage />)
    const button = screen.getAllByLabelText('Sign in with Google')
    fireEvent.click(button[0])
    expect(window.location.href).toBe('http://103.82.133.50:5000/auth/login')
  })
})
