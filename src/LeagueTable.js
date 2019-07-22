import React from 'react'

function LeagueTable (props) {

  // Extra cloud entires produce a votes array too long for this commons
  // hence votes.slice(0, props.commons.length)

  // pollResults, ordered by popularity, 
  // contains array of {candidate: "candidate_x", popularity: number}
  const pollResults = props.candidates.map(
    (c, index) => { return (
      {candidate: c, popularity: (props.votes.filter( v => v === index ).length ) }
    )})
    .filter( p => p.popularity > 0 )
    .sort( (a, b) => b.popularity - a.popularity )

  function listings (array) {
    return array.map(d => 
      <li key={d.candidate}>
        "{d.candidate}"" gained {d.popularity}
        {d.popularity === 1 ? ' vote' : ' votes'}
      </li>
    )
  }





    
  // test for tied result
  if (pollResults.length > 1
    && pollResults[0].popularity === pollResults[1].popularity)
  {
    let runnersUp = pollResults.filter(j => j.popularity !== pollResults[0].popularity)

    return (
      <section>
        <h3>Joint winners</h3>
        <ul>
          {listings(pollResults.filter(j => j.popularity === pollResults[0].popularity) )}
        </ul>
        {(runnersUp.length > 0) && <h4>{runnersUp.length === 1 ? 'Runner' : 'Runners'} up</h4>}
        <ul>{listings(runnersUp)}</ul>
      </section>
    )
  } else {
    let alsoRan = pollResults.slice(1)
    return (
      <section>
        <h3>
          Winner
        </h3>
        <ul>
          { (pollResults.length > 0) && listings( pollResults.slice(0,1) ) }
        </ul>
        {(alsoRan.length > 0) && <h4>{alsoRan.length === 1 ? 'Runner' : 'Runners'} up</h4>}
        <ul>{listings(alsoRan)}</ul>
      </section>
    )
  }
}

export default LeagueTable