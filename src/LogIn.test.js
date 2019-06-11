import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils'
import LogIn from './LogIn';

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
    ReactDOM.render(<LogIn commons = {commons}/>, container);
  })
})
