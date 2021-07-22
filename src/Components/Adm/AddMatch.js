import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';
import Options from './Options';

function usePlayers() {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('Players')
      .onSnapshot((snapshot) => {
        const newPlayers = snapshot.docs.map((doc) => ({
          id: doc.id, title: doc.data().title
        }))

        setPlayers(newPlayers)
      })
    return () => unsubscribe()
  }, [])

  return players;
}

const AddMatch = () => {
  const players = usePlayers();
  
  const [type, setType] = useState('');
  const [commentators, setCommentators] = useState('');
  const [Player1, setPlayer1] = useState('');
  const [Player2, setPlayer2] = useState('');

  function onSubmit(e) {
    e.preventDefault()

    const playerRef = firebase.firestore().collection('Matches');

    playerRef.add({
      type, commentators, Player1, Player2
    })

  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label><h4 id="stat">Add Match</h4></label>
        <select name="Type" id="Type"
          onChange={e => setType(e.currentTarget.value)}
        >
          <option value="7">Pools</option>
          <option value="6">Top 64</option>
          <option value="5">Top 16</option>
          <option value="4">Top 8</option>
          <option value="3">Winners Final</option>
          <option value="2">Losers Final</option>
          <option value="1">Grand Final</option>
        </select>

        <select name="Player" id="Player1"
            onChange={e => setPlayer1(e.currentTarget.value)}
          >
            <option value=""></option>
            {players.map((player) => (
              <Options
                id={player.id}
                title={player.title}
              />
            ))}
          </select>
          <select name="Player" id="Player2"
            onChange={e => setPlayer2(e.currentTarget.value)}
          >
            <option value=""></option>
            {players.map((player) => (
              <Options
                id={player.id}
                title={player.title}
              />
            ))}
          </select>
        <button className="button add-button">Add</button>
      </form>
    </div>
  )
}

export default AddMatch;
