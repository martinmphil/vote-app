import React from 'react'

function VoteButton (props) {

  let mistyButtonStyle

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
      onClick={ () => {
        return (props.showWinner ?
          props.clickToHideWinnerFn() :
          props.handleVote(props.candidateIndex)
        )}
      }
    >
      Vote
    </button>
  )
}

export default VoteButton