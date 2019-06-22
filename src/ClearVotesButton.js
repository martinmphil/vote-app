import React from 'react'
import db from './private/privateData'

function ClearVotesButton (props) {

  const clearAllVotesUpdater = () => {

    props.handleClearLocalVotes()
  
    const batch = db.batch()

    const n = props.commons.length

    for (var i = 0; i < n; i++) {

      const voteRef =
        db.collection('an_organiser').doc('2019-06-17T09:22:33.456Z')
        .collection('commons').doc(i.toString());
      
      batch.update(voteRef, {'v': 999999});

    }

    batch.commit()
    .catch(function(err) {
      console.log('Error in resetting votes ', err)
    })
  }

  return (
    <button id='clearAllVotes' type="button" onClick={clearAllVotesUpdater} >
      Clear all
    </button>
  )
}

export default ClearVotesButton
      