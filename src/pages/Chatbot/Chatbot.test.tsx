import { addMessagePair } from '../../lib/redux/reducers/message'
import { MessagePair } from '../../lib/redux/reducers/types'
import Chatbot from './Chatbot'
import { screen, fireEvent, render } from '@testing-library/react'

const messageState: { value: MessagePair[] } = {
  value: []
}

vi.mock('../../lib/redux/reducers/message', () => ({
  addMessagePair: vi.fn()
}))

vi.mock('react-redux', () => ({
  useSelector: vi.fn(() => messageState.value),
  useDispatch: vi.fn(() => vi.fn())
}))

describe('Chatbot component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<Chatbot />)
    expect(screen.getByText('Tính năng đang hoàn thiện.')).toBeInTheDocument()
  })

  it('sends message and displays it in the message box', async () => {
    render(<Chatbot />)
    const input = screen.getByPlaceholderText('Type a message')
    fireEvent.change(input, { target: { value: 'Hello' } })
    fireEvent.click(screen.getByLabelText('Send message'))
    expect(addMessagePair).toHaveBeenCalledTimes(1)
    expect(addMessagePair).toHaveBeenCalledWith([{ content: 'Hello' }, { content: '' }])
  })

  it('sends message when Enter key is pressed', async () => {
    render(<Chatbot />)
    const input = screen.getByPlaceholderText('Type a message')
    fireEvent.change(input, { target: { value: 'Hello' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
    expect(addMessagePair).toHaveBeenCalledTimes(1)
    expect(addMessagePair).toHaveBeenCalledWith([{ content: 'Hello' }, { content: '' }])
  })
})
