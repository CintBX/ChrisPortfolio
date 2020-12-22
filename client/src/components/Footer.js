import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutubeSquare
} from 'react-icons/fa';
import { MDBIcon, MDBContainer, MDBBtn } from 'mdbreact';

const Footer = () => {
  return (
    <div>
      <MDBContainer style={styles.container}>
        <MDBBtn size="lg" social="fb" color="blue" style={styles.button}>
          <MDBIcon fab icon="facebook-f" className="pr-1" style={styles.icon} /> Facebook
        </MDBBtn>
        <MDBBtn size="lg" social="ins" className="peach-gradient" style={styles.button}>
          <MDBIcon fab icon="instagram" className="pr-1" style={styles.icon} /> Instagram
        </MDBBtn>
        <MDBBtn size="lg" social="yt" color="red" style={styles.button}>
          <MDBIcon fab icon="youtube" className="pr-1" style={styles.icon} /> Youtube
        </MDBBtn>
        <MDBBtn size="lg" social="email" color="info" style={styles.button}>
          <MDBIcon icon="envelope" className="pr-1" style={styles.icon} /> Email
        </MDBBtn>
      </MDBContainer>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: 40
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
  }
}

export default Footer;