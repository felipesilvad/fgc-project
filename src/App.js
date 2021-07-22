import React, { PureComponent } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Adm from './Components/Adm/Adm';
import AdmGame from './Components/Adm/AdmGame';
import AdmTournament from './Components/Adm/AdmTournament';
import MatchDetail from './Components/Detail/MatchDetail';

export default class App extends PureComponent {
  render() {
    return (
      <Router>
        <Route path="/adm" component={Adm} exact/>
        <Route path="/adm/:slug" component={AdmGame} exact/>
        <Route path="/adm/:slug/:tournament" component={AdmTournament} exact/>
        <Route path="/" component={MatchDetail} exact/>
      </Router>
    )
  }
}