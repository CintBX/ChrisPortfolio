import React, { Component } from 'react';
import { MDBIcon, MDBContainer, MDBBtn } from 'mdbreact';

class Footer extends Component {
  render() {
    return (
      <div>
        <MDBContainer style={styles.container}>
          <MDBBtn size="lg" social="fb" color="blue" style={styles.button}>
            <a
              href="https://www.facebook.com/chris.d.3150"
              target="_blank"
              ref="noreferrer noopener"
              style={styles.socialLink}
            >
              <MDBIcon fab icon="facebook-f" className="pr-1" style={styles.icon} /> Facebook
            </a>
          </MDBBtn>
  
          <MDBBtn size="lg" social="ins" className="peach-gradient" style={styles.button}>
            <a
              href="https://www.instagram.com/virtuoso_lume/"
              target="_blank"
              ref="noreferrer noopener"
              style={styles.socialLink}
            >
              <MDBIcon fab icon="instagram" className="pr-1" style={styles.icon} /> Instagram
            </a>
          </MDBBtn>
  
          <MDBBtn size="lg" social="yt" color="red" style={styles.button}>
            <a
              href="https://www.youtube.com/channel/UCj8pYnnOtWp5OKHzVOh0R3A"
              target="_blank"
              ref="noreferrer noopener"
              style={styles.socialLink}
            >
              <MDBIcon fab icon="youtube" className="pr-1" style={styles.icon} /> Youtube
            </a>
          </MDBBtn>
  
          <MDBBtn size="lg" social="email" color="info" style={styles.button}>
            <MDBIcon icon="envelope" className="pr-1" style={styles.icon} /> Email
          </MDBBtn>
        </MDBContainer>
      </div>
    );
  };
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: 50
  },
  button: {
    marginLeft: 15,
    marginRight: 15
  },
  icon: {
    fontSize: '1.5em',
  },
  emailBtn: {
    fontSize: '1.6em'
  },
  socialLink: {
    color: 'white'
  }
};

export default Footer;