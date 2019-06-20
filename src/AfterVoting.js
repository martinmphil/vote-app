import React from 'react'


function AfterVoting (props) {

  // Rank results for popularity (then chronology) as
  //{candidate: string, popularity: number}

  // const pollResults = props.candidates.map( 
  //   c => { 
  //     return (
  //       {candidate: c, popularity:
  //         (props.votes.map( v => v.votedFor ).filter( votedFor => votedFor === c ).length)
  //       }
  //     )
  //   }).sort( (a, b) => b.popularity - a.popularity )

  // Receive pollResults prop
  // function LeagueTable(props) {
  //   const results = props.pollResults.filter( x => x.popularity > 0 )
  //     .map( (y) => {return (
  //       <li key={y.candidate}>
  //         {y.candidate} with {y.popularity} vote(s)
  //       </li>
  //     )})
  //   return (
  //     <ol>{results}</ol>
  //   )
  // }

  return (
    <article>
      <p>
        {(props.votes.filter(v => v === 999999).length <= 0 ) ? 'Poll closed' : 'Still voting'}
      </p>

      {/* <LeagueTable pollResults={pollResults} /> */}

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