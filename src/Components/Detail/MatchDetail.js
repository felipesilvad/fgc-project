import React, { } from 'react';
import { Row, Col, Image, Table, Container, Tabs, Tab } from 'react-bootstrap';

const MatchDetail = ({match}) => {

  return (
    <Container className="p-0">
      <iframe
        src="https://player.twitch.tv/?channel=dallas&parent=www.populousoriginalstore.it&muted=true"
        height="720"
        width="1280"
        allowfullscreen="true">
    </iframe>
    </Container>
  )
}

export default MatchDetail;