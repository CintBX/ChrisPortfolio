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
    emailjs.sendForm('blank', 'blank', e.target, 'blank')
      .then(res => {
        console.log(res.text);
      }, err => {
        console.log(err.text);
      });
  };

  render() {
    return (
      <div>
        <Form autoFocus={false} onSubmit={this.sendEmail}>
          <h1>Contact me</h1>
          <FormGroup row>
            <Label for="user_name" sm={2}>Enter your name</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="user_name"
                autoFocus
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="user_email" sm={2}>Include your email</Label>
            <Col sm={10}>
              <Input
                type="email"
                name="user_email"
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="message" sm={2}>Write message</Label>
            <Col sm={10}>
              <Input
                type="textarea"
                name="message"
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col sm={10}>
              <Input
                type="submit"
                value="Send"
              />
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  };
};

export default ContactMe;