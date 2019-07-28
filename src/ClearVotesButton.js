import React from 'react'
import db from './private/privateData'

function ClearVotesButton (props) {

  const clearAllVotesUpdater = () => {
  
    const batch = db.batch()

    const n = props.commons.length

    for (var i = 0; i < n; i++) {

      const voteRef =
        db.collection('an_organiser').doc('2019-06-17T09:22:33.456Z')
        .collection('commons').doc(i.toString());
      
      batch.update(voteRef, {'v': 999999});

    }

    async function commitBatch() {
      await batch.commit().catch( (err) => 
        console.log('Error in resetting votes ', err)
      )
    }
    commitBatch()
    props.toggleOrganiser()
    props.hideResults()
  }

  return (
    <div>

      <button
        className = "secondary-button"
        type="button"
        onClick={ () => props.toggleOrganiser() }
      >
        Organiser?
      </button> &nbsp;

      <button
        className= {`danger-button ${props.organiser ? '' : 'hidden'}`}
        type = "button"
        onClick = {clearAllVotesUpdater}
      >
        Clear all
      </button>

    </div>


  )

}

export default ClearVotesButton
      