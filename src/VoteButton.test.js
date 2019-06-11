import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import VoteButton from './VoteButton'

const handleVote = jest.fn()

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

it('renders and reacts to button clicks', () => {
  act(() => {
    ReactDOM.render(<VoteButton handleVote={handleVote} />, container)
  })

  const button = container.querySelector('.voteButton')
  expect(button.getAttribute('type')).toMatch(/button/)

  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}))
  })
  expect(handleVote).toHaveBeenCalled()
})
