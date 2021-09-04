import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase';
import {Link} from 'react-router-dom';
import MatchListPlayer from './MatchListPlayer';
import MatchListChar from './MatchListChar';

function useMatch() {
  const [match, setMatch] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('games')
      .doc('Guilty Gear Strive')
      .collection('Matches')
      .onSnapshot((snapshot) => {
        const newMatch = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        setMatch(newMatch)
      })
    return () => unsubscribe()
  }, [])

  return match;
}

const MatchList = () => {
  const matchesGame = useMatch();

  return (
    <div>
      <h4>Match List</h4>
      {matchesGame.map((matchGame) => (
        <Link to={`/GGS/vods/${matchGame.id}`}>
          <div className="add-set p-3">
            <div class="text-center">
              {matchGame.tournament_id}
              <br/>
              {matchGame.type}
            </div>
            <MatchListPlayer id1={matchGame.player1} id2={matchGame.player2}/>
            <MatchListChar id1={matchGame.sets[0].Char1} id2={matchGame.sets[0].Char2} />
          </div>
        </Link>
      ))}
    </div>
  )
}

export default MatchList;