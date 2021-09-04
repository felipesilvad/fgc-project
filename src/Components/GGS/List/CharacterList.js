import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase';
import {Link} from 'react-router-dom';
import { Row, Col, Image } from 'react-bootstrap';

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
          <Col md={2} className="text-center char-title">
            <Link to={`/GGS/character/${character.id}`}>
              <Image className="char-list-icon" src={character.img} />
              <h4>{character.title}</h4>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default CharactersList;