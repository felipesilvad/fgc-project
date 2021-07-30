import React, {useState, useEffect} from 'react';
import ReactPlayer from 'react-player'
import firebase from '../../../firebase';
import MatchListPlayer from '../List/MatchListPlayer'
import {Container, Row, Col, Tab, Nav} from 'react-bootstrap';

const MatchDetail = ({match}) => {

  const matchGameRef = firebase.firestore().collection('games').doc('Street Fighter V').collection('Matches').doc(match.params.id);
  const [matchGame, setMatchGame] = useState('');

  useEffect(() => {
    matchGameRef.get().then((matchGame) => {
      const newMatchGame = matchGame.data();
      setMatchGame(newMatchGame)
    })
  }, [])

  console.log(matchGame)
  return (
    <Container >
      Match Detail {matchGame.player1}
      <div class="d-flex justify-content-between">
        {!! matchGame.player1 &&(
          <MatchListPlayer id={matchGame.player1} />
        )}
        {!! matchGame.player2 &&(
          <MatchListPlayer id={matchGame.player2} />
        )}
      </div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {!! matchGame.sets &&(
                matchGame.sets.map((set) => (
                  <Nav.Item>
                    <Nav.Link eventKey={`set${set.id}`}>
                      Set {set.id}
                      <div class="d-flex justify-content-between">
                        <a>{set.Char1}</a>
                        <a>{set.Char2}</a>
                      </div>
                    </Nav.Link>
                  </Nav.Item>
                ))
              )}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              {!! matchGame.sets &&(
                matchGame.sets.map((set) => (
                  <Tab.Pane eventKey={`set${set.id}`}>
                    <ReactPlayer
                      className="d-flex justify-content-center"
                      url={`https://www.twitch.tv/videos/${matchGame.videoID}?t=${set.h}h${set.m}m${set.s}s`}
                      controls='true'
                      muted={false}
                      autoplay='false'
                    />
                  </Tab.Pane>
                ))
              )}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

    </Container>
  )
}

export default MatchDetail;