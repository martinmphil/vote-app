import React from 'react'

function VoteButton (props) {

  //NB In React style attributes must be objects
  let mistyButtonStyle

  // Vote buttons look pale when displaying results.
  if (props.showWinner) {
    mistyButtonStyle = {
      opacity: '0.2'
    }
  }
  else mistyButtonStyle = {}

  return (
    <button
      className = "primary-button"
      style = {mistyButtonStyle}

      type="button"
      onClick={
        // Showing results replaces voting fn with hiding results fn.
        () => {
        return (props.showWinner ?
          props.clickToHideWinnerFn() :
          props.handleVote(props.candidateIndex)
        )}
      }
    >
      {// Write "Vote" if user hasn't already voted for this candidate. 
        (props.votes[props.commons.indexOf(props.user)]) !== props.candidateIndex ? 'Vote' : '✔✔'
      }
    </button>
  )
}

export default VoteButton