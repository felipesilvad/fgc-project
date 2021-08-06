import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase';
import {Link} from 'react-router-dom';
import { Image } from 'react-bootstrap';


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
    <div class="d-flex justify-content-between">
      <div>
        <Image className="char-icon" src={char1.img} />
        {char1.title}
      </div>
      <div>
        {char2.title}
        <Image className="char-icon" src={char2.img} />
      </div>
    </div>
    
  )
}

export default MatchListChar;