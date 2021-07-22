import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';
import {Link} from 'react-router-dom';

function useGames() {
  const [games, setGames] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('games')
      .onSnapshot((snapshot) => {
        const newGames = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        setGames(newGames)
      })
    return () => unsubscribe()
  }, [])

  return games;
}

const GamesList = () => {
  const games = useGames();

  return (
    <div>
      <h4>Games List</h4>
      {games.map((game) => (
        <li>
          <Link to={`/adm/${game.slug}`}>{game.title} {game.slug}</Link>
        </li>
      ))}
    </div>
  )
}

export default GamesList;