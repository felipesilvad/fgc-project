import React, {useState, useEffect} from 'react';
import ReactPlayer from 'react-player'
import firebase from '../../../firebase';
import MatchListPlayer from '../List/MatchListPlayer'
import {Container, Image} from 'react-bootstrap';

function useMatches() {
  const [matches, setMatches] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('games')
      .doc('Street Fighter V')
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

const MatchDetail = ({match}) => {
  const matches = useMatches();

  const CharacterRef = firebase.firestore().collection('games').doc('Street Fighter V').collection('Characters').doc(match.params.id);
  const [character, setCharacter] = useState('');

  useEffect(() => {
    CharacterRef.get().then((Character) => {
      const newCharacter = Character.data();
      setCharacter(newCharacter)
    })
  }, [])

  const CharWins = []
  const CharMatches = []

  if (character.name) {
    matches.forEach((singleMatch) => {
      singleMatch.sets.forEach((set) => {
        if (set.Char1 === character.name) {
          CharMatches.push(set)
        }
        if (set.Char2 === character.name) {
          CharMatches.push(set)
        }
        if (set.WChar === character.name) {
          CharWins.push(set)
        }
      })
    })
  }
  // function percentage(num, per)
  // {
  //   return (num/100)*per;
  // }
  
  // const CharWinRate = percentage(CharMatches.length, CharWins.length)
  const CharWinRate = (CharWins.length/CharMatches.length) * 100

  return (
    <Container >
      {character.name}
      <Image src={character.img}/>
      <h3>{CharWinRate}%</h3><h5>Total Matches: {CharMatches.length} Wins: {CharWins.length}</h5>
    </Container>
  )
}

export default MatchDetail;