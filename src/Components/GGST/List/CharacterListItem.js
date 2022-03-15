import React, {useState, useEffect} from 'react';
import firebase from '../../../firebase';
import { Row, Col, Image, Table } from 'react-bootstrap';
import {Link} from 'react-router-dom';

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

const CharacterListItem = ({character_id, character_img, character_title}) => {
  const matches = useMatches();
  const CharWins = []
  const CharMatches = []
  const AllMatches = []

  matches.forEach((singleMatch) => {
    singleMatch.sets.forEach((set) => {
      if (set.Char1 === character_id) {
        CharMatches.push(set)
      }
      if (set.Char2 === character_id) {
        CharMatches.push(set)
      }
      if (set.WChar === character_id) {
        CharWins.push(set)
      }
    })
  })

  matches.forEach((singleMatch) => {
    singleMatch.sets.forEach((set) => {
      AllMatches.push(set)
    })
  })
  console.log(AllMatches.length)
  
  const CharWinRate = Math.round(((CharWins.length/CharMatches.length) * 100 + Number.EPSILON) * 100) / 100
  const CharPlayRate = Math.round(((CharMatches.length/AllMatches.length) * 100 + Number.EPSILON) * 100) / 100

  return (
    <>
      <Col md={3}>
        <Link className='none-hover' to={`/GGST/character/${character_id}`}>
          <Row className="char-list-block">
            <Col xs={4} className="pr-0 pl-0">
              <Image className="char-list-icon" src={character_img} />
            </Col>
            <Col className='mt-2 pr-0 pl-0'>
              <h2 className="ml-1 char-list-title">{character_title.split(' ')[0]}</h2>
              <div className='text-uppercase'>
                <Row>
                  <Col className='text-center'>
                    <h6>Winrate</h6>
                    <h4>{CharWinRate}%</h4>
                  </Col>
                  <Col className='text-center'>
                    <h6 className=''>Playrate</h6>
                    <h4>{CharPlayRate}%</h4>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Link>
      </Col>
      {!CharWinRate &&(
        CharWinRate != 0 &&(
          <td className="p-0 text-center">
            <b style={{background: `none`}}>{CharWinRate}</b>
          </td>
        )
      )}
    </>
  )
}

export default CharacterListItem;