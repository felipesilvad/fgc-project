import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import firebase from '../../../firebase';
import MatchDetailSets from '../Detail/MatchDetailSets'
import ReactCountryFlag from "react-country-flag"
import {Link} from 'react-router-dom';
import {Row, Col, Nav} from 'react-bootstrap';

function usePlayers() {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('Players')
      .onSnapshot((snapshot) => {
        const newPlayers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        setPlayers(newPlayers)
      })
    return () => unsubscribe()
  }, [])

  return players;
}

function useRegions() {
  const [regions, setRegions] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('Regions')
      .onSnapshot((snapshot) => {
        const newRegions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        setRegions(newRegions)
      })
    return () => unsubscribe()
  }, [])

  return regions;
}

function MatchDetail ({match}) {
  const matchGameRef = firebase.firestore().collection('games').doc('Guilty Gear Strive').collection('Matches').doc(match.params.id);
  const [matchGame, setMatchGame] = useState('');
  useEffect(() => {
    matchGameRef.get().then((matchGame) => {
      const newMatchGame = matchGame.data();
      setMatchGame(newMatchGame)
    })
  }, [])

  const players = usePlayers();
  const player1 = players.filter(player =>  player.id === matchGame.player1)[0]
  const player2 = players.filter(player =>  player.id === matchGame.player2)[0]

  const regions = useRegions();
  const region1 = regions.filter(region =>  region.id === player1.region)[0]
  const region2 = regions.filter(region =>  region.id === player2.region)[0]

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
        <Col sm={8} >
          {!! matchGame.sets &&(
            (matchGame.videoType === "Youtube") ? (
              <ReactPlayer 
                ref={playerRef}
                className="player"
                width={`100%`}
                // heigh={1080}
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
          <div class="d-flex justify-content-between">
            <div>
              <Link className="player-title p-2">
                {!! player1 &&(player1.title)}
              </Link>
              {!! region1 &&(
                <ReactCountryFlag countryCode={region1.flag} svg />
              )}
            </div>
            <div>
              {!! region2 &&(
                <ReactCountryFlag countryCode={region2.flag} svg />
              )}
              <Link className="player-title p-2">
                {!! player2 &&(player2.title)}
              </Link>
            </div>
          </div>
        </Col>
        
      </Row>
    </div>
  );
}

export default MatchDetail