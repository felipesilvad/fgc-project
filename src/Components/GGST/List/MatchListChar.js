import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase';
import {Link} from 'react-router-dom';
import { Image } from 'react-bootstrap';
import {Row, Col} from 'react-bootstrap';

const MatchListChar = ({id1, id2}) => {
  const charRef = firebase.firestore().collection('games').doc('Guilty Gear Strive').collection('Characters')
  const [char1, setChar1] = useState('');
  const [char2, setChar2] = useState('');

  useEffect(() => {
    charRef.doc(id1).get().then((char) => {
      const newChar1 = char.data();
      setChar1(newChar1)
    })
  }, [])
  useEffect(() => {
    charRef.doc(id2).get().then((char) => {
      const newChar2 = char.data();
      setChar2(newChar2)
    })
  }, [])


  return (
    <Row class="d-flex">
      {!! char1 &&(
        <Col xs={5} className="d-flex justify-content-start">
          <Image className="char-cut" src={char1.cut_url} />
          <Link className="char-title p-2 mt-3">{char1.title.split(' ')[0]}</Link>
        </Col>
      )}
      <Col xs={2} className="text-center">
        <h2 className="vs-txt">VS</h2>
      </Col>
      {!! char2 &&(
        <Col xs={5} className="d-flex justify-content-end">
          <Link className="char-title p-2 mt-3">{char2.title.split(' ')[0]}</Link>
          <Image className="char-cut" src={char2.cut_url} />
        </Col>
      )}
    </Row>
    
  )
}

export default MatchListChar;