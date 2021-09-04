import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase';
import {Link} from 'react-router-dom';
import MatchListPlayer from './MatchListPlayer';
import MatchListChar from './MatchListChar';

function useTournament() {
  const [tournament, setTournament] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('games')
      .doc('Guilty Gear Strive')
      .collection('Tournaments')
      .onSnapshot((snapshot) => {
        const newTournament = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        setTournament(newTournament)
      })
    return () => unsubscribe()
  }, [])

  return tournament;
}

const TournamentsList = () => {
  const tournaments = useTournament();

  return (
    <div>
      <h4>Match List</h4>
      {tournaments.map((tournament) => (
        <Link to={`/GGS/tournaments/${tournament.id}`}>
          <li>{tournament.title}</li>
        </Link>
      ))}
    </div>
  )
}

export default TournamentsList;