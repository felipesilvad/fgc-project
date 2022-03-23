import React, { PureComponent } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Adm from './Components/Adm';
import SFV from './Components/SFV/SFV';
import GGST from './Components/GGST/GGST';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

export default class App extends PureComponent {
  render() {
    return (
      <Router>
        <Container fuild>
          <SFV />
          <GGST />
          <Route path="/SFV/adm" component={Adm}/>
          <Route path="/GGST/adm" component={Adm}/>
        </Container>
      </Router>
    )
  }
}