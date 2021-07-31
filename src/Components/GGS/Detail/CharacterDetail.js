import React, {useState, useEffect} from 'react';
import ReactPlayer from 'react-player'
import firebase from '../../../firebase';
import MatchListPlayer from '../List/MatchListPlayer'
import {Container, Image, Table} from 'react-bootstrap';

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
          id: doc.id,
          ...doc.data()
        }))

        setCharacters(newCharacters)
      })
    return () => unsubscribe()
  }, [])

  return characters;
}

const MatchDetail = ({match}) => {
  const matches = useMatches();
  const characters = useCharacters();

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

  const CharWinRate = Math.round(((CharWins.length/CharMatches.length) * 100 + Number.EPSILON) * 100) / 100
  console.log(CharWins)

  
  return (
    <Container >
      {character.name}
      <Image src={character.img}/>
      <h3>{CharWinRate}%</h3><h5>Total Matches: {CharMatches.length} Wins: {CharWins.length}</h5>

      <Table striped bordered hover variant="dark">
        <tbody>
          {!! characters &&(characters.map((char) => (
            (character.name !== char.name) ? (
              <tr className="p-0">
                <td className="p-0"><Image className="char-icon" src={char.img} />{char.name}</td>
                <td>
                  {Math.round(((
                      CharWins.filter( x => 
                        x.LChar === char.name
                      ).length 
                      /
                      CharMatches.filter( x => 
                        x.Char1 === char.name ||
                        x.Char2 === char.name
                      ).length
                    ) * 100 + Number.EPSILON) * 100) / 100
                  }%
                </td>
                <td>
                  {CharWins.filter( x => 
                      x.LChar === char.name
                    ).length
                  }
                </td>
                <td>
                  {CharMatches.filter( x => 
                      x.Char1 === char.name ||
                      x.Char2 === char.name
                    ).length
                  }
                </td>
              </tr>
            ) : ('')
          )))}
        </tbody>
      </Table>
    </Container>
  )
}

export default MatchDetail;