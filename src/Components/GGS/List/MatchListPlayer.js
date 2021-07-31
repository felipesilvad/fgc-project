import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase';
import {Link} from 'react-router-dom';


const MatchListPlayer = ({id}) => {
  const playerRef = firebase.firestore().collection('Players').doc(id)
  const [player, setPlayer] = useState('');

  useEffect(() => {
    playerRef.get().then((player) => {
      const newPlayer = player.data();
      setPlayer(newPlayer)
    })
  }, [])

  return (
    <a>{player.title}</a>
  )
}

export default MatchListPlayer;