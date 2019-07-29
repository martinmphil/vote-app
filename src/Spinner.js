import React from 'react'

//NB true && expression evaluates to expression, false && expression evaluates to false.
function Spinner (props) {
  return (!(props.votes.length >= props.commons.length)) && <p>Loading...</p>
}

export default Spinner
