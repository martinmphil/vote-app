import React from 'react'
import VoteButton from './VoteButton'

function BallotPaper (props) {
  return (
    <article>
      <p><em>Mr/Ms {props.user}</em>, please cast your vote.</p>
      {props.candidates.map( (candidate, index) => 
        <section
          key = {candidate}
          className = "candidate"
        >
          {candidate}
          <VoteButton
            candidateNbr = {index + 1}
            handleVote = {props.handleVote}
          />
        </section>
      )}
    </article>
  )
}

export default BallotPaper