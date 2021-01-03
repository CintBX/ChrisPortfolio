import React, { Component } from 'react';
import { MDBIcon, MDBContainer, MDBBtn } from 'mdbreact';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

class Footer extends Component {
  render() {
    return (
      <MDBContainer style={styles.container}>
          <Row>
          <Col sm="auto">
            <Link to="/contact-me" style={styles.link}>
              <MDBBtn size="lg" social="email" color="info">
                <MDBIcon icon="envelope" className="pr-1" style={styles.icon} /> Email Me
              </MDBBtn>
            </Link>
          </Col>

          <Col sm="auto">
            <a href="https://www.facebook.com/chris.d.3150"
              target="_blank"
              ref="noopener noreferrer"
              style={styles.link}
            >
              <MDBBtn size="lg" social="fb" color="blue">
                <MDBIcon fab icon="facebook-f" className="pr-1" style={styles.icon} /> Facebook
              </MDBBtn>
            </a>
          </Col>
  
          <Col sm="auto">
            <a href="https://www.instagram.com/virtuoso_lume/"
              target="_blank"
              ref="noopener noreferrer"
              style={styles.link}
            >
              <MDBBtn size="lg" social="ins" className="peach-gradient">
                <MDBIcon fab icon="instagram" className="pr-1" style={styles.icon} /> Instagram
              </MDBBtn>
            </a>
          </Col>
  
          <Col sm="auto">
            <a href="https://www.youtube.com/channel/UCj8pYnnOtWp5OKHzVOh0R3A"
              target="_blank"
              ref="noopener noreferrer"
              style={styles.link}
            >
              <MDBBtn size="lg" social="yt" color="red">
                <MDBIcon fab icon="youtube" className="pr-1" style={styles.icon} /> Youtube
              </MDBBtn>
            </a>
          </Col>
        </Row>
      </MDBContainer>
    );
  };
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 25,
    paddingBottom: 50
  },
  icon: {
    fontSize: '1.5em',
  },
  emailBtn: {
    fontSize: '1.6em'
  },
  link: {
    color: 'white'
  }
};

export default Footer;