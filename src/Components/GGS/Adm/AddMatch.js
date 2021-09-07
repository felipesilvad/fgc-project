import React, { useState, useEffect } from 'react';
import firebase from '../../../firebase';
import Select from 'react-select'
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';


function usePlayers() {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('Players')
      .onSnapshot((snapshot) => {
        const newPlayers = snapshot.docs.map((doc) => ({
          value: doc.id, label: doc.data().title
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
      .doc('Guilty Gear Strive')
      .collection('Characters')
      .onSnapshot((snapshot) => {
        const newCharacters = snapshot.docs.map((doc) => ({
          value: doc.id, label: doc.data().title
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
  const [videoID, setVideoID] = useState('');
  const [videoType, setVideoType] = useState('Twitch');
  const [date, setDate] = useState('');
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [endTime, setEndTime] = useState('');

  const [S1time, setS1Time] = useState('');
  const [S1Char1, setS1Char1] = useState('');
  const [S1Char1Result, setS1Char1Result] = useState('');
  const [S1Char2, setS1Char2] = useState('');
  const [S1Char2Result, setS1Char2Result] = useState('');

  const [S2time, setS2Time] = useState('');
  const [S2Char1, setS2Char1] = useState('');
  const [S2Char1Result, setS2Char1Result] = useState('');
  const [S2Char2, setS2Char2] = useState('');
  const [S2Char2Result, setS2Char2Result] = useState('');

  const [S3time, setS3Time] = useState('');
  const [S3Char1, setS3Char1] = useState('');
  const [S3Char1Result, setS3Char1Result] = useState('');
  const [S3Char2, setS3Char2] = useState('');
  const [S3Char2Result, setS3Char2Result] = useState('');

  const [S4time, setS4Time] = useState('');
  const [S4Char1, setS4Char1] = useState('');
  const [S4Char1Result, setS4Char1Result] = useState('');
  const [S4Char2, setS4Char2] = useState('');
  const [S4Char2Result, setS4Char2Result] = useState('');

  const [S5time, setS5Time] = useState('');
  const [S5Char1, setS5Char1] = useState('');
  const [S5Char1Result, setS5Char1Result] = useState('');
  const [S5Char2, setS5Char2] = useState('');
  const [S5Char2Result, setS5Char2Result] = useState('');

  const [S6time, setS6Time] = useState('');
  const [S6Char1, setS6Char1] = useState('');
  const [S6Char1Result, setS6Char1Result] = useState('');
  const [S6Char2, setS6Char2] = useState('');
  const [S6Char2Result, setS6Char2Result] = useState('');

  const [S7time, setS7Time] = useState('');
  const [S7Char1, setS7Char1] = useState('');
  const [S7Char1Result, setS7Char1Result] = useState('');
  const [S7Char2, setS7Char2] = useState('');
  const [S7Char2Result, setS7Char2Result] = useState('');

  const sets = []
  
  function onSubmit(e) {
    e.preventDefault()

    if (S1time) {
      if (S1Char1Result > S1Char2Result) {
        sets.push({
          "id": 1,
          "h": S1time.split(':')[0],
          "m": S1time.split(':')[1],
          "s": S1time.split(':')[2],
          "Char1": S1Char1,
          "Char1Result": S1Char1Result,
          "Char2": S1Char2,
          "Char2Result": S1Char2Result,
          "WChar": S1Char1,
          "WPlayer": player1,
          "LChar": S1Char2,
          "LPlayer": player2,
        })
      } else {
        sets.push({
          "id": 1,
          "h": S1time.split(':')[0],
          "m": S1time.split(':')[1],
          "s": S1time.split(':')[2],
          "Char1": S1Char1,
          "Char1Result": S1Char1Result,
          "Char2": S1Char2,
          "Char2Result": S1Char2Result,
          "WChar": S1Char2,
          "WPlayer": player2,
          "LChar": S1Char1,
          "LPlayer": player1,
        })
      }
    }
    if (S2time) {
      if (S2Char1Result > S2Char2Result) {
        sets.push({
          "id": 2,
          "h": S2time.split(':')[0],
          "m": S2time.split(':')[1],
          "s": S2time.split(':')[2],
          "Char1": S2Char1,
          "Char1Result": S2Char1Result,
          "Char2": S2Char2,
          "Char2Result": S2Char2Result,
          "WChar": S2Char1,
          "WPlayer": player1,
          "LChar": S2Char2,
          "LPlayer": player2,
        })
      } else {
        sets.push({
          "id": 2,
          "h": S2time.split(':')[0],
          "m": S2time.split(':')[1],
          "s": S2time.split(':')[2],
          "Char1": S2Char1,
          "Char1Result": S2Char1Result,
          "Char2": S2Char2,
          "Char2Result": S2Char2Result,
          "WChar": S2Char2,
          "WPlayer": player2,
          "LChar": S2Char1,
          "LPlayer": player1,
        })
      }
    }
    if (S3time) {
      if (S3Char1Result > S3Char2Result) {
        sets.push({
          "id": 3,
          "h": S3time.split(':')[0],
          "m": S3time.split(':')[1],
          "s": S3time.split(':')[2],
          "Char1": S3Char1,
          "Char1Result": S3Char1Result,
          "Char2": S3Char2,
          "Char2Result": S3Char2Result,
          "WChar": S3Char1,
          "WPlayer": player1,
          "LChar": S3Char2,
          "LPlayer": player2,
        })
      } else {
        sets.push({
          "id": 3,
          "h": S3time.split(':')[0],
          "m": S3time.split(':')[1],
          "s": S3time.split(':')[2],
          "Char1": S3Char1,
          "Char1Result": S3Char1Result,
          "Char2": S3Char2,
          "Char2Result": S3Char2Result,
          "WChar": S3Char2,
          "WPlayer": player2,
          "LChar": S3Char1,
          "LPlayer": player1,
        })
      }
    }
    if (S4time) {
      if (S4Char1Result > S4Char2Result) {
        sets.push({
          "id": 4,
          "h": S4time.split(':')[0],
          "m": S4time.split(':')[1],
          "s": S4time.split(':')[2],
          "Char1": S4Char1,
          "Char1Result": S4Char1Result,
          "Char2": S4Char2,
          "Char2Result": S4Char2Result,
          "WChar": S4Char1,
          "WPlayer": player1,
          "LChar": S4Char2,
          "LPlayer": player2,
        })
      } else {
        sets.push({
          "id": 4,
          "h": S4time.split(':')[0],
          "m": S4time.split(':')[1],
          "s": S4time.split(':')[2],
          "Char1": S4Char1,
          "Char1Result": S4Char1Result,
          "Char2": S4Char2,
          "Char2Result": S4Char2Result,
          "WChar": S4Char2,
          "WPlayer": player2,
          "LChar": S4Char1,
          "LPlayer": player1,
        })
      }
    }
    if (S5time) {
      if (S5Char1Result > S5Char2Result) {
        sets.push({
          "id": 5,
          "h": S5time.split(':')[0],
          "m": S5time.split(':')[1],
          "s": S5time.split(':')[2],
          "Char1": S5Char1,
          "Char1Result": S5Char1Result,
          "Char2": S5Char2,
          "Char2Result": S5Char2Result,
          "WChar": S5Char1,
          "WPlayer": player1,
          "LChar": S5Char2,
          "LPlayer": player2,
        })
      } else {
        sets.push({
          "id": 5,
          "h": S5time.split(':')[0],
          "m": S5time.split(':')[1],
          "s": S5time.split(':')[2],
          "Char1": S5Char1,
          "Char1Result": S5Char1Result,
          "Char2": S5Char2,
          "Char2Result": S5Char2Result,
          "WChar": S5Char2,
          "WPlayer": player2,
          "LChar": S5Char1,
          "LPlayer": player1,
        })
      }
    }
    if (S6time) {
      if (S6Char1Result > S6Char2Result) {
        sets.push({
          "id": 6,
          "h": S6time.split(':')[0],
          "m": S6time.split(':')[1],
          "s": S6time.split(':')[2],
          "Char1": S6Char1,
          "Char1Result": S6Char1Result,
          "Char2": S6Char2,
          "Char2Result": S6Char2Result,
          "WChar": S6Char1,
          "WPlayer": player1,
          "LChar": S6Char2,
          "LPlayer": player2,
        })
      } else {
        sets.push({
          "id": 5,
          "h": S6time.split(':')[0],
          "m": S6time.split(':')[1],
          "s": S6time.split(':')[2],
          "Char1": S6Char1,
          "Char1Result": S6Char1Result,
          "Char2": S6Char2,
          "Char2Result": S6Char2Result,
          "WChar": S6Char2,
          "WPlayer": player2,
          "LChar": S6Char1,
          "LPlayer": player1,
        })
      }
    }
    if (S7time) {
      if (S7Char1Result > S7Char2Result) {
        sets.push({
          "id": 7,
          "h": S7time.split(':')[0],
          "m": S7time.split(':')[1],
          "s": S7time.split(':')[2],
          "Char1": S7Char1,
          "Char1Result": S7Char1Result,
          "Char2": S7Char2,
          "Char2Result": S7Char2Result,
          "WChar": S7Char1,
          "WPlayer": player1,
          "LChar": S7Char2,
          "LPlayer": player2,
        })
      } else {
        sets.push({
          "id": 5,
          "h": S7time.split(':')[0],
          "m": S7time.split(':')[1],
          "s": S7time.split(':')[2],
          "Char1": S7Char1,
          "Char1Result": S7Char1Result,
          "Char2": S7Char2,
          "Char2Result": S7Char2Result,
          "WChar": S7Char2,
          "WPlayer": player2,
          "LChar": S7Char1,
          "LPlayer": player1,
        })
      }
    }

    const matchRef = firebase.firestore().collection('games').doc('Guilty Gear Strive').collection('Matches');

    matchRef.add({
      type, player1, player2, sets, tournament_id, videoID, videoType, endTime,
      date: firebase.firestore.Timestamp.fromDate(new Date(moment(date).format('MMMM D YYYY'))),
    })

  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label><h4 id="stat">Add Match</h4></label>
        <input type="text" onChange={e => setVideoID(e.currentTarget.value)} />
        Date
        <input type="date" onChange={e => setDate(e.currentTarget.value)} />
        <select name="Type" id="Type"
          onChange={e => setType(e.currentTarget.value)}
        >
          <option value=""></option>
          <option value="Pools">Pools</option>
          <option value="Top 128">Top 128</option>
          <option value="Top 64">Top 64</option>
          <option value="Top 48">Top 48</option>
          <option value="Top 32">Top 32</option>
          <option value="Top 16">Top 16</option>
          <option value="Top 8">Top 8</option>
          <option value="Winners Final">Winners Final</option>
          <option value="Losers Semi-Final">Losers Semi-Final</option>
          <option value="Losers Final">Losers Final</option>
          <option value="Grand Final">Grand Final</option>
          <option value="Grand Final Reset">Grand Final Reset</option>
        </select>
        <select name="videoType" id="videoType"
          onChange={e => setVideoType(e.currentTarget.value)}
        >
          <option value="Twitch">Twitch</option>
          <option value="Youtube">Youtube</option>
        </select>
        <Row>
          <Col>
            <label>Player 1</label>
            <Select 
              options={players} onChange={e => setPlayer1(e.value)}
              className="Selector" isSearchable
            />
          </Col>
          <Col>
            <label>Player 2</label>
            <Select 
              options={players} onChange={e => setPlayer2(e.value)}
              className="Selector" isSearchable
            />
          </Col>
        </Row>
        
        <Row className="add-set" id="set1">
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
                <input type="number" name="vt" min="0" max="2" onChange={e => setS1Char1Result(e.currentTarget.value)}
                  style={{width: '-webkit-fill-available'}}
                />
              </div>
              <div className="d-flex">
                <a>Char2</a><input type="number" name="vt" min="0" max="2" onChange={e => setS1Char2Result(e.currentTarget.value)}
                  style={{width: '-webkit-fill-available'}}
                />
              </div>
            </div>
          </Col>
          <Col md={5}>
            <div>
              <label>Char 1</label>
              <Select 
                options={characters} onChange={e => setS1Char1(e.value)}
                className="Selector" isSearchable
              />
            </div>
          </Col>
          <Col md={5}>
            <div>
              <label>Char 2</label>
              <Select 
                options={characters} onChange={e => setS1Char2(e.value)}
                className="Selector" isSearchable
              />
            </div>
          </Col>
        </Row>

        <Row className="add-set" id="set2">
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
                <input type="number" name="vt" min="0" max="2" onChange={e => setS2Char1Result(e.currentTarget.value)}
                  style={{width: '-webkit-fill-available'}}
                />
              </div>
              <div className="d-flex">
                <a>Char2</a><input type="number" name="vt" min="0" max="2" onChange={e => setS2Char2Result(e.currentTarget.value)}
                  style={{width: '-webkit-fill-available'}}
                />
              </div>
            </div>
          </Col>
          <Col md={5}>
            <div>
              <label>Char 1</label>
              <Select 
                options={characters} onChange={e => setS2Char1(e.value)}
                className="Selector" isSearchable
              />
            </div>
          </Col>
          <Col md={5}>
            <div>
              <label>Char 2</label>
              <Select 
                options={characters} onChange={e => setS2Char2(e.value)}
                className="Selector" isSearchable
              />
            </div>
          </Col>
        </Row>

        <Row className="add-set" id="set3">
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
                <input type="number" name="vt" min="0" max="2" onChange={e => setS3Char1Result(e.currentTarget.value)}
                  style={{width: '-webkit-fill-available'}}
                />
              </div>
              <div className="d-flex">
                <a>Char2</a><input type="number" name="vt" min="0" max="2" onChange={e => setS3Char2Result(e.currentTarget.value)}
                  style={{width: '-webkit-fill-available'}}
                />
              </div>
            </div>
          </Col>
          <Col md={5}>
            <div>
              <label>Char 1</label>
              <Select 
                options={characters} onChange={e => setS3Char1(e.value)}
                className="Selector" isSearchable
              />
            </div>
          </Col>
          <Col md={5}>
            <div>
              <label>Char 2</label>
              <Select 
                options={characters} onChange={e => setS3Char2(e.value)}
                className="Selector" isSearchable
              />
            </div>
          </Col>
        </Row>

        <Row className="add-set" id="set4">
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
                <input type="number" name="vt" min="0" max="2" onChange={e => setS4Char1Result(e.currentTarget.value)}
                  style={{width: '-webkit-fill-available'}}
                />
              </div>
              <div className="d-flex">
                <a>Char2</a><input type="number" name="vt" min="0" max="2" onChange={e => setS4Char2Result(e.currentTarget.value)}
                  style={{width: '-webkit-fill-available'}}
                />
              </div>
            </div>
          </Col>
          <Col md={5}>
            <div>
              <label>Char 1</label>
              <Select 
                options={characters} onChange={e => setS4Char1(e.value)}
                className="Selector" isSearchable
              />
            </div>
          </Col>
          <Col md={5}>
            <div>
              <label>Char 2</label>
              <Select 
                options={characters} onChange={e => setS4Char2(e.value)}
                className="Selector" isSearchable
              />
            </div>
          </Col>
        </Row>

        <Row className="add-set" id="set5">
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
                <input type="number" name="vt" min="0" max="2" onChange={e => setS5Char1Result(e.currentTarget.value)}
                  style={{width: '-webkit-fill-available'}}
                />
              </div>
              <div className="d-flex">
                <a>Char2</a><input type="number" name="vt" min="0" max="2" onChange={e => setS5Char2Result(e.currentTarget.value)}
                  style={{width: '-webkit-fill-available'}}
                />
              </div>
            </div>
          </Col>
          <Col md={5}>
            <div>
              <label>Char 1</label>
              <Select 
                options={characters} onChange={e => setS5Char1(e.value)}
                className="Selector" isSearchable
              />
            </div>
          </Col>
          <Col md={5}>
            <div>
              <label>Char 2</label>
              <Select 
                options={characters} onChange={e => setS5Char2(e.value)}
                className="Selector" isSearchable
              />
            </div>
          </Col>
        </Row>

        <Row className="add-set" id="set5">
          <label>SET 6</label>
          <Col md={2}>
            <input type="text" name="time" placeholder="Time" 
              onChange={e => setS6Time(e.currentTarget.value)}
              style={{width: '-webkit-fill-available'}}
            />  
            <div>
              <label>Results</label>
              <div className="d-flex">
                <a>Char1</a>
                <input type="number" name="vt" min="0" max="2" onChange={e => setS6Char1Result(e.currentTarget.value)}
                  style={{width: '-webkit-fill-available'}}
                />
              </div>
              <div className="d-flex">
                <a>Char2</a><input type="number" name="vt" min="0" max="2" onChange={e => setS6Char2Result(e.currentTarget.value)}
                  style={{width: '-webkit-fill-available'}}
                />
              </div>
            </div>
          </Col>
          <Col md={5}>
            <div>
              <label>Char 1</label>
              <Select 
                options={characters} onChange={e => setS6Char1(e.value)}
                className="Selector" isSearchable
              />
            </div>
          </Col>
          <Col md={5}>
            <div>
              <label>Char 2</label>
              <Select 
                options={characters} onChange={e => setS6Char2(e.value)}
                className="Selector" isSearchable
              />
            </div>
          </Col>
        </Row>

        <Row className="add-set" id="set5">
          <label>SET 7</label>
          <Col md={2}>
            <input type="text" name="time" placeholder="Time" 
              onChange={e => setS7Time(e.currentTarget.value)}
              style={{width: '-webkit-fill-available'}}
            />  
            <div>
              <label>Results</label>
              <div className="d-flex">
                <a>Char1</a>
                <input type="number" name="vt" min="0" max="2" onChange={e => setS7Char1Result(e.currentTarget.value)}
                  style={{width: '-webkit-fill-available'}}
                />
              </div>
              <div className="d-flex">
                <a>Char2</a><input type="number" name="vt" min="0" max="2" onChange={e => setS7Char2Result(e.currentTarget.value)}
                  style={{width: '-webkit-fill-available'}}
                />
              </div>
            </div>
          </Col>
          <Col md={5}>
            <div>
              <label>Char 1</label>
              <Select 
                options={characters} onChange={e => setS7Char1(e.value)}
                className="Selector" isSearchable
              />
            </div>
          </Col>
          <Col md={5}>
            <div>
              <label>Char 2</label>
              <Select 
                options={characters} onChange={e => setS7Char2(e.value)}
                className="Selector" isSearchable
              />
            </div>
          </Col>
        </Row>
        <input type="text" onChange={e => setEndTime(e.currentTarget.value)} />
        <button className="button add-button">Add</button>
      </form>
    </div>
  )
}

export default AddMatch;
