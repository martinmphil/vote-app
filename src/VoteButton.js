import React from "react";

function VoteButton(props) {
  //NB In React style attributes must be objects
  let voteButtonStyle = {
    opacity: "1",
    visibility: "visible"
  };

  // Vote buttons look pale when displaying results.
  if (props.showWinner) {
    voteButtonStyle.opacity = "0.2";
  }

  // Hide vote button if current user already voted for this candidate.
  if (props.votes[props.commons.indexOf(props.user)] === props.candidateIndex) {
    voteButtonStyle.visibility = "hidden";
  }

  return (
    <button
      className="primary-button"
      style={voteButtonStyle}
      type="button"
      onClick={
        // Showing results replaces voting fn with hiding results fn.
        () => {
          return props.showWinner ? props.hideWinnerFn() : props.handleVote(props.candidateIndex);
        }
      }
    >
      {// Write "Vote" if user hasn't already voted for this candidate.
      props.votes[props.commons.indexOf(props.user)] !== props.candidateIndex ? "Vote" : "✔✔"}
    </button>
  );
}

export default VoteButton;
