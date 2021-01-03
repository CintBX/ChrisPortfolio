import React, { Component } from 'react';
import emailjs from 'emailjs-com';
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap';

class ContactMe extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
    this.state = {
      from_name: "",
      from_email: "",
      message: "",
      submitted: false
    };
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        process.env.REACT_APP_SERVICE_ID,
        process.env.REACT_APP_TEMPLATE_ID,
        e.target,
        process.env.REACT_APP_USER_ID
      )
      .then(res => {
        console.log(res.text);
      }, err => {
        console.log(err.text);
      });

    this.setState({
      from_name: "",
      from_email: "",
      message: "",
      submitted: true
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
            <Label for="from_name" style={styles.labelText} sm={2}>Your Name</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="from_name"
                onChange={this.handleChange}
                value={this.state.from_name}
                autoFocus
                required
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="from_email" style={styles.labelText} sm={2}>Your Email</Label>
            <Col sm={10}>
              <Input
                type="email"
                name="from_email"
                onChange={this.handleChange}
                value={this.state.from_email}
                required
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="message" style={styles.labelText} sm={2}>Your Message</Label>
            <Col sm={10}>
              <Input
                type="textarea"
                name="message"
                onChange={this.handleChange}
                value={this.state.message}
                required
              />
            </Col>
          </FormGroup>

          <FormGroup row style={styles.submitContainer}>
            <Col sm={10}>
              {
                !this.state.submitted ? 
                <Input
                  type="submit"
                  value="Email Me"
                  style={styles.submitButton}
                /> :
                <Alert color="success" style={styles.alert}>
                  Thanks for your message! I'll reply ASAP
                </Alert>
              }
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
  labelText: {
    fontWeight: 'bold',
    textShadow: '2px 2px 4px black'
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
  },
  alert: {
    textAlign: 'center',
    fontSize: '1.2em'
  }
};

export default ContactMe;