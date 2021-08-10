import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import firebase from '../../../firebase';
import MatchListChar from '../List/MatchListChar'

import {Row, Col, Nav} from 'react-bootstrap';

function MatchDetail ({match}) {
  const matchGameRef = firebase.firestore().collection('games').doc('Guilty Gear Strive').collection('Matches').doc(match.params.id);
  const [matchGame, setMatchGame] = useState('');
  useEffect(() => {
    matchGameRef.get().then((matchGame) => {
      const newMatchGame = matchGame.data();
      setMatchGame(newMatchGame)
    })
  }, [])

  const [state, setState] = useState({
    played: 0,
  });
  const playerRef = useRef(null);

  const handleTime = (time) => {
    playerRef.current.seekTo(time)
  }

  const {played} = state

  return (
    <div className='app'>
      <section className='section'>
        <h1>ReactPlayer Demo</h1>
        <Row>
          <Col className="d-flex justify-content-center">
            {!! matchGame.sets &&(
              <ReactPlayer
                ref={playerRef}
                className="player"
                url={`https://www.twitch.tv/videos/${matchGame.videoID}`}
                controls='true'
                config={{
                  twitch: {
                    options: {
                      time: `${matchGame.sets[0].h}h${matchGame.sets[0].m}m${matchGame.sets[0].s}s`
                    },
                  }
                }}
                muted={false}
                autoplay='false'
              />
            )}
          </Col>
          <Col md={4} >
            <Nav variant="pills" className="flex-column">
              {!! matchGame.sets &&(
                matchGame.sets.map((set) => (
                  <Nav.Item>
                    <Nav.Link onClick={() => handleTime(
                      (parseInt(set.h) * 3600) + (parseInt(set.m) * 60) + parseInt(set.s)
                    )}>
                      <MatchListChar id1={set.Char1} id2={set.Char2}/>
                    </Nav.Link>
                  </Nav.Item>
                ))
              )}
            </Nav>
          </Col>
        </Row>
        <table>
          <tbody>
            <tr>
              <th>Controls</th>
              <td>
                <button onClick={handleTime}>Wookr</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default MatchDetail