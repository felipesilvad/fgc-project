import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase';
import {Link} from 'react-router-dom';
import ReactCountryFlag from "react-country-flag"

function usePlayers() {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('Players')
      .onSnapshot((snapshot) => {
        const newPlayers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        setPlayers(newPlayers)
      })
    return () => unsubscribe()
  }, [])

  return players;
}

function useRegions() {
  const [regions, setRegions] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('Regions')
      .onSnapshot((snapshot) => {
        const newRegions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        setRegions(newRegions)
      })
    return () => unsubscribe()
  }, [])

  return regions;
}


const MatchListPlayer = ({id1, id2}) => {
  const players = usePlayers();
  const player1 = players.filter(player =>  player.id === id1)[0]
  const player2 = players.filter(player =>  player.id === id2)[0]

  const regions = useRegions();
  const region1 = regions.filter(region =>  region.id === player1.region)[0]
  const region2 = regions.filter(region =>  region.id === player2.region)[0]

  return (
    <div class="d-flex justify-content-between">
      <div>
        <Link className="player-title p-2">
          {!! player1 &&(player1.title)}
        </Link>
        {/* {!! region1 &&(
          region1.flag
        )} */}
        {!! region1 &&(
          <ReactCountryFlag countryCode={region1.flag} svg />
        )}
      </div>
      <div>
        {!! region2 &&(
          <ReactCountryFlag countryCode={region2.flag} svg />
        )}
        {/* {!! region2 &&(
          region2.flag
        )} */}
        <Link className="player-title p-2">
          {!! player2 &&(player2.title)}
        </Link>
      </div>
    </div>
  )
}

export default MatchListPlayer;