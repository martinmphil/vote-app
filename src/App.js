import React, { useState, useEffect } from 'react'
import db from './private/privateData'
import './App.css'
import LogIn from './LogIn'
import BallotPaper from './BallotPaper'
import LeagueTable from './LeagueTable'
import CastVotes from './CastVotes'
import ClearVotesButton from './ClearVotesButton'

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
  const [user, setUser] = useState(commons[0])
  const [showWinner, setShowWinner] = useState(false)
  const [organiser, setOrganiser] = useState(false)

  // This function checks if this user already voted.
  useEffect( ()=>{
    if (votes[commons.indexOf(user)] < 999999)
      {setShowWinner(true)}
  }, [votes, user])

  // Handle removing the results overlay.
  const clickToHideWinnerFn = () => {
    setShowWinner(false)
  }

  // Handle clicking background to remove the results overlay.
  // useEffect( () => {
  //   const clickingAwayFromResults = (e) => {
  //     // Test if results overlay doesn't contain target.
  //     if ((!(document.querySelector('.results-overlay').contains(e.target) )))
  //       {clickToHideWinnerFn()}
  //   }
  //   if (showWinner === true) {
  //     window.addEventListener('click', clickingAwayFromResults, false )
  //   }
  //   return () => {
  //     window.removeEventListener('click', clickingAwayFromResults, false )
  //   }
  // }, [showWinner])

  const toggleOrganiser = () => {
    organiser ? setOrganiser(false) : setOrganiser(true)
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
    if (votes[commons.indexOf(e.target.value)] === 999999) {
      setShowWinner(false)
    }
  }


  return (
    <div className="App">

      {//NB true && expression evaluates to expression; false && expression evaluates to false.
        showWinner &&
        <LeagueTable
          votes = {votes}
          candidates = {candidates}
          topic = {topic}
          clickToHideWinnerFn = {clickToHideWinnerFn}
          commons = {commons}
          user = {user}
          handleLogin = {handleLogin}
          showWinner = {showWinner}
        />
      }

      <header>
        {// Either un-cast vote, or votes still loading, present a consistent view for fresh user.
          (votes[commons.indexOf(user)] === 999999) || votes.length < commons.length ?
          <span>Cast your vote.</span> :
          <button
            className = "secondary-button"
            type="button"
            onClick={ () => setShowWinner(true) }
          >
            Show results
          </button>
        }
        <LogIn
          commons = {commons}
          user = {user}
          handleLogin = {handleLogin}
        />
      </header>

      <main
        onClick = {() => setShowWinner(false)}
        className = {showWinner ? 'misty' : ''}
      >
        {// Same class style avoids flicker when loaded.
          (!(votes.length >= commons.length)) ? 
          <p className="subtle-heading">Loading...</p> :
          <h1 className="subtle-heading">Vote app</h1>
        }

        {/* <Spinner votes={votes} commons={commons}/> */}

        <BallotPaper
          user = {user}
          votes = {votes}
          commons = {commons}
          handleVote = {handleVote}
          candidates = {candidates}
          topic = {topic}
          clickToHideWinnerFn = {clickToHideWinnerFn}
          showWinner = {showWinner}
        />
        <hr />

        {//NB true && expression evaluates to expression; false && expression evaluates to false.
          (votes[commons.indexOf(user)] < 999999) &&
          <CastVotes
            commons = {commons}
            candidates = {candidates}
            votes = {votes}
          />
        }

        <ClearVotesButton
          commons = {commons}
          organiser = {organiser}
          toggleOrganiser = {toggleOrganiser}
          clickToHideWinnerFn = {clickToHideWinnerFn}
        />
        <hr />
      </main>

    </div>
  )
}

export default App
