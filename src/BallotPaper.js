import React from 'react'
import VoteButton from './VoteButton'

function BallotPaper (props) {
  return (
    <article>
      <p className="user-name"><em>{props.user}</em>, please cast your vote.</p>
      <h2 className="topicHeading">{props.topic}</h2>
      <div className="ballot-paper-container">
        {props.candidates.map( (candidate, index) => 
          <section
            key = {candidate}
            className = "candidate"
          >
            {candidate}
            <VoteButton
              candidateIndex = {index}
              handleVote = {props.handleVote}
            />
          </section>
        )}
      </div>
    </article>
  )
}

export default BallotPaper