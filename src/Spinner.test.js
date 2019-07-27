import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import Spinner from './Spinner'

const votes = [0, 0, 1]

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
    ReactDOM.render(<Spinner 
      commons = {commons}
      votes = {votes}
    />, container)
  })

})

