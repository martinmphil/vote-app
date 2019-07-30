import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import VoteButton from './VoteButton'

const handleVote = jest.fn()
// const clickToHideWinnerFn = jest.fn()

const votes = [0, 0, 1]

const commons = [
  "user1",
  "user2",
  "user3"
]

const user = "user1"

const candidateIndex = 1

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
    ReactDOM.render(
      <VoteButton
        handleVote={handleVote}
        commons = {commons}
        votes = {votes}
        user = {user}
        candidateIndex = {candidateIndex}
      />, container)
  })

  const button = container.querySelector('.primary-button')
  expect(button.getAttribute('type')).toMatch(/button/)

  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}))
  })
  expect(handleVote).toHaveBeenCalled()
})
