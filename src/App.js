import React, { PureComponent } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Adm from './Components/Adm/Adm';
import AdmGameSFV from './Components/Adm/SFV/AdmGameSFV';
import AdmTournament from './Components/Adm/SFV/AdmTournament';
import MatchDetail from './Components/Detail/MatchDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

export default class App extends PureComponent {
  render() {
    return (
      <Router>
        <Container fuild>
          <Route path="/adm/SFV" component={AdmGameSFV} exact/>
          <Route path="/adm/SFV/:id" component={AdmTournament} exact/>
          <Route path="/" component={MatchDetail} exact/>
          <Route path="/adm" component={Adm}/>

        </Container>
      </Router>
    )
  }
}