import React from 'react'

function LogIn (props) {
  return (
    <form>
      <label htmlFor="login">Current user:- </label>
      <select
        id="login" name="login"
        onChange={props.handleLogin}
      >
        {props.commons.map( user =>
          <option
            key = {user}
            value = {user}
          >
            {user}
          </option>
        )}
      </select>
    </form>
  )
}

export default LogIn