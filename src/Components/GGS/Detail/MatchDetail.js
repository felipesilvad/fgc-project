import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import firebase from '../../../firebase';
import MatchDetailSets from '../Detail/MatchDetailSets'

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
      <Row>
        <Col sm={4}  >
          <Nav variant="pills" className="flex-column">
            {!! matchGame.sets &&(
              matchGame.sets.map((set) => (
                <Nav.Item>
                  <Nav.Link onClick={() => handleTime(
                    (parseInt(set.h) * 3600) + (parseInt(set.m) * 60) + parseInt(set.s)
                  )}>
                    <MatchDetailSets set={set}/>
                  </Nav.Link>
                </Nav.Item>
              ))
            )}
          </Nav>
        </Col>
        <Col sm={8} className="d-flex justify-content-center">
          {!! matchGame.sets &&(
            (matchGame.videoType === "Youtube") ? (
              <ReactPlayer
                ref={playerRef}
                className="player"
                width={1920}
                heigh={1080}
                url={`https://www.youtube.com/watch?v=${matchGame.videoID}?t=${((matchGame.sets[0].h*3600) + (matchGame.sets[0].m*60) + parseInt(matchGame.sets[0].s))}`}
                controls='true'
                config={{
                  youtube: {
                    options: {
                      time: `${matchGame.sets[0].h}h${matchGame.sets[0].m}m${matchGame.sets[0].s}s`
                    },
                  }
                }}
                muted={false}
                autoplay='true'
              />
            ) : (
              <ReactPlayer
                ref={playerRef}
                className="player"
                width="100%"
                heigh="100%"
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
            )
          )}
        </Col>
      </Row>
    </div>
  );
}

export default MatchDetail