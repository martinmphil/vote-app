import React from 'react'

function LogIn (props) {
  return (
    <div>
      <div className="current-user">
        You are currently logged in as:- <br/>
        <span className="user-name">{props.user} </span><br/>
        {(props.commons.indexOf(props.user) === 0) && (<span>(organiser)</span>)}
      </div>
      <form>
        <label className="current-user" htmlFor="login">
          To change user, please select from:- 
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
      </form>
    </div>
  )
}

export default LogIn