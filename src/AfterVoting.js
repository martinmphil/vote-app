import React from 'react'

function AfterVoting (props) {

  function LeagueTable() {

    // pollResults is a ranked array of {candidate: "candidate_x", popularity: number}
    const pollResults = props.candidates.map(
      (c, index) => { return (
        {candidate: c, popularity: (props.votes.filter( v => v === index ).length ) }
      )})
      .filter( p => p.popularity > 0 )
      .sort( (a, b) => b.popularity - a.popularity) 

    return (
      <ol>{pollResults.map( w => {return (
        <li key={w.candidate}>
          "{w.candidate}" gained {w.popularity} votes
        </li>
      )})}</ol>
    )
  }

  return (
    <article>
      <button type="button" onClick= {props.checkCloud}>
        Check for new votes
      </button>
      <p>
        {(props.votes.filter(v => v === 999999).length <= 0 ) ? 'Poll closed' : 'Still voting'}
      </p>

      <LeagueTable />

      <h4>Votes Cast</h4>
      {props.votes.map(
        (v, index) => {
          const user = props.commons[index]
          if (v === 999999) {
            return (
            <section
              key={user}
              className = "castVote"
            >
              <p>No vote from {user}.</p>
            </section>
          )
          } else {
            return (
            <section
              key={user}
              className = "castVote"
            >
              <p>{user} voted for:- "{props.candidates[v]}"</p>
            </section>
          )
          }
        }
      )}
    </article>
  )
}

export default AfterVoting