import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import AdmGame from './Adm/AdmGame';
import AddTournament from './Adm/AddTournament';
import AdmTournament from './Adm/AdmTournament';
import MatchList from './List/MatchList';
import MatchDetail from './Detail/MatchDetail';
import CharacterDetail from './Detail/CharacterDetail';
import TournamentDetail from './Detail/TournamentDetail';
import TournamentsList from './List/TournamentsList';
import CharactersList from './List/CharacterList';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

function GGST() {
  return (
    <Container fuild>
      <Route path="/GGST/adm" component={AdmGame} exact/>
      <Route path="/GGST/adm/tournaments" component={AddTournament} exact/>
      <Route path="/GGST/adm/tournaments/:id" component={AdmTournament} exact/>
      <Route path="/GGST/vods" component={MatchList} exact/>
      <Route path="/GGST/vods/:id" component={MatchDetail} exact/>
      <Route path="/GGST/character/" component={CharactersList} exact/>
      <Route path="/GGST/character/:id" component={CharacterDetail} exact/>
      <Route path="/GGST/tournaments/" component={TournamentsList} exact/>
      <Route path="/GGST/tournaments/:id" component={TournamentDetail} exact/>
    </Container>
  );
}

export default GGST;