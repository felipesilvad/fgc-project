import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase';
import {Link} from 'react-router-dom';
import { Image } from 'react-bootstrap';


const MatchDetailChar = ({id}) => {
  const charRef = firebase.firestore().collection('game').doc('Guilty Gear Strive').collection('Characters')
  const [char, setChar] = useState('');

  charRef.where("title", "==", 'May')
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const newChar = doc.data();
          setChar(newChar)
        });
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    console.log(char)
  return (
    <a>{char.title}</a>
  )
}

export default MatchDetailChar;