import React from 'react'

function LogIn (props) {
  return (
    <div className="current-user">
      Logged-in as <span className="user-name">{props.user}</span>. &nbsp;
      <label className="current-user" htmlFor="login">
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