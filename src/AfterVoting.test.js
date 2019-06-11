import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import AfterVoting from './AfterVoting'

const votes = [
  { votedFor: 'option1', user: 'user1', timeStamp: new Date(2000) },
  { votedFor: 'option2', user: 'user2', timeStamp: new Date(2001) },
  { votedFor: 'option3', user: 'user3', timeStamp: new Date(2002) }
]

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
    ReactDOM.render(<AfterVoting 
      commons = {commons}
      candidates = {candidates}
      votes = {votes}
    />, container)
  })

})
