import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase';
import AddTournament from './AddTournament';
import TournamentList from './TournamentList';

const AdmGame = ({match}) => {
  const gameRef = firebase.firestore().collection('games').doc('Guilty Gear Strive')
  const [game, setGame] = useState('');

  useEffect(() => {
    gameRef.get().then((game) => {
      const newGame = game.data();
      setGame(newGame)
    })
  }, [])

  return(
    <div>
      <hr/>
      <h3>AdmGame</h3>
      <h1>{game.title}</h1>
      <TournamentList
        game_title={game.title}
        game_slug={game.slug}
      />
    </div>
  )
}

export default AdmGame;