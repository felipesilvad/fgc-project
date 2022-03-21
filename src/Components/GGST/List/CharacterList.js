import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase';
import {Link} from 'react-router-dom';
import { Row, Col, Image, Table } from 'react-bootstrap';
import CharacterListItem from '../List/CharacterListItem';
import MatchUpChart from '../Detail/MatchUpChart';

function useMatches() {
  const [matches, setMatches] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('games')
      .doc('Guilty Gear Strive')
      .collection('Matches')
      .onSnapshot((snapshot) => {
        const newMatches = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        setMatches(newMatches)
      })
    return () => unsubscribe()
  }, [])

  return matches;
}

function useChar() {
  const [char, setChar] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('games')
      .doc('Guilty Gear Strive')
      .collection('Characters')
      .onSnapshot((snapshot) => {
        const newChar = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        setChar(newChar)
      })
    return () => unsubscribe()
  }, [])

  return char;
}

const CharactersList = () => {
  const characters = useChar();

  return (
    <div>
      <h4>Characters List</h4>
      <Row>
        {characters.map((character) => (
          <CharacterListItem
            character_id={character.id}
            character_img={character.img}
            character_title={character.title}
          />
        ))}
      </Row>

      {/* <MatchUpChart /> */}

    </div>
  )
}

export default CharactersList;