import React from 'react'
import VoteButton from './VoteButton'

function BallotPaper (props) {
  return (
    <article>
      <h2 className="topicHeading">{props.topic}</h2>
      <div className="ballot-paper-container">
        {props.candidates.map( (candidate, index) => 
          <section
            key = {candidate}
            className = "candidate"
          >
            {candidate}
            {props.online &&
              <VoteButton
                candidateIndex = {index}
                handleVote = {props.handleVote}
              />
            }
          </section>
        )}
      </div>
    </article>
  )
}

export default BallotPaper