import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase';
import { Row, Col } from 'react-bootstrap';
import Options from '../Options';

function useCharacters() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('games')
      .doc('Street Fighter V')
      .collection('Characters')
      .onSnapshot((snapshot) => {
        const newCharacters = snapshot.docs.map((doc) => ({
          value: doc.id, title: doc.data().name
        }))

        setCharacters(newCharacters)
      })
    return () => unsubscribe()
  }, [])

  return characters;
}

const AddSet = () => {
  const characters = useCharacters();
  
  const [time, setTime] = useState('');
  const [Char1, setChar1] = useState('');
  const [Char1VS, setChar1VS] = useState('');
  const [Char1VT, setChar1VT] = useState('');
  const [Char2, setChar2] = useState('');
  const [Char2VS, setChar2VS] = useState('');
  const [Char2VT, setChar2VT] = useState('');

  function onSubmit(e) {
    e.preventDefault()

    const playerRef = firebase.firestore().collection('Matches');

    playerRef.add({
      time,
      Char1,
      Char1VS,
      Char1VT,
      Char2,
      Char2VS,
      Char2VT,
    })

  }

  return (
    <div>
      <Row>
        <label>SET 1</label>
        <Col>
          <input type="text" name="time" placeholder="Time" onChange={e => setTime(e.currentTarget.value)} />  
        </Col>
        <Col>
          <label>Char 1</label>
          <select name="Char" id="Char1"
            onChange={e => setChar1(e.currentTarget.value)}
          >
            <option value=""></option>
            {characters.map((char) => (
              <Options
                id={char.id}
                title={char.title}
              />
            ))}
          </select>
        </Col>
        <Col>
          <input type="number" name="vs" onChange={e => setChar1VS(e.currentTarget.value)} />  
        </Col>
        <Col>
          <input type="number" name="vt" onChange={e => setChar1VT(e.currentTarget.value)} />  
        </Col>
        <Col>
          <label>Char 2</label>
          <select name="Char" id="Char2"
            onChange={e => setChar2(e.currentTarget.value)}
          >
            <option value=""></option>
            {characters.map((char) => (
              <Options
                id={char.id}
                title={char.title}
              />
            ))}
          </select>
        </Col>
        <Col>
          <input type="number" name="vs" onChange={e => setChar2VS(e.currentTarget.value)} />  
        </Col>
        <Col>
          <input type="number" name="vt" onChange={e => setChar2VT(e.currentTarget.value)} />  
        </Col>
      </Row>
    </div>
  )
}

export default AddSet;