import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase';
import {Link} from 'react-router-dom';
import { Row, Col, Image, Table } from 'react-bootstrap';
import MatchUpChartRow from './MatchUpChartRow'
import MatchUpChartRowTotal from './MatchUpChartRowTotal'

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

const MatchUpChart = () => {
  const characters = useChar();

  return (
    <div>
      <Table striped bordered hover variant="dark">
        <tr>
          <td className="p-0"></td>
          <td className="p-0 text-center">TOTAL</td>
          {characters.map((character) => (
            <td className="p-0 text-center">
              <Image className="char-icon p-0" src={character.img} /><br />
              {character.title.split(' ')[0]}
            </td>
          ))}
        </tr>
        {characters.map((character) => (
          <tr>
            <td className="p-0"><Image className="char-icon p-0" src={character.img} />{character.title.split(' ')[0]}</td>
            <MatchUpChartRowTotal character_id={character.id} />
            {!! characters &&(characters.map((char) => (
              (character.id !== char.id) ? (
                <MatchUpChartRow character_id={character.id} char_id={char.id} />
                
              ) : (
                <td className="p-0 text-center">
                  -
                </td>
              )
            )))}
          </tr>
        ))}
        
      </Table>
    </div>
  )
}

export default MatchUpChart;