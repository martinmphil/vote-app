import React from 'react'

function VoteButton (props) {
  return (
    <button
      className = "voteButton"
      type="button"
      onClick={ () => props.handleVote(props.candidate) }
    >
      Vote
    </button>
  )
}

export default VoteButton