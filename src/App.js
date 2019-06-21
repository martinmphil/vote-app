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

  const setupVotesArray = () => {
    const result = []
    for (var i = 0; i < commons.length; i++)
      {result[i] = 999999}
    return result
  }

  const [user, setUser] = useState( commons[0] )
  const [votes, setVotes] = useState( setupVotesArray() )

  // Index of the votes array exactly matches the index of commons array,
  // thus correlating cast votes to specific users.
  // Votes array elements are preset to a value of 999999.
  // When a vote is cast, the votes array records the number value 
  // of the index for their preference in the candidate array.

  // Realtime ballot update
  const getRealtimeBallotUpdates = function() {

    const cloudBallotState = []

    db.collection('an_organiser').doc('2019-06-17T09:22:33.456Z')
      .collection('commons').onSnapshot(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log('my doc id is', doc.id, 'and my doc data is ', doc.data())
        // construct cloud version of votes array
        if (doc.id < votes.length) {
          cloudBallotState[parseInt(doc.id)] = doc.data().v
        }
      });
    });
    if (cloudBallotState !== votes) {
      console.log('cloud and local did NOT match');
    }
    console.log(cloudBallotState);
    console.log(votes);
    
  }
  getRealtimeBallotUpdates()







  // Determine components inside main tag before and after voting.
  function MainXhtml() {
    if (votes[commons.indexOf(user)] === 999999) { return (
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

    // Set votes by mapping votes array unchanged except at 
    // the index number for this user in the commons
    // which is updated to the index number of their preferred candidate.
    setVotes(
      votes.map ( (v, index) => {return ( index === userIndex ? candidateIndex : v ) })
    )

    voteUpdateCloud( (userIndex.toString()), candidateIndex)

  }

  const voteUpdateCloud = (userIndex, candidateIndex) => {

    const userDocRef = userIndex.toString()

    const voteRef =
      db.collection('an_organiser').doc('2019-06-17T09:22:33.456Z')
      .collection('commons').doc(userDocRef)

    voteRef.update({
      v: candidateIndex
    })
    .then(function(){
      console.log('vote cast')
    })
    .catch(function(err) {
      console.log('Error on set fn:- ', err)
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
