import React, { useState } from 'react';
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
    // querySnapshot.forEach((doc) => {
    //     tournaments = {
    //       id: doc.id,
    //       ...doc.data()
    //     }
    //     console.log(doc.id, " => ", doc.data());
    // });
  });

  
  return (
    <div>
      <h4>Tournament List{game_title}</h4>
      {!! tournaments &&(
        <div>
          {tournaments.map((tournament) => (
            <li key={tournament.id}>
              <Link to={`/SFV/adm/${tournament.id}`}>{tournament.title}</Link>
            </li>
          ))}
        </div>
      )}
      
    </div>
  )
}

export default TournamentsList;