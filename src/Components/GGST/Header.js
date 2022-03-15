import React, { PureComponent } from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

export default class Header extends PureComponent {
  render() {

    return (
      <Navbar  expand="lg">
        <Container>
          <Navbar.Toggle className='text-light' aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className='text-light' href="/GGST">Home</Nav.Link>
              <Nav.Link className='text-light' href="/GGST/vods">Vods</Nav.Link>
              <NavDropdown className='text-light' title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className='text-light' href="/GGST/character">Characters</Nav.Link>
              <Nav.Link className='text-light' href="/GGST/tournaments">Tournaments</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}
