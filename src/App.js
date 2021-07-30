import React, { PureComponent } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Adm from './Components/Adm';
import SFV from './Components/SFV/SFV';
import MatchDetail from './Components/SFV/Detail/MatchDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

export default class App extends PureComponent {
  render() {
    return (
      <Router>
        <Container fuild>
          <SFV />
          <Route path="/SFV/adm" component={Adm}/>
        </Container>
      </Router>
    )
  }
}