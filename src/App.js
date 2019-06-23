import React, { useState, useCallback } from 'react'
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

  // Index of votes array exactly matches the index of commons array,
  // thus correlating cast votes to specific users.
  // Votes array elements are preset to a value of 999999.
  // When a vote is cast, the votes array records the number value 
  // of the index for their preference in the candidate array.

  const checkForNewCloudVotes = useCallback(() => {
    console.log('checking for new votes')
    const cloudCommons = 
      db.collection('an_organiser').doc('2019-06-17T09:22:33.456Z').collection('commons')
    
    cloudCommons.get().then( querySnapshot => {
      querySnapshot.forEach( doc => {
        // doc.data() is never undefined for query doc snapshots
        const userIndex = parseInt(doc.id)
        const cloudVote = doc.data().v
        if (
          // User is within this commons
          userIndex < commons.length
          // Ignoring own votes
          && userIndex !== commons.indexOf(user)
          // Cloud record differs from local record
          && votes[userIndex] !== cloudVote
        )
        {
          const votesUpdatedFromCloud = 
            votes.map( (x, index) => index === userIndex ? cloudVote : x )
          setVotes(votesUpdatedFromCloud)
        }
        });
      })
      .catch( error => {
        console.log("Error contacting cloud:", error);
      });
  }, [commons, user, votes] );

  checkForNewCloudVotes()

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
        checkCloud = {checkForNewCloudVotes}
      />
    )}
  }

  const handleLogin = (e) => { setUser(e.target.value) }

  const handleVote = (candidateIndex) => {

    const userIndex = commons.indexOf(user)

    // Set votes by mapping votes array unchanged except at
    // the index number for this user in the commons
    // where this single value is updated to the index number of their preferred candidate.
    setVotes(
      votes.map( (v, index) => {return ( index === userIndex ? candidateIndex : v ) })
    )

    sendVoteToCloud( (userIndex.toString()), candidateIndex)

  }

  const sendVoteToCloud = (userIndex, candidateIndex) => {

    const voteRef =
      db.collection('an_organiser').doc('2019-06-17T09:22:33.456Z')
      .collection('commons').doc( userIndex.toString() )

    voteRef.update({
      v: candidateIndex
    })
    .catch(function(err) {
      console.log('Error on set fn:- ', err)
    })
  }

  const clearLocalVotes = () => {
    const n = votes.map( (p, index) => index === commons.indexOf(user) ? 999999 : p )
    setVotes(n)
  }


  return (
    <div className="App">

      <ClearVotesButton
        commons = {commons}
        handleClearLocalVotes = {clearLocalVotes}
      />

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
