import React, { useState, useEffect } from 'react'
import db from './private/privateData'
import './App.css'
import ClearVotesButton from './ClearVotesButton'
import LogIn from './LogIn'
import BallotPaper from './BallotPaper'
import LeagueTable from './LeagueTable'
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
    "Crit",
    "Baz"
  ]

  // Index of votes array matches index of commons array,
  // thus correlating cast votes to specific users.
  // The cloud database presets votes array elements to a value of 999999.
  // When casting a vote, the votes array records 
  // the index value for their preference from the candidate array.

  // Set app state.
  const [user, setUser] = useState(commons[0])
  const [votes, setVotes] = useState([])
  const [eligible, setEligible] = useState(true)
  const [online, setOnline] = useState(false)
  const [polling, setPolling] = useState(true)

  // Sets local votes to cloud data.
  const fetchData = async () => {

    const cloudData = await(
      db.collection('an_organiser').doc('2019-06-17T09:22:33.456Z').collection('commons')
      .get().then( querySnapshot =>
        querySnapshot.docs.map( doc => doc.data().v )
      ).catch(function(error) {console.log("Error reading cloud data:", error)})
    )
    setVotes(cloudData)

    if (cloudData.length === 0) {setOnline(false)} else {setOnline(true)}
  }

  // Check cloud on start-up.
  useEffect( () => {
    fetchData()
  }, [])

  // Extra cloud entries will produce a votes array too long for this commons
  // hence votes.slice(0, props.commons.length)
  useEffect( () => {

    // Close poll if entire commons has voted.
    if (
      votes.length > 0 && 
      votes.slice(0, commons.length).filter(v => v !== 999999).length === commons.length
      ) {
      setPolling(false)
    }

    // Sets eligible state if handleLogin changes user.
    if (votes[commons.indexOf(user)] !== 999999) {setEligible(false)}
    else {setEligible(true)}

  }, [votes, commons, polling, user])

  const handleVote = async (candidateIndex) => {
    setEligible(false)
    const userIndex = commons.indexOf(user)
    const voteRef =
      db.collection('an_organiser').doc('2019-06-17T09:22:33.456Z')
      .collection('commons').doc( userIndex.toString() )

    await voteRef.update({v: candidateIndex})
      .catch(function(err) {console.log('Error setting cloud db:- ', err)})

    // Set local votes by mapping votes and only changing value
    // at the index number for this user in the commons.
    setVotes(
      votes.map( (v, index) => {return ( index === userIndex ? candidateIndex : v ) })
    )
    
    window.scrollTo(0,0);
  }

  // Change user.
  const handleLogin = (e) => {
    setUser(e.target.value)
  }


  return (
    <div className="App">

      {//NB true && expression evaluates to expression, false && expression evaluates to false.
      (commons.indexOf(user) === 0) &&
        <ClearVotesButton
          commons = {commons}
          fetchData = {fetchData}
        />
      }

      <LogIn
        commons = {commons}
        user = {user}
        handleLogin = {handleLogin}
      />

      <main>
        <h1 className="app-name">Vote app</h1>

        {(online === false) && 
          <p>Our ballot box is currently off line. Please try again later.</p>
        }

        {(online && eligible) && 
          <p className="user-name"><em>{user}</em>, please cast your vote.</p>
        }

        <LeagueTable 
            user = {user}
            votes = {votes}
            candidates = {candidates}
            topic = {topic}
            online = {online}
        />

        {eligible ? 
          <BallotPaper
            user = {user}
            handleVote = {handleVote}
            candidates = {candidates}
            topic = {topic}
            online = {online}
          />
        :
          <AfterVoting
            commons = {commons}
            candidates = {candidates}
            votes = {votes}
            polling = {polling}
            fetchData = {fetchData}
          />
        }
        <hr />
      </main>

    </div>
  )
}

export default App
