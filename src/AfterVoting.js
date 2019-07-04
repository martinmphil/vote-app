import React from 'react'

function AfterVoting (props) {

  function LeagueTable() {

    // pollResults, ordered by popularity, 
    // contains array of {candidate: "candidate_x", popularity: number}
    const pollResults = props.candidates.map(
      (c, index) => { return (
        {candidate: c, popularity: (props.votes.filter( v => v === index ).length ) }
      )})
      .filter( p => p.popularity > 0 )
      .sort( (a, b) => b.popularity - a.popularity)

    function listings (array) {
      return array.map(d => 
        <li key={d.candidate}>
          "{d.candidate}"" gained {d.popularity}
          {d.popularity === 1 ? ' vote' : ' votes'}
        </li>
      )
    }

    let leagueTableXhtml
    
    // test for tied result
    if (pollResults.length > 1
      && pollResults[0].popularity === pollResults[1].popularity)
    {
      let runnersUp = pollResults.filter(j => j.popularity !== pollResults[0].popularity);

      if (runnersUp.length > 0)
      {runnersUp = (
        <div>
          <h4>Runners up</h4>
          <ul>
            {listings(runnersUp)}
          </ul>
        </div>
      )};

      leagueTableXhtml = (
      <section>
        <h3>Joint winners</h3>
        <ul>
          {listings(pollResults.filter(j => j.popularity === pollResults[0].popularity) )}
        </ul>
        {runnersUp}
      </section>
      )
    } else {
      leagueTableXhtml = (<ol>{listings(pollResults)}</ol>)
    }
    
    return leagueTableXhtml
  }

  function CheckForNewVotesButton() {
    return (
      <div>
        <p>Still voting</p>
        <button 
          type="button"
          className="check-for-new-votes"
          onClick= {props.checkCloudFn}
        >
          Check for new votes
        </button>
      </div>
    )
  }

  return (
    <article>

      <div className="results-table">
        <h4>Results</h4>
        <LeagueTable />
      </div>

      <div>
        {(props.votes.filter(v => v === 999999).length <= 0 ) ? 'Poll closed' : <CheckForNewVotesButton /> }
      </div>

      <h4>Votes Cast</h4>
      <div className="cast-votes-container">
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
      </div>
    </article>
  )
}

export default AfterVoting