import React from "react";

function LogIn(props) {
  return (
    <form>
      <label htmlFor="login">
        Logged-in as <strong>{props.user}</strong>
      </label>
      <select defaultValue={""} id="login" name="login" onChange={props.handleLogin}>
        <option value="" disabled>
          Change user
        </option>
        {props.commons.map(user => (
          <option key={user} value={user}>
            {user}
          </option>
        ))}
      </select>
    </form>
  );
}

export default LogIn;
