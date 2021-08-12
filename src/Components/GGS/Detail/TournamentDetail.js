import React, { useState, useRef, useEffect } from "react";
import firebase from '../../../firebase';
import {Link} from 'react-router-dom';
import MatchListPlayer from '../List/MatchListPlayer';
import MatchListChar from '../List/MatchListChar';
import {Row, Col, Nav} from 'react-bootstrap';

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

function TournamentDetail ({match}) {
  const matchesGame = useMatch();

  const tournamentRef = firebase.firestore().collection('games').doc('Guilty Gear Strive').collection('Tournaments').doc(match.params.id);
  const [tournament, setTournament] = useState('');
  useEffect(() => {
    tournamentRef.get().then((Tournament) => {
      const newTournament = Tournament.data();
      setTournament(newTournament)
    })
  }, [])

  return (
    <div className=''>
      {tournament.title}
      {matchesGame.map((matchGame) => (
        (matchGame.tournament_id === match.params.id) ? (
          <Link to={`/GGS/vods/${matchGame.id}`}>
            <div className="add-set p-3">
              <div class="d-flex justify-content-between">
                <MatchListPlayer id={matchGame.player1} />
                <MatchListPlayer id={matchGame.player2} />
              </div>
              {matchGame.sets.map((set) => (
                <>
                  {(set.Char1 && set.Char2) ? (
                    <MatchListChar id1={set.Char1} id2={set.Char2} />
                  ) : ('error')}
                </>
              ))}
            </div>
          </Link>
        ) : ('')
      ))}
    </div>
  );
}

export default TournamentDetail