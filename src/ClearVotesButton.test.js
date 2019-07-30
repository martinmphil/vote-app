import React from 'react'
import ReactDOM from 'react-dom'
import { act } from 'react-dom/test-utils'
import ClearVotesButton from './ClearVotesButton'

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
    ReactDOM.render(<ClearVotesButton />, container)
  })

  const button = container.querySelector('.danger-button')
  expect(button.getAttribute('type')).toMatch(/button/)
})
