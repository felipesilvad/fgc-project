import React, {useState, useEffect} from 'react';
import firebase from '../../../firebase';
import MatchListPlayer from '../List/MatchListPlayer'
import {Container, Row, Col, Image, Table} from 'react-bootstrap';

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

function useCharacters() {
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('games')
      .doc('Guilty Gear Strive')
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

  const CharacterRef = firebase.firestore().collection('games').doc('Guilty Gear Strive').collection('Characters').doc(match.params.id);
  const [character, setCharacter] = useState('');

  useEffect(() => {
    CharacterRef.get().then((doc) => {
      const newCharacter = {
        id: doc.id,
        ...doc.data()
      };
      setCharacter(newCharacter)
    })
  }, [])

  const CharWins = []
  const CharMatches = []

  if (character.id) {
    matches.forEach((singleMatch) => {
      singleMatch.sets.forEach((set) => {
        if (set.Char1 === character.id) {
          CharMatches.push(set)
        }
        if (set.Char2 === character.id) {
          CharMatches.push(set)
        }
        if (set.WChar === character.id) {
          CharWins.push(set)
        }
      })
    })
  }

  const CharWinRate = Math.round(((CharWins.length/CharMatches.length) * 100 + Number.EPSILON) * 100) / 100

  const customStyles = {
    backgroundImage: `url(${character.cut_url})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto',
  }
  
  return (
    <Container >
      <div className='char-detail__top d-flex'>
        <Image className='char-detail__img' src={character.img}/>
        <div className='w-100' style={customStyles}>
          <div className='d-flex char-detail__overlay'>
            <h1>{character.title}</h1>
          </div>
        </div>
      </div>
      

      <h3>{CharWinRate}%</h3><h5>Total Matches: {CharMatches.length} Wins: {CharWins.length}</h5>

      <Table striped bordered hover variant="dark">
        <tbody>
          {!! characters &&(characters.map((char) => (
            (character.id !== char.id) ? (
              <tr className="p-0">
                <td className="p-0"><Image className="char-icon" src={char.img} />{char.title}</td>
                <td>
                  {Math.round(((
                      CharWins.filter( x => 
                        x.LChar === char.id
                      ).length 
                      /
                      CharMatches.filter( x => 
                        x.Char1 === char.id ||
                        x.Char2 === char.id
                      ).length
                    ) * 100 + Number.EPSILON) * 100) / 100
                  }%
                </td>
                <td>
                  {CharWins.filter( x => 
                      x.LChar === char.id
                    ).length
                  }
                </td>
                <td>
                  {CharMatches.filter( x => 
                      x.Char1 === char.id ||
                      x.Char2 === char.id
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