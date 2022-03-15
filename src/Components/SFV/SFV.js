import React from 'react';
import {BrowserRouter as Route} from 'react-router-dom';
import AdmGameSFV from './Adm/AdmGameSFV';
import AdmTournament from './Adm/AdmTournament';
import MatchList from './List/MatchList';
import MatchDetail from './Detail/MatchDetail';
import CharacterDetail from './Detail/CharacterDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

function SFV() {
  return (
    <Container fuild>
      <Route path="/SFV/adm" component={AdmGameSFV} exact/>
      <Route path="/SFV/adm/:id" component={AdmTournament} exact/>
      <Route path="/SFV/vods" component={MatchList} exact/>
      <Route path="/SFV/vods/:id" component={MatchDetail} exact/>
      <Route path="/SFV/character/:id" component={CharacterDetail} exact/>
    </Container>
  );
}

export default SFV;