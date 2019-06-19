import React from 'react'

function VoteButton (props) {

  return (
    <button
      className = "voteButton"
      type="button"
      onClick={ () => props.handleVote(props.candidateNbr) }
    >
      Vote
    </button>
  )
}

export default VoteButton