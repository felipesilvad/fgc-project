import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase';
import {Link} from 'react-router-dom';
import { Row, Col, Image, Table } from 'react-bootstrap';
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
  const matches = useMatches();

  const CharWins = []
  const CharMatches = []


  return (
    <div>
      <h4>Characters List</h4>
      <Row>
        {characters.map((character) => (
          <Col md={2} className="text-center char-title">
            <Link to={`/GGST/character/${character.id}`}>
              <Image className="char-list-icon" src={character.img} />
              <h4>{character.title}</h4>
            </Link>
          </Col>
        ))}
      </Row>

      <MatchUpChart />

    </div>
  )
}

export default CharactersList;