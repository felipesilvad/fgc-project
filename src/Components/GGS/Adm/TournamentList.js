import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase';
import {Link} from 'react-router-dom';

  const TournamentsList = ({game_title, game_slug}) => {
  
  const [tournaments, setTournaments] = useState([])

  firebase.firestore().collection('games').doc(game_title).collection('Tournaments')
  .get().then((snapshot) => {
    const newTournaments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    setTournaments(newTournaments)
  });
  
  return (
    <div>
      <h4>Tournament List {game_title}</h4>
      {!! tournaments &&(
        <div>
          {tournaments.map((tournament) => (
            <li key={tournament.id}>
              <Link to={`/GGS/adm/tournaments/${tournament.id}`}>{tournament.title}</Link>
            </li>
          ))}
        </div>
      )}
      
    </div>
  )
}

export default TournamentsList;