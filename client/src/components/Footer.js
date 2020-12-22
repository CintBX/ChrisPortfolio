import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutubeSquare
} from 'react-icons/fa';
import { MDBIcon, MDBContainer, MDBBtn } from 'mdbreact';

const Footer = () => {
  return (
    <MDBContainer style={styles.container}>
      <MDBBtn size="lg" social="fb" color="blue" style={styles.button}>
        <MDBIcon fab icon="facebook-f" style={styles.icon} />
      </MDBBtn>
      <MDBBtn size="lg" social="ins" className="peach-gradient" style={styles.button}>
        <MDBIcon fab icon="instagram" style={styles.icon} />
      </MDBBtn>
      <MDBBtn size="lg" social="yt" color="red" style={styles.button}>
        <MDBIcon fab icon="youtube" style={styles.icon} />
      </MDBBtn>
    </MDBContainer>
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
  emailBtn: {}
}

export default Footer;