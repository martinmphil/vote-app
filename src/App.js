import React, { useState } from 'react'
import db from './private/privateData'
import './App.css'
import ClearVotesButton from './ClearVotesButton'
import LogIn from './LogIn'
import BallotPaper from './BallotPaper'
import AfterVoting from './AfterVoting'

function App() {

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

  const commons = [
    "Mar",
    "Star",
    "York",
    "Flff",
    "Crit"
  ]

  const [user, setUser] = useState(commons[0])
  const [votes, setVotes] = useState([])




  // Realtime ballot update
  // const voteRef = db.collection('an_organiser').doc('2019-06-17T09:22:33.456Z')
  // const getRealtimeBallotUpdates = function() {
  //   voteRef.onSnapshot(function (doc) {
  //     if (doc && doc.exists) {
  //       const myData = doc.data()
  //       console.log('getRealtimeVoteUpdates')
  //       console.log(myData)
  //     }
  //   })
  // }
  // getRealtimeBallotUpdates()




  // Determine components inside main tag before and after voting.
  function MainXhtml() {
    let eligible = true
    votes.forEach( (vote) => { if ( vote.user === user ) { eligible = false} })
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

  const handleVote = (candidateIndex) => {

    const userIndex = commons.indexOf(user)

    voteUpdateCloud( (userIndex.toString()), candidateIndex)

    console.log('My user number is ' + userIndex.toString())
    console.log('My candidate number is ' + candidateIndex)
    console.log('candidate is ' + (candidates[candidateIndex]) )

    // setVotes([...votes,
    // { votedFor: candidateIndex, user: userIndex, timeStamp: new Date() }
    // ])
  }

  const voteUpdateCloud = (userIndex, candidateIndex) => {

    const userDocRef = userIndex.toString()

    const voteRef =
      db.collection('an_organiser').doc('2019-06-17T09:22:33.456Z')
      .collection('commons').doc(userDocRef)

    console.log('I am going to save ' + candidateIndex)
    voteRef.update({
      v: candidateIndex
    })
    .then(function(){
      console.log('vote cast')
    })
    .catch(function(err) {
      console.log('Error on set fn is ', err)
    })

  }

  return (
    <div className="App">

      <ClearVotesButton commons = {commons} />

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
