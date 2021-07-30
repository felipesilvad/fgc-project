import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase';
import AddMatch from './AddMatch';

const AdmTournament = ({match}) => {
  const gameRef = firebase.firestore().collection('games').doc('Street Fighter V')
  const [game, setGame] = useState('');

  useEffect(() => {
    if (game) {
      gameRef.get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              const newGame = doc.data();
              setGame(newGame)
          });
      })
    }
  }, [])

  const tournamentRef = firebase.firestore().collection('games').doc('Street Fighter V').collection('Tournaments').doc(match.params.id)
  const [tournament, setTournament] = useState('');

  useEffect(() => {
    tournamentRef.get().then((tournament) => {
      const newTournament = tournament.data();
      setTournament(newTournament)
    })
  }, [])

  

  return(
    <div>
      <hr/>
      <h3>AdmTournament</h3>
      <h1>{tournament.title}</h1>
      <AddMatch 
        tournament_id={match.params.id}
      />
    </div>
  )
}

export default AdmTournament;