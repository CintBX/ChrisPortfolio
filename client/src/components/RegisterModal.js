import React, { Component } from 'react';
import {
  Button,
  Modal, 
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Col,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../actions/userActions';
import { clearErrors } from '../actions/errorActions';

class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      modal: false,
      name: '',
      email: '',
      password: '',
      msg: null
    };
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
		const { error, isAuthenticated } = this.props;
		if(error !== prevProps.error) {
			if(error.id === 'REGISTER_FAIL') {
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
    const { name, email, password } = this.state;
    const newUser = {
      name,
      email,
      password
    };
    this.props.register(newUser);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle} autoFocus={false}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>

          <ModalBody>
            { this.state.msg ? <Alert className="text-center" color="danger">{this.state.msg}</Alert> : null}
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label for="name" sm={2}>Name</Label>
                <Col sm={10}>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    autoFocus
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="email" sm={2}>Email</Label>
                <Col sm={10}>
                  <Input
                    type="email"
                    name="email"
                    id="email"
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
                  <Button color="primary" outline block>Sign Up</Button>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  };
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);