import React from 'react'

function CastVotes (props) {

  // Extra cloud entires produce a votes array too long for this commons
  // hence votes.slice(0, props.commons.length)

  return (
    <article>

      {//NB true && expression evaluates to expression; false && expression evaluates to false.
        (props.votes.filter(v => v < 999999).length >= props.commons.length) &&
        <p>Poll closed</p>
      }

      <h1 className="subtle-heading" >Votes Cast</h1>
      <ul>
        {props.votes.slice(0, props.commons.length).map(
          (v, index) => {
            const user = props.commons[index]
            if (v === 999999) {
              return (
              <li
                key={user}
              >
                <p>No vote from {user}.</p>
              </li>
            )
            } else {
              return (
              <li
                key={user}
              >
                <p>{user} voted for "{props.candidates[v]}"</p>
              </li>
            )
            }
          }
        )}
      </ul>
    </article>
  )
}

export default CastVotes