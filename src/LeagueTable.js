import React from "react";
import LogIn from "./LogIn";

function LeagueTable(props) {
  // Extra cloud entires produce a votes array too long for this commons.
  // If needed, fix with votes.slice(0, props.commons.length)
  // Also fixed by sorting popularity > 0

  // pollResults, ordered by popularity,
  // contains array of {candidate: "candidate_x", popularity: number}
  const pollResults = props.candidates
    .map((c, index) => {
      return { candidate: c, popularity: props.votes.filter(v => v === index).length };
    })
    .filter(p => p.popularity > 0)
    .sort((a, b) => b.popularity - a.popularity);

  function listings(array) {
    return array.map(d => (
      <li key={d.candidate}>
        {d.candidate}{" "}
        <span className="tally">
          ({d.popularity}
          {d.popularity === 1 ? "vote)" : "votes)"}
        </span>
      </li>
    ));
  }

  function ResultsHeader() {
    return (
      <div className="results-overlay-header">
        <button onClick={() => props.hideWinnerFn()}>Close results</button>
        <LogIn commons={props.commons} user={props.user} handleLogin={props.handleLogin} />
      </div>
    );
  }

  function Results() {
    // test for tied first place
    if (pollResults.length > 1 && pollResults[0].popularity === pollResults[1].popularity) {
      let runnersUp = pollResults.filter(j => j.popularity !== pollResults[0].popularity);
      return (
        <div>
          <p>Front runners:-</p>
          <ul className="winners">
            {listings(pollResults.filter(j => j.popularity === pollResults[0].popularity))}
          </ul>
          {runnersUp.length > 0 && (
            <div className="also-running">
              <p>Also running:-</p>
              <ul>{listings(runnersUp)}</ul>
            </div>
          )}
        </div>
      );
    } else {
      let alsoRan = pollResults.slice(1);
      return (
        <div>
          <p>Front runner:-</p>
          <ul className="winners">{pollResults.length > 0 && listings(pollResults.slice(0, 1))}</ul>
          {alsoRan.length > 0 && (
            <div className="also-running">
              <p>Also running:-</p>
              <ul>{listings(alsoRan)}</ul>
            </div>
          )}
        </div>
      );
    }
  }

  return (
    <section className={`results-overlay ${props.overlay}`}>
      <ResultsHeader />
      <br />
      <Results />
    </section>
  );
}

export default LeagueTable;
