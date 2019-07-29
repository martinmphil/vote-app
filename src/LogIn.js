import React from 'react'

function LogIn (props) {
  return (
    <div>
      Logged-in as <strong>{props.user}</strong>. &nbsp;
      <label htmlFor="login">
        Change user➜
      </label>
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
    </div>
)
}

export default LogIn