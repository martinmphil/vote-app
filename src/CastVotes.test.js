import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import CastVotes from './CastVotes'

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

const polling = true

let container

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

it('renders', () => {
  act(() => {
    ReactDOM.render(<CastVotes 
      commons = {commons}
      candidates = {candidates}
      votes = {votes}
      polling = {polling}
    />, container)
  })

})
