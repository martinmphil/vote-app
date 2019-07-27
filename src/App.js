import React, { useState, useEffect } from 'react'
import db from './private/privateData'
import './App.css'
import Spinner from './Spinner'
// import ClearVotesButton from './ClearVotesButton'
import LogIn from './LogIn'
import BallotPaper from './BallotPaper'
import LeagueTable from './LeagueTable'
// import AfterVoting from './AfterVoting'

// NB snapshot.docs[0].data().v and voteIndex: docs.id, ...docs.data().v

function useCloud() {
  const [data, setData] = useState([])

  useEffect( () => {
    const unsubscribeFn = db
      .collection('an_organiser')
      .doc('2019-06-17T09:22:33.456Z')
      .collection('commons')
      .onSnapshot(snapshot => {
        const cloudData = snapshot.docs.map( docs => 
          docs.data().v
        )
        setData(cloudData)
      })
    return () => unsubscribeFn()
  }, [])
  return data
}

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
  // the index value of their preference from the candidate array.

function App() {

  // Set app state.
  const votes = useCloud()
  console.log(votes) //NB REMOVE
  const [user, setUser] = useState(commons[0])
  const [showWinner, setShowWinner] = useState(false)

  // This function checks if this user already voted.
  useEffect( ()=>{
    if (votes[commons.indexOf(user)] < 999999)
      {setShowWinner(true)}
  }, [votes, user])

  // This function handles clicking a button to close the results league table overlay.
  const hideResults = () => {
    setShowWinner(false)
  }

  const handleVote = async (candidateIndex) => {
    const userIndex = commons.indexOf(user)
    const voteRef = db
      .collection('an_organiser').doc('2019-06-17T09:22:33.456Z')
      .collection('commons').doc( userIndex.toString() )
    await voteRef.update({v: candidateIndex})
      .catch(function(err) {console.log('Error setting cloud db:- ', err)});
    setShowWinner(true)
  }

  // Change user.
  const handleLogin = (e) => {
    setUser(e.target.value)
  }


  return (
    <div className="App">

      {//NB true && expression evaluates to expression; false && expression evaluates to false.
      showWinner &&
        <LeagueTable
          votes = {votes}
          candidates = {candidates}
          topic = {topic}
          hideResults = {hideResults}
          commons = {commons}
          user = {user}
          handleLogin = {handleLogin}
        />
      }

      <LogIn
        commons = {commons}
        user = {user}
        handleLogin = {handleLogin}
      />

      <main>
        <h1 className="app-name">Vote app</h1>

        <Spinner votes={votes} commons={commons}/>

        <BallotPaper
          user = {user}
          handleVote = {handleVote}
          candidates = {candidates}
          topic = {topic}
        />





        {/* {votes.map(v=>(<p>{v}</p>))} */}


        <hr />
        <p>Organiser? </p>
      </main>

    </div>
  )
}

export default App
