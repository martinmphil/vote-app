import React from 'react'
import VoteButton from './VoteButton'

function BallotPaper (props) {
  return (
    <article>
      <p>{props.user} please cast your vote.</p>
      {props.candidates.map( candidate => 
        <section
          key = {candidate}
          className = "candidate"
        >
          {candidate}
          <VoteButton
            candidate = {candidate}
            handleVote = {props.handleVote}
          />
        </section>
      )}
    </article>
  )
}

export default BallotPaper