import React, { Component } from 'react';
import {
  Button,
  Modal, 
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  NavLink,
  Col,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/userActions';
import { clearErrors } from '../actions/errorActions';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      modal: false,
      email: '',
      password: '',
      msg: null
    };
  };
  
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if(error !== prevProps.error) {
      if(error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      };
    };

    if(this.state.modal) {
      if(isAuthenticated) {
	      this.toggle();
      };
    };
  };

  toggle() {
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password      
    };
    this.props.login(user);
  };

  render() {
    return (
      <div style={styles.linkContainer}>
        <NavLink style={styles.link} onClick={this.toggle} href="#">
          Login
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle} autoFocus={false}>
          <ModalHeader toggle={this.toggle}>Welcome Chris</ModalHeader>

          <ModalBody>
            { this.state.msg ? <Alert className="text-center" color="danger">{ this.state.msg }</Alert> : null }
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label for="email" sm={2}>Email</Label>
                <Col sm={10}>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    autoFocus
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="password" sm={2}>Password</Label>
                <Col sm={10}>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col sm={10}>
                  <Button color="primary" outline block>Login</Button>
                </Col>
              </FormGroup>

              <FormText>
                Not Chris? Continue as a guest
              </FormText>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  };
};

const styles = {
  linkContainer: {
    marginLeft: 'auto',
    fontSize: '1.2em'
  },
  link: {
    color: 'teal'
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);