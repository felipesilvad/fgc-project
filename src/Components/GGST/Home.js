import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';
import {Link} from 'react-router-dom';
import { Row, Col, Image, Table } from 'react-bootstrap';

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

  return (
    <div>
      <h4>Home</h4>
    </div>
  )
}

export default CharactersList;