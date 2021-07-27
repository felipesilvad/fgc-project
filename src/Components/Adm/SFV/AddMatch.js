import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase';
import Options from '../Options';
import { Row, Col } from 'react-bootstrap';

function usePlayers() {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('Players')
      .onSnapshot((snapshot) => {
        const newPlayers = snapshot.docs.map((doc) => ({
          id: doc.id, title: doc.data().title
        }))

        setPlayers(newPlayers)
      })
    return () => unsubscribe()
  }, [])

  return players;
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
          value: doc.id, title: doc.data().name
        }))

        setCharacters(newCharacters)
      })
    return () => unsubscribe()
  }, [])

  return characters;
}

const AddMatch = ({tournament_id}) => {
  const players = usePlayers();
  const characters = useCharacters();

  const [type, setType] = useState('');
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const [S1time, setS1Time] = useState('');
  const [S1Char1, setS1Char1] = useState('');
  const [S1Char1VS, setS1Char1VS] = useState('');
  const [S1Char1VT, setS1Char1VT] = useState('');
  const [S1Char1Result, setS1Char1Result] = useState('');
  const [S1Char2, setS1Char2] = useState('');
  const [S1Char2VS, setS1Char2VS] = useState('');
  const [S1Char2VT, setS1Char2VT] = useState('');
  const [S1Char2Result, setS1Char2Result] = useState('');

  const [S2time, setS2Time] = useState('');
  const [S2Char1, setS2Char1] = useState('');
  const [S2Char1VS, setS2Char1VS] = useState('');
  const [S2Char1VT, setS2Char1VT] = useState('');
  const [S2Char1Result, setS2Char1Result] = useState('');
  const [S2Char2, setS2Char2] = useState('');
  const [S2Char2VS, setS2Char2VS] = useState('');
  const [S2Char2VT, setS2Char2VT] = useState('');
  const [S2Char2Result, setS2Char2Result] = useState('');

  const [S3time, setS3Time] = useState('');
  const [S3Char1, setS3Char1] = useState('');
  const [S3Char1VS, setS3Char1VS] = useState('');
  const [S3Char1VT, setS3Char1VT] = useState('');
  const [S3Char1Result, setS3Char1Result] = useState('');
  const [S3Char2, setS3Char2] = useState('');
  const [S3Char2VS, setS3Char2VS] = useState('');
  const [S3Char2VT, setS3Char2VT] = useState('');
  const [S3Char2Result, setS3Char2Result] = useState('');

  const [S4time, setS4Time] = useState('');
  const [S4Char1, setS4Char1] = useState('');
  const [S4Char1VS, setS4Char1VS] = useState('');
  const [S4Char1VT, setS4Char1VT] = useState('');
  const [S4Char1Result, setS4Char1Result] = useState('');
  const [S4Char2, setS4Char2] = useState('');
  const [S4Char2VS, setS4Char2VS] = useState('');
  const [S4Char2VT, setS4Char2VT] = useState('');
  const [S4Char2Result, setS4Char2Result] = useState('');

  const [S5time, setS5Time] = useState('');
  const [S5Char1, setS5Char1] = useState('');
  const [S5Char1VS, setS5Char1VS] = useState('');
  const [S5Char1VT, setS5Char1VT] = useState('');
  const [S5Char1Result, setS5Char1Result] = useState('');
  const [S5Char2, setS5Char2] = useState('');
  const [S5Char2VS, setS5Char2VS] = useState('');
  const [S5Char2VT, setS5Char2VT] = useState('');
  const [S5Char2Result, setS5Char2Result] = useState('');

  const sets = []
  if (S1time) {
    sets.push({
      "id": 1,
      "time": S1time,
      "Char1": S1Char1,
      "Char1VS": S1Char1VS,
      "Char1VT": S1Char1VT,
      "Char1Result": S1Char1Result,
      "Char2": S1Char2,
      "Char2VS": S1Char2VS,
      "Char2VT": S1Char2VT,
      "Char2Result": S1Char2Result,
    })
  }
  if (S2time) {
    sets.push({
      "id": 2,
      "time": S2time,
      "Char1": S2Char1,
      "Char1VS": S2Char1VS,
      "Char1VT": S2Char1VT,
      "Char1Result": S2Char1Result,
      "Char2": S2Char2,
      "Char2VS": S2Char2VS,
      "Char2VT": S2Char2VT,
      "Char2Result": S2Char2Result,
    })
  }
  if (S3time) {
    sets.push({
      "id": 2,
      "time": S3time,
      "Char1": S3Char1,
      "Char1VS": S3Char1VS,
      "Char1VT": S3Char1VT,
      "Char1Result": S3Char1Result,
      "Char2": S3Char2,
      "Char2VS": S3Char2VS,
      "Char2VT": S3Char2VT,
      "Char2Result": S3Char2Result,
    })
  }
  if (S4time) {
    sets.push({
      "id": 2,
      "time": S4time,
      "Char1": S4Char1,
      "Char1VS": S4Char1VS,
      "Char1VT": S4Char1VT,
      "Char1Result": S4Char1Result,
      "Char2": S4Char2,
      "Char2VS": S4Char2VS,
      "Char2VT": S4Char2VT,
      "Char2Result": S4Char2Result,
    })
  }
  if (S5time) {
    sets.push({
      "id": 2,
      "time": S5time,
      "Char1": S5Char1,
      "Char1VS": S5Char1VS,
      "Char1VT": S5Char1VT,
      "Char1Result": S5Char1Result,
      "Char2": S5Char2,
      "Char2VS": S5Char2VS,
      "Char2VT": S5Char2VT,
      "Char2Result": S5Char2Result,
    })
  }

  function onSubmit(e) {
    e.preventDefault()

    const matchRef = firebase.firestore().collection('games').doc('Street Fighter V')
      .collection('Matches');

    matchRef.add({
      type, player1, player2, sets
    })

  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label><h4 id="stat">Add Match</h4></label>
        <select name="Type" id="Type"
          onChange={e => setType(e.currentTarget.value)}
        >
          <option value="0">Pools</option>
          <option value="P">Pools</option>
          <option value="T64">Top 64</option>
          <option value="T16">Top 16</option>
          <option value="T8">Top 8</option>
          <option value="WF">Winners Final</option>
          <option value="LS">Losers Final</option>
          <option value="GR">Grand Final</option>
          <option value="GFR">Grand Final Reset</option>]
        </select>

        <Row>
          <Col>
            <label>Player 1</label>
            <select name="Player" id="Player1"
              onChange={e => setPlayer1(e.currentTarget.value)}
            >
              <option value=""></option>
              {players.map((player) => (
                <Options
                  id={player.id}
                  title={player.title}
                />
              ))}
            </select>
          </Col>
          <Col>
            <label>Player 2</label>
            <select name="Player" id="Player2"
              onChange={e => setPlayer2(e.currentTarget.value)}
            >
              <option value=""></option>
              {players.map((player) => (
                <Options
                  id={player.id}
                  title={player.title}
                />
              ))}
            </select>
          </Col>
        </Row>
        
        <Row className="add-set">
          <label>SET 1</label>
          <Col md={2}>
            <input type="text" name="time" placeholder="Time" 
              onChange={e => setS1Time(e.currentTarget.value)}
              style={{width: '-webkit-fill-available'}}
            />  
            <div>
              <label>Results</label>
              <div className="d-flex">
                <a>Char1</a>
                <input type="number" name="vt" onChange={e => setS1Char1Result(e.currentTarget.value)}
                  style={{width: '-webkit-fill-available'}}
                />
              </div>
              <div className="d-flex">
                <a>Char2</a><input type="number" name="vt" onChange={e => setS1Char2Result(e.currentTarget.value)}
                  style={{width: '-webkit-fill-available'}}
                />
              </div>
            </div>
          </Col>
          <Col md={5}>
            <div>
              <label>Char 1</label>
              <select name="Char" id="Char1"
                onChange={e => setS1Char1(e.currentTarget.value)}
              >
                <option value=""></option>
                {characters.map((char) => (
                  <Options
                    id={char.id}
                    title={char.title}
                  />
                ))}
              </select>
            </div>
            <div>
              <label>VS</label>
              <input type="number" name="vs" onChange={e => setS1Char1VS(e.currentTarget.value)} />  
            </div>
            <div>
              <label>VT</label>
              <input type="number" name="vt" onChange={e => setS1Char1VT(e.currentTarget.value)} />  
            </div>
          </Col>
          <Col md={5}>
            <div>
              <label>Char 2</label>
              <select name="Char" id="Char2"
                onChange={e => setS1Char2(e.currentTarget.value)}
              >
                <option value=""></option>
                {characters.map((char) => (
                  <Options
                    id={char.id}
                    title={char.title}
                  />
                ))}
              </select>
            </div>
            <div>
              <label>VS</label>
              <input type="number" name="vs" onChange={e => setS1Char2VS(e.currentTarget.value)} />
            </div>
            <div>
              <label>VT</label>
              <input type="number" name="vt" onChange={e => setS1Char2VT(e.currentTarget.value)} />
            </div>
          </Col>
        </Row>

        <Row className="add-set">
          <label>SET 2</label>
          <Col md={2}>
            <input type="text" name="time" placeholder="Time" 
              onChange={e => setS2Time(e.currentTarget.value)}
              style={{width: '-webkit-fill-available'}}
            />  
            <div>
              <label>Results</label>
              <div className="d-flex">
                <a>Char1</a>
                <input type="number" name="vt" onChange={e => setS5Char1Result(e.currentTarget.value)}
                  style={{width: '-webkit-fill-available'}}
                />
              </div>
              <div className="d-flex">
                <a>Char2</a><input type="number" name="vt" onChange={e => setS5Char2Result(e.currentTarget.value)}
                  style={{width: '-webkit-fill-available'}}
                />
              </div>
            </div>
          </Col>
          <Col md={5}>
            <div>
              <label>Char 1</label>
              <select name="Char" id="Char1"
                onChange={e => setS2Char1(e.currentTarget.value)}
              >
                <option value=""></option>
                {characters.map((char) => (
                  <Options
                    id={char.id}
                    title={char.title}
                  />
                ))}
              </select>
            </div>
            <div>
              <label>VS</label>
              <input type="number" name="vs" onChange={e => setS2Char1VS(e.currentTarget.value)} />  
            </div>
            <div>
              <label>VT</label>
              <input type="number" name="vt" onChange={e => setS2Char1VT(e.currentTarget.value)} />  
            </div>
          </Col>
          <Col md={5}>
            <div>
              <label>Char 2</label>
              <select name="Char" id="Char2"
                onChange={e => setS2Char2(e.currentTarget.value)}
              >
                <option value=""></option>
                {characters.map((char) => (
                  <Options
                    id={char.id}
                    title={char.title}
                  />
                ))}
              </select>
            </div>
            <div>
              <label>VS</label>
              <input type="number" name="vs" onChange={e => setS2Char2VS(e.currentTarget.value)} />
            </div>
            <div>
              <label>VT</label>
              <input type="number" name="vt" onChange={e => setS2Char2VT(e.currentTarget.value)} />
            </div>
          </Col>
        </Row>

        <Row className="add-set">
          <label>SET 3</label>
          <Col md={2}>
            <input type="text" name="time" placeholder="Time" 
              onChange={e => setS3Time(e.currentTarget.value)}
              style={{width: '-webkit-fill-available'}}
            />  
            <div>
              <label>Results</label>
              <div className="d-flex">
                <a>Char1</a>
                <input type="number" name="vt" onChange={e => setS3Char1Result(e.currentTarget.value)}
                  style={{width: '-webkit-fill-available'}}
                />
              </div>
              <div className="d-flex">
                <a>Char2</a><input type="number" name="vt" onChange={e => setS3Char2Result(e.currentTarget.value)}
                  style={{width: '-webkit-fill-available'}}
                />
              </div>
            </div>
          </Col>
          <Col md={5}>
            <div>
              <label>Char 1</label>
              <select name="Char" id="Char1"
                onChange={e => setS3Char1(e.currentTarget.value)}
              >
                <option value=""></option>
                {characters.map((char) => (
                  <Options
                    id={char.id}
                    title={char.title}
                  />
                ))}
              </select>
            </div>
            <div>
              <label>VS</label>
              <input type="number" name="vs" onChange={e => setS3Char1VS(e.currentTarget.value)} />  
            </div>
            <div>
              <label>VT</label>
              <input type="number" name="vt" onChange={e => setS3Char1VT(e.currentTarget.value)} />  
            </div>
          </Col>
          <Col md={5}>
            <div>
              <label>Char 2</label>
              <select name="Char" id="Char2"
                onChange={e => setS3Char2(e.currentTarget.value)}
              >
                <option value=""></option>
                {characters.map((char) => (
                  <Options
                    id={char.id}
                    title={char.title}
                  />
                ))}
              </select>
            </div>
            <div>
              <label>VS</label>
              <input type="number" name="vs" onChange={e => setS3Char2VS(e.currentTarget.value)} />
            </div>
            <div>
              <label>VT</label>
              <input type="number" name="vt" onChange={e => setS3Char2VT(e.currentTarget.value)} />
            </div>
          </Col>
        </Row>

        <Row className="add-set">
          <label>SET 4</label>
          <Col md={2}>
            <input type="text" name="time" placeholder="Time" 
              onChange={e => setS4Time(e.currentTarget.value)}
              style={{width: '-webkit-fill-available'}}
            />  
            <div>
              <label>Results</label>
              <div className="d-flex">
                <a>Char1</a>
                <input type="number" name="vt" onChange={e => setS4Char1Result(e.currentTarget.value)}
                  style={{width: '-webkit-fill-available'}}
                />
              </div>
              <div className="d-flex">
                <a>Char2</a><input type="number" name="vt" onChange={e => setS4Char2Result(e.currentTarget.value)}
                  style={{width: '-webkit-fill-available'}}
                />
              </div>
            </div>
          </Col>
          <Col md={5}>
            <div>
              <label>Char 1</label>
              <select name="Char" id="Char1"
                onChange={e => setS4Char1(e.currentTarget.value)}
              >
                <option value=""></option>
                {characters.map((char) => (
                  <Options
                    id={char.id}
                    title={char.title}
                  />
                ))}
              </select>
            </div>
            <div>
              <label>VS</label>
              <input type="number" name="vs" onChange={e => setS4Char1VS(e.currentTarget.value)} />  
            </div>
            <div>
              <label>VT</label>
              <input type="number" name="vt" onChange={e => setS4Char1VT(e.currentTarget.value)} />  
            </div>
          </Col>
          <Col md={5}>
            <div>
              <label>Char 2</label>
              <select name="Char" id="Char2"
                onChange={e => setS4Char2(e.currentTarget.value)}
              >
                <option value=""></option>
                {characters.map((char) => (
                  <Options
                    id={char.id}
                    title={char.title}
                  />
                ))}
              </select>
            </div>
            <div>
              <label>VS</label>
              <input type="number" name="vs" onChange={e => setS4Char2VS(e.currentTarget.value)} />
            </div>
            <div>
              <label>VT</label>
              <input type="number" name="vt" onChange={e => setS4Char2VT(e.currentTarget.value)} />
            </div>
          </Col>
        </Row>

        <Row className="add-set">
          <label>SET 5</label>
          <Col md={2}>
            <input type="text" name="time" placeholder="Time" 
              onChange={e => setS5Time(e.currentTarget.value)}
              style={{width: '-webkit-fill-available'}}
            />  
            <div>
              <label>Results</label>
              <div className="d-flex">
                <a>Char1</a>
                <input type="number" name="vt" onChange={e => setS5Char1Result(e.currentTarget.value)}
                  style={{width: '-webkit-fill-available'}}
                />
              </div>
              <div className="d-flex">
                <a>Char2</a><input type="number" name="vt" onChange={e => setS5Char2Result(e.currentTarget.value)}
                  style={{width: '-webkit-fill-available'}}
                />
              </div>
            </div>
          </Col>
          <Col md={5}>
            <div>
              <label>Char 1</label>
              <select name="Char" id="Char1"
                onChange={e => setS5Char1(e.currentTarget.value)}
              >
                <option value=""></option>
                {characters.map((char) => (
                  <Options
                    id={char.id}
                    title={char.title}
                  />
                ))}
              </select>
            </div>
            <div>
              <label>VS</label>
              <input type="number" name="vs" onChange={e => setS5Char1VS(e.currentTarget.value)} />  
            </div>
            <div>
              <label>VT</label>
              <input type="number" name="vt" onChange={e => setS5Char1VT(e.currentTarget.value)} />  
            </div>
          </Col>
          <Col md={5}>
            <div>
              <label>Char 2</label>
              <select name="Char" id="Char2"
                onChange={e => setS5Char2(e.currentTarget.value)}
              >
                <option value=""></option>
                {characters.map((char) => (
                  <Options
                    id={char.id}
                    title={char.title}
                  />
                ))}
              </select>
            </div>
            <div>
              <label>VS</label>
              <input type="number" name="vs" onChange={e => setS5Char2VS(e.currentTarget.value)} />
            </div>
            <div>
              <label>VT</label>
              <input type="number" name="vt" onChange={e => setS5Char2VT(e.currentTarget.value)} />
            </div>
          </Col>
        </Row>

        <button className="button add-button">Add</button>
      </form>
    </div>
  )
}

export default AddMatch;
