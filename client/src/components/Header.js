import React from 'react';
import img from '../images/chrispic.jpg'
import { Container, Row, Col } from 'reactstrap';
import { isAbsolute } from 'path';

const Header = () => {
  return (
    <div>
      <Row style={styles.container}>
        <Col lg="4">
          <div>
            <img src="https://via.placeholder.com/350"/>
          </div>
        </Col>
        <Col lg="8">
          <div style={styles.text}>
            Some text here.  This is an application to display Chris' artwork, and here he is talking
            about himself, what a bloody wankeh

            Some text here.  This is an application to display Chris' artwork, and here he is talking
            about himself, what a bloody wankeh

            Some text here.  This is an application to display Chris' artwork, and here he is talking
            about himself, what a bloody wankeh
          </div>
        </Col>
      </Row>
    </div>
  );
};

const styles = {
  container: {
    padding: 10
  },
  image: {
    borderColor: 'orange'
  },
  text: {
    paddingTop: 80,
  }
}

export default Header;