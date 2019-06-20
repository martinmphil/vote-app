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

  // Votes array index === userIndex.
  // and array elements start at 999999, before recording cast votes 
  // as number values corresponding to candidateIndex

  // Realtime ballot update
  // const getRealtimeBallotUpdates = function() {

  //   db.collection('an_organiser').doc('2019-06-17T09:22:33.456Z')
  //     .collection('commons').onSnapshot(function(querySnapshot) {
  //     querySnapshot.forEach(function(doc) {
  //         // doc.data() is never undefined for query doc snapshots
  //         console.log("doc id is ", doc.id, " and it contains ", doc.data());
  //     });
  //   });
  // }
  // getRealtimeBallotUpdates()







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

    console.log('My user number is ' + userIndex.toString())
    console.log('My candidate number is ' + candidateIndex)
    console.log('candidate is ' + (candidates[candidateIndex]) )

  }

  const voteUpdateCloud = (userIndex, candidateIndex) => {

    const userDocRef = userIndex.toString()

    // const voteRef =
    //   db.collection('an_organiser').doc('2019-06-17T09:22:33.456Z')
    //   .collection('commons').doc(userDocRef)

    // console.log('I am going to save ' + candidateIndex)
    // voteRef.update({
    //   v: candidateIndex
    // })
    // .then(function(){
    //   console.log('vote cast')
    // })
    // .catch(function(err) {
    //   console.log('Error on set fn is ', err)
    // })

  }

// REMOVE
console.log('this is my votes array')
console.log(votes)




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
