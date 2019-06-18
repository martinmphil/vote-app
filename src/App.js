import React, { useState } from 'react'
import db from './private/privateData'
import './App.css'
import LogIn from './LogIn'
import BallotPaper from './BallotPaper'
import AfterVoting from './AfterVoting'

function App() {

  const commons = [
    "Mar",
    "Star",
    "York",
    "Flff",
    "Crit"
  ]

  const topic = "Framework for developing new Testers' App."

  const candidates = [
    "Function components in create-react-app",
    "Classes in create-react-app",
    "Wait for React suspense",
    "Vue cli create app",
    "Nuxt",
    "Wait for Vue 3",
    "Angular",
    "Elm",
    "Vanilla JavaScript"
  ]

  const [user, setUser] = useState(commons[0])
  const [votes, setVotes] = useState([])



  // Realtime ballot update
  const voteRef = db.collection('an_organiser').doc('2019-06-17T09:22:33.456Z')
  const getRealtimeVoteUpdates = function() {
    voteRef.onSnapshot(function (doc) {
      if (doc && doc.exists) {
        const myData = doc.data()
        console.log(myData)
      }
    })
  }
  getRealtimeVoteUpdates()




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
    if (candidateX) { // if clause for testing ONLY
      voteFn ('a', 12)
    }
    // setVotes([...votes,
    // { votedFor: candidateX, user: user, timeStamp: new Date() }
    // ])
  }

  const voteFn = (userCodeName, candidateCodeNumber) => {
    const voteRef = db.collection('an_organiser').doc('2019-06-17T09:22:33.456Z')
    let voteCast = 11
    console.log('I am going to save ' + voteCast)
    voteRef.set({
      a: voteCast
    }, { merge: true }).then(function(){
      console.log('vote cast')
    }).catch(function(err) {
      console.log('my error was ', err)
    })

  }

  return (
    <div className="App">

      <LogIn
        commons = {commons}
        handleLogin = {handleLogin}
      />

      <main>
        <h1>Vote app</h1>
        <h2>{topic}</h2>
        <MainXhtml />
        <hr />
      </main>

    </div>
  )
}

export default App
