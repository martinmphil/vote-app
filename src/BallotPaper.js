import React from "react";
import VoteButton from "./VoteButton";

function BallotPaper(props) {
  return (
    <article>
      <h2 className="topic-heading">{props.topic}</h2>
      <div className="ballot-paper-container">
        {props.candidates.map((candidate, index) => (
          <section
            key={candidate}
            className={`candidate ${
              props.votes[props.commons.indexOf(props.user)] === index ? "tick" : ""
            } `}
          >
            {candidate}
            <VoteButton
              candidateIndex={index}
              user={props.user}
              votes={props.votes}
              commons={props.commons}
              handleVote={props.handleVote}
              hideWinnerFn={props.hideWinnerFn}
              showWinner={props.showWinner}
            />
          </section>
        ))}
      </div>
    </article>
  );
}

export default BallotPaper;
