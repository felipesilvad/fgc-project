import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase';
import {Link} from 'react-router-dom';
import ReactCountryFlag from "react-country-flag"

const MatchListPlayer = ({id1, id2}) => {
  const player1Ref = firebase.firestore().collection('Players').doc(id1)
  const [player1, setPlayer1] = useState('');

  useEffect(() => {
    player1Ref.get().then((player1) => {
      const newPlayer1 = player1.data();
      setPlayer1(newPlayer1)
    })
  }, [])

  const region1Ref = firebase.firestore().collection('Regions').doc(player1.region)
  const [region1, setRegion1] = useState('');

  useEffect(() => {
    region1Ref.get().then((region1) => {
      const newRegion1 = region1.data();
      setRegion1(newRegion1)
    })
  }, [])

  const player2Ref = firebase.firestore().collection('Players').doc(id2)
  const [player2, setPlayer2] = useState('');

  useEffect(() => {
    player2Ref.get().then((player2) => {
      const newPlayer2 = player2.data();
      setPlayer2(newPlayer2)
    })
  }, [])

  const region2Ref = firebase.firestore().collection('Regions').doc(player2.region)
  const [region2, setRegion2] = useState('');

  useEffect(() => {
    region2Ref.get().then((region2) => {
      const newRegion2 = region2.data();
      setRegion2(newRegion2)
    })
  }, [])

  return (
    <div class="d-flex justify-content-between">
      <div>
        <Link className="player-title p-2">
          {player1.title}
        </Link>
        {!! region1 &&(
          region1.flag
        )}
        {!! region1 &&(
          <ReactCountryFlag countryCode={region1.flag} svg />
        )}
      </div>
      <div>
        {!! region2 &&(
          <ReactCountryFlag countryCode={region2.flag} svg />
        )}
        {!! region2 &&(
          region2.flag
        )}
        <Link className="player-title p-2">
          {player2.title}
        </Link>
      </div>
    </div>
  )
}

export default MatchListPlayer;