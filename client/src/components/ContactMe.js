import React, { Component } from 'react';
import emailjs from 'emailjs-com';
// import './ContactUs.css';
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

class ContactMe extends Component {
  constructor(props) {
    super(props);
    this.sendEmail = this.sendEmail.bind(this);
  };

  sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm('SERVICE_ID', 'TEMPLATE_ID', e.target, 'USER_ID')
      .then(res => {
        console.log(res.text);
      }, err => {
        console.log(err.text);
      });
  };

  render() {
    return (
      <div style={styles.container}>
        <Form autoFocus={false} onSubmit={this.sendEmail}>
          <div style={styles.title}>
            <h1>Like my work?</h1>
            <h2>Fill out this form to reach me!</h2>
          </div>

          <FormGroup row>
            <Label for="from_name" sm={2}>Your Name</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="from_name"
                autoFocus
                required
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="from_email" sm={2}>Your Email</Label>
            <Col sm={10}>
              <Input
                type="email"
                name="from_email"
                required
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="message" sm={2}>Your Message</Label>
            <Col sm={10}>
              <Input
                type="textarea"
                name="message"
                required
              />
            </Col>
          </FormGroup>

          <FormGroup row style={styles.submitContainer}>
            <Col sm={10}>
              <Input
                type="submit"
                value="Email Me"
                style={styles.submitButton}
              />
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  };
};

const styles = {
  container: {
    paddingLeft: '5%',
    paddingRight: '5%'
  },
  title: {
    paddingBottom: 50,
    textAlign: 'center'
  },
  submitContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: '20%',
    paddingRight: '20%',
  },
  submitButton: {
    fontSize: '1.3em',
    fontWeight: 'bold',
    backgroundColor: 'darkgrey',
    color: 'green'
  }
};

export default ContactMe;