import React from 'react'
import VoteButton from './VoteButton'

function BallotPaper (props) {
  return (
    <article>
      <h2 className="topic-heading">{props.topic}</h2>
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
              clickToHideWinnerFn = {props.clickToHideWinnerFn}
              showWinner = {props.showWinner}
            />
          </section>
        )}
      </div>
    </article>
  )
}

export default BallotPaper