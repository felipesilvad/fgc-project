import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase';
import {Link} from 'react-router-dom';
import MatchListPlayer from './MatchListPlayer';

function useMatch() {
  const [match, setMatch] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('games')
      .doc('Street Fighter V')
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
        <Link to={`/SFV/vods/${matchGame.id}`}>
          <div className="add-set p-3">
            <div class="d-flex justify-content-between">
              <MatchListPlayer id={matchGame.player1} />
              <MatchListPlayer id={matchGame.player2} />
            </div>
            {matchGame.sets.map((set) => (
              <>
                <div class="d-flex justify-content-between">
                  <a>{set.Char1}</a>
                  <a>{set.Char2}</a>
                </div>
              </>
            ))}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default MatchList;