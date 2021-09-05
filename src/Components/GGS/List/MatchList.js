import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase';
import MatchListItem from './MatchListItem';
import {Row, Col} from 'react-bootstrap';
import Select from 'react-select'

function useCharacters() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('games')
      .doc('Guilty Gear Strive')
      .collection('Characters')
      .onSnapshot((snapshot) => {
        const newCharacters = snapshot.docs.map((doc) => ({
          value: doc.id, label: doc.data().title
        }))

        setCharacters(newCharacters)
      })
    return () => unsubscribe()
  }, [])

  return characters;
}

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
  const characters = useCharacters();
  const charactersOptions = [
    { value: '', label: 'Any' },
    ...characters
  ]
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const [char1, setChar1] = useState('');
  async function reloadFilterChar1(value) {
    setChar1(false)
    await sleep(200);
    setChar1(value)
  }
  function filterChar1(vod) {
    if (char1 === "") {
      return true
    } else {
      return !! vod.sets[0] &&(vod.sets[0].Char1 === char1 || vod.sets[0].Char2 === char1) ||
      !! vod.sets[1] &&(vod.sets[1].Char1 === char1 || vod.sets[1].Char2 === char1) ||
      !! vod.sets[2] &&(vod.sets[2].Char1 === char1 || vod.sets[2].Char2 === char1) ||
      !! vod.sets[3] &&(vod.sets[3].Char1 === char1 || vod.sets[3].Char2 === char1) ||
      !! vod.sets[4] &&(vod.sets[4].Char1 === char1 || vod.sets[4].Char2 === char1) ||
      !! vod.sets[5] &&(vod.sets[5].Char1 === char1 || vod.sets[5].Char2 === char1) ||
      !! vod.sets[6] &&(vod.sets[6].Char1 === char1 || vod.sets[6].Char2 === char1) ||
      !! vod.sets[7] &&(vod.sets[7].Char1 === char1 || vod.sets[7].Char2 === char1)
    }
  }

  const [char2, setChar2] = useState('');
  async function reloadFilterChar2(value) {
    setChar2(false)
    await sleep(200);
    setChar2(value)
  }
  function filterChar2(vod) {
    if (char2 === "") {
      return true
    } else {
      return !! vod.sets[0] &&(vod.sets[0].Char1 === char2 || vod.sets[0].Char2 === char2) ||
      !! vod.sets[1] &&(vod.sets[1].Char1 === char2 || vod.sets[1].Char2 === char2) ||
      !! vod.sets[2] &&(vod.sets[2].Char1 === char2 || vod.sets[2].Char2 === char2) ||
      !! vod.sets[3] &&(vod.sets[3].Char1 === char2 || vod.sets[3].Char2 === char2) ||
      !! vod.sets[4] &&(vod.sets[4].Char1 === char2 || vod.sets[4].Char2 === char2) ||
      !! vod.sets[5] &&(vod.sets[5].Char1 === char2 || vod.sets[5].Char2 === char2) ||
      !! vod.sets[6] &&(vod.sets[6].Char1 === char2 || vod.sets[6].Char2 === char2) ||
      !! vod.sets[7] &&(vod.sets[7].Char1 === char2 || vod.sets[7].Char2 === char2)
    }
  }

  return (
    <Row className=''>
      <Col md={2}>
        <div>
          <h2 className="player-title">VODS</h2>
        </div>
        <div>
          <h3>Filter</h3>
          <div>
            <label>Character 1</label>
            <Select 
              options={charactersOptions} onChange={e => reloadFilterChar1(e.value)}
              className="Selector" isSearchable
            />
          </div>
          <div>
            <label>Character 2</label>
            <Select 
              options={charactersOptions} onChange={e => reloadFilterChar2(e.value)}
              className="Selector" isSearchable
            />
          </div>
        </div>
      </Col>
      <Col className="scrollbar scrollbar-primary vods-overflow">
        {matchesGame.filter(filterChar1).filter(filterChar2)
        .map((matchGame) => (
          <MatchListItem matchGame={matchGame} />
        ))}
      </Col>
    </Row>
  )
}

export default MatchList;