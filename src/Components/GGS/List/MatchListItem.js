import React, {useState, useEffect} from 'react';
import firebase from '../../../firebase';
import {Link} from 'react-router-dom';
import MatchListPlayer from './MatchListPlayer';
import MatchListChar from './MatchListChar';

const MatchListItem = ({matchGame}) => {
  const tournamentRef = firebase.firestore().collection('games').doc('Guilty Gear Strive')
  .collection('Tournaments').doc(matchGame.tournament_id)
  const [tournament, setTournament] = useState('');

  useEffect(() => {
    tournamentRef.get().then((tournament) => {
      const newTournament = tournament.data();
      setTournament(newTournament)
    })
  }, [])

  return (
    <Link to={`/GGS/vods/${matchGame.id}`}>
      <div className="add-set p-3">
        <div class="text-center">
          {!! tournament.title &&(tournament.title)}
          <br/>
          {matchGame.type}
        </div>
        <MatchListPlayer id1={matchGame.player1} id2={matchGame.player2}/>
        <MatchListChar id1={matchGame.sets[0].Char1} id2={matchGame.sets[0].Char2} />
      </div>
    </Link>
  )
}

export default MatchListItem;