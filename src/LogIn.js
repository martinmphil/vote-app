import React from 'react'

function LogIn (props) {
  return (
    <form>
      <label htmlFor="login">
        Logged-in as <strong>{props.user}</strong>.
      </label>
      <select
        id="login" name="login"
        onChange={props.handleLogin}
      >
        <option value="">Change user</option>
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



    // <div>
    //   Logged-in as <strong>{props.user}</strong>. &nbsp;
    //   <label htmlFor="login">
    //     Change user➜
    //   </label>
    //   <select
    //     id="login" name="login"
    //     onChange={props.handleLogin}
    //   >
    //     {props.commons.map( user =>
    //       <option
    //         key = {user}
    //         value = {user}
    //       >
    //         {user}
    //       </option>
    //     )}
    //   </select>
    // </div>