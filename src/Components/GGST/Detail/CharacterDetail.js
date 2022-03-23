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

function usePatches() {
  const [patches, setPatches] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('games')
      .doc('Guilty Gear Strive')
      .collection('Patches')
      .onSnapshot((snapshot) => {
        const newPatches = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        setPatches(newPatches)
      })
    return () => unsubscribe()
  }, [])

  return patches;
}

const MatchDetail = ({match}) => {
  const matches = useMatches();
  const patches = usePatches();

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
  const AllMatches = []

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

  matches.forEach((singleMatch) => {
    singleMatch.sets.forEach((set) => {
      AllMatches.push(set)
    })
  })

  const CharWinRate = Math.round(((CharWins.length/CharMatches.length) * 100 + Number.EPSILON) * 100) / 100
  const CharPlayRate = Math.round(((CharMatches.length/AllMatches.length) * 100 + Number.EPSILON) * 100) / 100

  const currentPatch = patches[patches.length - 1];
  const lastPatch = patches[patches.length - 2];
  const currentPatchMatches = [];
  const currentPatchAllMatches = [];
  const lastPatchMatches = [];
  const lastPatchAllMatches = [];
  const currentPatchCharMatches = [];
  const lastPatchCharMatches = [];
  const currentPatchCharWins = [];
  const lastPatchCharWins = [];

  if (currentPatch) {
    currentPatchMatches.push(matches.filter(match => match.date.seconds > currentPatch.startDate.seconds));
  }
  if (lastPatch) {
    lastPatchMatches.push(
    matches.filter(
      match => match.date.seconds > patches[patches.length - 2].startDate.seconds
    ).filter(
      match => match.date.seconds < patches[patches.length - 2].endDate.seconds
    ));
  }

  if (currentPatchMatches[0]) {
    currentPatchMatches[0].forEach((singleCurrentMatch) => {
      singleCurrentMatch.sets.forEach((set) => {
        if (set.Char1 === character.id) {
          currentPatchCharMatches.push(set)
        }
        if (set.Char2 === character.id) {
          currentPatchCharMatches.push(set)
        }
        if (set.WChar === character.id) {
          currentPatchCharWins.push(set)
        }
        currentPatchAllMatches.push(set)
      })
    })
  }

  if (lastPatchMatches[0]) {
    lastPatchMatches[0].forEach((singleLastMatch) => {
      singleLastMatch.sets.forEach((set) => {
        if (set.Char1 === character.id) {
          lastPatchCharMatches.push(set)
        }
        if (set.Char2 === character.id) {
          lastPatchCharMatches.push(set)
        }
        if (set.WChar === character.id) {
          lastPatchCharWins.push(set)
        }
        lastPatchAllMatches.push(set)
      })
    })
  }

  const currentPatchWinRate = Math.round(((currentPatchCharWins.length/currentPatchCharMatches.length) * 100 + Number.EPSILON) * 100) / 100
  const currentPatchPlayRate = Math.round(((currentPatchCharMatches.length/currentPatchAllMatches.length) * 100 + Number.EPSILON) * 100) / 100
  const lastPatchWinRate = Math.round(((lastPatchCharWins.length/lastPatchCharMatches.length) * 100 + Number.EPSILON) * 100) / 100
  const lastPatchPlayRate = Math.round(((lastPatchCharMatches.length/lastPatchAllMatches.length) * 100 + Number.EPSILON) * 100) / 100

  const PatchWinRateDif = Math.round(((currentPatchWinRate - lastPatchWinRate) + Number.EPSILON) * 100) / 100
  const PatchPlayRateDif = Math.round(((currentPatchPlayRate - lastPatchPlayRate) + Number.EPSILON) * 100) / 100
 
  const customStyles = {
    backgroundImage: `url(${character.cut_url})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
  
  return (
    <Container >
      <div className='char-detail__top d-flex'>
        <Image className='char-detail__img' src={character.img}/>
        <div className='w-100' style={customStyles}>
          <div className='char-detail__overlay'>
            <h1 className='char-detai__title'>{character.title}</h1>
            <h2 className='char-detai__jp'>{character.title_jp}</h2>
            <Row>
              <Col className='char-detail__stat-col'>
                <h3>Winrate</h3>
                <div className='d-flex justify-content-center'>
                  <h1>{CharWinRate}%</h1>
                  {(PatchWinRateDif < 0) ? (
                    <h4 className='mt-3 mr-3 text-bold' style={{color: 'red'}}>
                      {PatchWinRateDif}%
                    </h4>
                  ) : (
                    <h4 className='mt-3 mr-3 text-bold' style={{color: 'green'}}>
                      {PatchWinRateDif}%
                    </h4>
                  )}
                </div>
              </Col>
              <Col className='char-detail__stat-col'>
                <h3 className=''>Playrate</h3>
                <div className='d-flex justify-content-center'>
                  <h1>{CharPlayRate}%</h1>
                  {(PatchPlayRateDif < 0) ? (
                      <h4 className='mt-3 mr-3 text-bold' style={{color: 'red'}}>
                        {PatchPlayRateDif}%
                      </h4>
                    ) : (
                      <h4 className='mt-3 mr-3 text-bold' style={{color: 'green'}}>
                        {PatchPlayRateDif}%
                      </h4>
                    )}
                  </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      

      {/* <h3>{CharWinRate}%</h3><h5>Total Matches: {CharMatches.length} Wins: {CharWins.length}</h5>

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
      </Table> */}
    </Container>
  )
}

export default MatchDetail;