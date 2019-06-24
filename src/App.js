import React, { useState, useEffect } from 'react'
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

  // Index of votes array exactly matches the index of commons array,
  // thus correlating cast votes to specific users.
  // Votes array elements are preset to a value of 999999.
  // When a vote is cast, the votes array records the number value 
  // of the index for their preference in the candidate array.

  // Set App state.
  const [user, setUser] = useState( commons[0] )
  const [votes, setVotes] = useState([])
  const [askCloud, setAskCloud] = useState(false)

  useEffect( () => {
    // To REMOVE
    console.log('checking for new votes')
    const fetchData = async () => {
      const cloudData = await(
        db.collection('an_organiser').doc('2019-06-17T09:22:33.456Z').collection('commons')
        .get().then( querySnapshot =>
          querySnapshot.docs.map( doc => doc.data().v )
        )
      )
      // To REMOVE
      console.log(cloudData.slice(0, commons.length) )
      setVotes( cloudData.slice(0, commons.length) )      
    }
    fetchData()
  }, [commons.length, askCloud])
  // Calling checkCloudFn changes askCloud dependency which triggers an update from the cloud.
  function checkCloudFn() {
    setAskCloud(true)
    console.log('setting ask cloud to true')
  }



  // CONVERT TO ASNYC AWAIT
  const sendVoteToCloud = (userIndex, candidateIndex) => {

    // To REMOVE
    console.log('sending votes to the cloud');
    

    const voteRef =
      db.collection('an_organiser').doc('2019-06-17T09:22:33.456Z')
      .collection('commons').doc( userIndex.toString() )

    voteRef.update({
      v: candidateIndex
    })
    .catch(function(err) {
      console.log('Error setting cloud db:- ', err)
    })
  }

  const handleVote = (candidateIndex) => {
    const userIndex = commons.indexOf(user)
    // Set votes by mapping votes array unchanged except at
    // the index number for this user in the commons
    // where this single value is updated to the index number of their preferred candidate.

    // To REMOVE
    console.log('handling vote');
    
    setVotes(
      votes.map( (v, index) => {return ( index === userIndex ? candidateIndex : v ) })
    )

    sendVoteToCloud( (userIndex.toString()), candidateIndex)
  }






  const handleLogin = (e) => { setUser(e.target.value) }

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
        checkCloudFn = {checkCloudFn}
      />
    )}
  }


  return (
    <div className="App">

      {//NB true && expression evaluates to expression, false && expression evaluates to false.
        (commons.indexOf(user) === 0) &&
        <ClearVotesButton
          commons = {commons}
          checkCloudFn = {checkCloudFn}
        />
      }

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
