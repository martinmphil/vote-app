import React from 'react'


function AfterVoting (props) {

  // Rank results for popularity (then chronology) as
  //{candidate: string, popularity: number}
  const pollResults = props.candidates.map( 
    c => { 
      return (
        {candidate: c, popularity:
          (props.votes.map( v => v.votedFor ).filter( votedFor => votedFor === c ).length)
        }
      )
    }).sort( (a, b) => b.popularity - a.popularity )

  // Receive pollResults prop
  function LeagueTable(props) {
    const results = props.pollResults.filter( x => x.popularity > 0 )
      .map( (y) => {return (
        <li key={y.candidate}>
          {y.candidate} with {y.popularity} vote(s)
        </li>
      )})
    return (
      <ol>{results}</ol>
    )
  }

  return (
    <article>
      <p>
        {(props.votes.length >= props.commons.length ) ? 'Poll closed' : 'Still voting'}
      </p>

      <LeagueTable pollResults={pollResults} />

      <h4>Votes Cast</h4>
      {props.votes.map(
        (vo) => {
          // From "prop.votes" array, vote object "vo" is 
          // { votedFor: candidateIndex, user: userIndex, timeStamp: date_number }
          return (
            <section
              key={vo.timeStamp.toISOString()}
              className = "castVote"
            >
              <p>{vo.user} voted for {vo.votedFor}</p>
              <p className="timeStamp">on {vo.timeStamp.toString()}.</p>
            </section>
          )
        }
      )}
    </article>
  )
}

export default AfterVoting