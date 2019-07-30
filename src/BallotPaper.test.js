import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import BallotPaper from './BallotPaper'

const votes = [0, 0, 1]

const candidates = [
  "option1",
  "option2",
  "option3"
]

const commons = [
  "user1",
  "user2",
  "user3"
]

const user = "user1"

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

it('renders and handles vote', () => {
  const handleVote = jest.fn()
  act(() => {
    ReactDOM.render(<BallotPaper
      user = {user}
      handleVote = {handleVote}
      candidates = {candidates}
      commons = {commons}
      votes = {votes}
    />, container);
  })

  const button = container.querySelector('button')
  expect(button.getAttribute('type')).toMatch(/button/)

  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}))
  })
  expect(handleVote).toHaveBeenCalled()
})
