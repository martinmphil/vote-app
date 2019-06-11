import React, { useState } from 'react'
import './App.css'
import LogIn from './LogIn'
import BallotPaper from './BallotPaper'
import AfterVoting from './AfterVoting'

function App() {

  const commons = [
    "Large",
    "Big Shiny",
    "York",
    "Fluff",
    "Crit"
  ]

  const candidates = [
    "suggestion1",
    "suggestion2",
    "suggestion3",
    "suggestion4",
    "suggestion5"
  ]

  const [user, setUser] = useState(commons[0])
  const [votes, setVotes] = useState([])

  // Determine components inside main tag before and after voting.
  function MainXhtml() {
    let eligible = true
    votes.forEach( (v) => { if ( v.user === user ) { eligible = false} })
    if (eligible) { return (
      <BallotPaper
        user = {user}
        handleVote = {handleVote}
        candidates = {candidates}
      />
    )} else { return (
      <AfterVoting
        commons = {commons}
        candidates = {candidates}
        votes = {votes}
      />
    )}
  }

  const handleLogin = (e) => { setUser(e.target.value) }

  const handleVote = (candidateX) => {
    setVotes([...votes,
    { votedFor: candidateX, user: user, timeStamp: new Date() }
    ])
  }

  return (
    <div className="App">

      <LogIn
        commons = {commons}
        handleLogin = {handleLogin}
      />

      <main>
        <h1>Vote app</h1>
        <MainXhtml />
        <hr />
      </main>

    </div>
  )
}

export default App
