import React, { useState, useRef, useEffect } from "react";
import firebase from '../../../firebase';
import {Link} from 'react-router-dom';
import MatchListPlayer from '../List/MatchListPlayer';
import MatchListChar from '../List/MatchListChar';
import {Row, Col, Tabs, Tab} from 'react-bootstrap';

function useMatch() {
  const [match, setMatch] = useState([])

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('games')
      .doc('Guilty Gear Strive')
      .collection('Matches')
      // .orderBy('endTime')
      .onSnapshot((snapshot) => {
        const newMatch = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        setMatch(newMatch)
      })
    return () => unsubscribe()
  }, [])

  return match;
}

function TournamentDetail ({match}) {
  const matchesGame = useMatch().filter(matchs => matchs.tournament_id === match.params.id);

  const tournamentRef = firebase.firestore().collection('games').doc('Guilty Gear Strive').collection('Tournaments').doc(match.params.id);
  const [tournament, setTournament] = useState('');
  useEffect(() => {
    tournamentRef.get().then((Tournament) => {
      const newTournament = Tournament.data();
      setTournament(newTournament)
    })
  }, [])

  return (
    <Row className=''>
      <Col md={2} className="side-bg">
        <div>
          <h2 className="player-title">{tournament.title}</h2>
          {!! tournament.start_date &&(
            <h5>Date: {tournament.start_date.toDate().toLocaleDateString()}</h5>
          )}
          {!! tournament.start_date &&(
            <h5>Type: {tournament.type}</h5>
          )}
          {!! tournament.start_date &&(
            <h5>Entrants: {tournament.entrants}</h5>
          )}
          {!! tournament.start_date &&(
            <h5>Format: {tournament.format}</h5>
          )}
          {!! tournament.smashgg &&(
            <div className="text-center smashgg-bg">
              <a href={tournament.smashgg} className="smashgg-bg">smash.gg</a>
            </div>
          )}
          {!! tournament.tonamel &&(
            <div className="text-center tonamel-bg">
              <a href={tournament.tonamel} className="tonamel-bg">Tonamel</a>
            </div>
          )}
        </div>
      </Col>
      <Col className="scrollbar scrollbar-primary">
        <Tabs>
          <Tab className="t-tab-overflow" eventKey="Top 8" title="Top 8">
            {matchesGame.filter(matchs => matchs.type == "Grand Final Reset")
            .map((matchGame) => (
              <Link to={`/GGST/vods/${matchGame.id}`}>
                <div className="add-set p-3">
                  <div class="text-center">
                    {matchGame.type}
                  </div>
                  <MatchListPlayer id1={matchGame.player1} id2={matchGame.player2}/>
                  <MatchListChar id1={matchGame.sets[0].Char1} id2={matchGame.sets[0].Char2} />
                </div>
              </Link>
            ))}
            {matchesGame.filter(matchs => matchs.type == "Grand Final")
            .map((matchGame) => (
              <Link to={`/GGST/vods/${matchGame.id}`}>
                <div className="add-set p-3">
                  <div class="text-center">
                    {matchGame.type}
                  </div>
                  <MatchListPlayer id1={matchGame.player1} id2={matchGame.player2}/>
                  <MatchListChar id1={matchGame.sets[0].Char1} id2={matchGame.sets[0].Char2} />
                </div>
              </Link>
            ))}
            {matchesGame.filter(matchs => matchs.type == "Semi Final")
            .map((matchGame) => (
              <Link to={`/GGST/vods/${matchGame.id}`}>
                <div className="add-set p-3">
                  <div class="text-center">
                    {matchGame.type}
                  </div>
                  <MatchListPlayer id1={matchGame.player1} id2={matchGame.player2}/>
                  <MatchListChar id1={matchGame.sets[0].Char1} id2={matchGame.sets[0].Char2} />
                </div>
              </Link>
            ))}
            {matchesGame.filter(matchs => matchs.type == "Losers Final")
            .map((matchGame) => (
              <Link to={`/GGST/vods/${matchGame.id}`}>
                <div className="add-set p-3">
                  <div class="text-center">
                    {matchGame.type}
                  </div>
                  <MatchListPlayer id1={matchGame.player1} id2={matchGame.player2}/>
                  <MatchListChar id1={matchGame.sets[0].Char1} id2={matchGame.sets[0].Char2} />
                </div>
              </Link>
            ))}
            {matchesGame.filter(matchs => matchs.type == "Losers Semi-Final")
            .map((matchGame) => (
              <Link to={`/GGST/vods/${matchGame.id}`}>
                <div className="add-set p-3">
                  <div class="text-center">
                    {matchGame.type}
                  </div>
                  <MatchListPlayer id1={matchGame.player1} id2={matchGame.player2}/>
                  <MatchListChar id1={matchGame.sets[0].Char1} id2={matchGame.sets[0].Char2} />
                </div>
              </Link>
            ))}
            {matchesGame.filter(matchs => matchs.type == "Winners Final")
            .map((matchGame) => (
              <Link to={`/GGST/vods/${matchGame.id}`}>
                <div className="add-set p-3">
                  <div class="text-center">
                    {matchGame.type}
                  </div>
                  <MatchListPlayer id1={matchGame.player1} id2={matchGame.player2}/>
                  <MatchListChar id1={matchGame.sets[0].Char1} id2={matchGame.sets[0].Char2} />
                </div>
              </Link>
            ))}
            {matchesGame.filter(matchs => matchs.type == "Top 4")
            .map((matchGame) => (
              <Link to={`/GGST/vods/${matchGame.id}`}>
                <div className="add-set p-3">
                  <div class="text-center">
                    {matchGame.type}
                  </div>
                  <MatchListPlayer id1={matchGame.player1} id2={matchGame.player2}/>
                  <MatchListChar id1={matchGame.sets[0].Char1} id2={matchGame.sets[0].Char2} />
                </div>
              </Link>
            ))}
            {matchesGame.filter(matchs => matchs.type == "Top 8")
            .map((matchGame) => (
              <Link to={`/GGST/vods/${matchGame.id}`}>
                <div className="add-set p-3">
                  <div class="text-center">
                    {matchGame.type}
                  </div>
                  <MatchListPlayer id1={matchGame.player1} id2={matchGame.player2}/>
                  <MatchListChar id1={matchGame.sets[0].Char1} id2={matchGame.sets[0].Char2} />
                </div>
              </Link>
            ))}
          </Tab>
          {!! matchesGame.filter(matchs => matchs.type == "Top 16")[0] && (
            <Tab className="t-tab-overflow" eventKey="Top 16" title="Top 16">
              {matchesGame.filter(matchs => matchs.type == "Top 16")
              .map((matchGame) => (
                <Link to={`/GGST/vods/${matchGame.id}`}>
                  <div className="add-set p-3">
                    <div class="text-center">
                      {matchGame.type}
                    </div>
                    <MatchListPlayer id1={matchGame.player1} id2={matchGame.player2}/>
                    <MatchListChar id1={matchGame.sets[0].Char1} id2={matchGame.sets[0].Char2} />
                  </div>
                </Link>
              ))}
            </Tab>
          )}
          {!! matchesGame.filter(matchs => matchs.type == "Top 24")[0] && (
            <Tab className="t-tab-overflow" eventKey="Top 24" title="Top 24">
              {matchesGame.filter(matchs => matchs.type == "Top 24")
              .map((matchGame) => (
                <Link to={`/GGST/vods/${matchGame.id}`}>
                  <div className="add-set p-3">
                    <div class="text-center">
                      {matchGame.type}
                    </div>
                    <MatchListPlayer id1={matchGame.player1} id2={matchGame.player2}/>
                    <MatchListChar id1={matchGame.sets[0].Char1} id2={matchGame.sets[0].Char2} />
                  </div>
                </Link>
              ))}
            </Tab>
          )}
          {!! matchesGame.filter(matchs => matchs.type == "Top 32")[0] && (
            <Tab className="t-tab-overflow" eventKey="Top 32" title="Top 32">
              {matchesGame.filter(matchs => matchs.type == "Top 32")
              .map((matchGame) => (
                <Link to={`/GGST/vods/${matchGame.id}`}>
                  <div className="add-set p-3">
                    <div class="text-center">
                      {matchGame.type}
                    </div>
                    <MatchListPlayer id1={matchGame.player1} id2={matchGame.player2}/>
                    <MatchListChar id1={matchGame.sets[0].Char1} id2={matchGame.sets[0].Char2} />
                  </div>
                </Link>
              ))}
            </Tab>
          )}
          {!! matchesGame.filter(matchs => matchs.type == "Top 48")[0] && (
            <Tab className="t-tab-overflow" eventKey="Top 48" title="Top 48">
              {matchesGame.filter(matchs => matchs.type == "Top 48")
              .map((matchGame) => (
                <Link to={`/GGST/vods/${matchGame.id}`}>
                  <div className="add-set p-3">
                    <div class="text-center">
                      {matchGame.type}
                    </div>
                    <MatchListPlayer id1={matchGame.player1} id2={matchGame.player2}/>
                    <MatchListChar id1={matchGame.sets[0].Char1} id2={matchGame.sets[0].Char2} />
                  </div>
                </Link>
              ))}
            </Tab>
          )}
          {!! matchesGame.filter(matchs => matchs.type == "Top 64")[0] && (
            <Tab className="t-tab-overflow" eventKey="Top 64" title="Top 64">
              {matchesGame.filter(matchs => matchs.type == "Top 64")
              .map((matchGame) => (
                <Link to={`/GGST/vods/${matchGame.id}`}>
                  <div className="add-set p-3">
                    <div class="text-center">
                      {matchGame.type}
                    </div>
                    <MatchListPlayer id1={matchGame.player1} id2={matchGame.player2}/>
                    <MatchListChar id1={matchGame.sets[0].Char1} id2={matchGame.sets[0].Char2} />
                  </div>
                </Link>
              ))}
            </Tab>
          )}
          {!! matchesGame.filter(matchs => matchs.type == "Top 96")[0] && (
            <Tab className="t-tab-overflow" eventKey="Top 96" title="Top 96">
              {matchesGame.filter(matchs => matchs.type == "Top 96")
              .map((matchGame) => (
                <Link to={`/GGST/vods/${matchGame.id}`}>
                  <div className="add-set p-3">
                    <div class="text-center">
                      {matchGame.type}
                    </div>
                    <MatchListPlayer id1={matchGame.player1} id2={matchGame.player2}/>
                    <MatchListChar id1={matchGame.sets[0].Char1} id2={matchGame.sets[0].Char2} />
                  </div>
                </Link>
              ))}
            </Tab>
          )}
          {!! matchesGame.filter(matchs => matchs.type == "Top 128")[0] && (
            <Tab className="t-tab-overflow" eventKey="Top 128" title="Top 128">
              {matchesGame.filter(matchs => matchs.type == "Top 128")
              .map((matchGame) => (
                <Link to={`/GGST/vods/${matchGame.id}`}>
                  <div className="add-set p-3">
                    <div class="text-center">
                      {matchGame.type}
                    </div>
                    <MatchListPlayer id1={matchGame.player1} id2={matchGame.player2}/>
                    <MatchListChar id1={matchGame.sets[0].Char1} id2={matchGame.sets[0].Char2} />
                  </div>
                </Link>
              ))}
            </Tab>
          )}
          {!! matchesGame.filter(matchs => matchs.type == "Pools")[0] && (
            <Tab className="t-tab-overflow" eventKey="Pools" title="Pools">
              {matchesGame.filter(matchs => matchs.type == "Pools")
              .map((matchGame) => (
                <Link to={`/GGST/vods/${matchGame.id}`}>
                  <div className="add-set p-3">
                    <div class="text-center">
                      {matchGame.type}
                    </div>
                    <MatchListPlayer id1={matchGame.player1} id2={matchGame.player2}/>
                    <MatchListChar id1={matchGame.sets[0].Char1} id2={matchGame.sets[0].Char2} />
                  </div>
                </Link>
              ))}
            </Tab>
          )}
        </Tabs>
      </Col>
    </Row>
  );
}

export default TournamentDetail