import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase';
import {Link} from 'react-router-dom';
import { Image } from 'react-bootstrap';
import {Row, Col} from 'react-bootstrap';

const MatchListChar = ({set}) => {
  const charRef = firebase.firestore().collection('games').doc('Guilty Gear Strive').collection('Characters')
  const [char1, setChar1] = useState('');
  const [char2, setChar2] = useState('');

  useEffect(() => {
    charRef.doc(set.Char1).get().then((char) => {
      const newChar1 = char.data();
      setChar1(newChar1)
    })
  }, [])
  useEffect(() => {
    charRef.doc(set.Char2).get().then((char) => {
      const newChar2 = char.data();
      setChar2(newChar2)
    })
  }, [])

  return (
    <Row class="d-flex" className="match_sets ">
      {!! char1 &&(
        <Col xs={6} className="d-flex justify-content-start p-0">
          <Image className="char-icon" src={char1.img} />
          <h4 className="player-title p-2 mt-3">{char1.title.split(' ')[0]}</h4>
        </Col>
      )}
      {!! char2 &&(
        <Col xs={5} className="d-flex justify-content-end p-0">
          <h4 className="player-title p-2 mt-3">{char2.title.split(' ')[0]}</h4>
          <Image className="char-icon" src={char2.img} />
        </Col>
      )}
      <Col xs={1} className="d-flex set-bg">
        <span className="set-txt align-middle">{set.id}</span>
      </Col>
    </Row>
    
  )
}

export default MatchListChar;