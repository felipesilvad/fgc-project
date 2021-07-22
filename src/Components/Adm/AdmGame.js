import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';
import AddTournament from './AddTournament';
import TournamentList from './TournamentList';

const AdmGame = ({match}) => {
  const gameRef = firebase.firestore().collection('games').where("slug", "==", match.params.slug)
  const [game, setGame] = useState('');

  useEffect(() => {
    gameRef.get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const newGame = doc.data();
            setGame(newGame)
        });
    })
  }, [])

  

  return(
    <div>
      <hr/>
      <h3>AdmGame</h3>
      <h1>{game.title}</h1>
      <AddTournament 
        game_title={game.title}
        game_slug={game.slug}
      />
      <TournamentList
        game_title={game.title}
        game_slug={game.slug}
      />
    </div>
  )
}

export default AdmGame;