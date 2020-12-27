import React, { Component } from 'react';
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCommission } from '../../actions/commissionActions';
import { Redirect } from 'react-router-dom';

class NewCommissionForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      title: "",
      description: "",
      price: "",
      redirectToCommissions: false
    };
  };

  componentDidMount() {
    if(this.state.redirectToCommissions) {
      this.setState({
        redirectToCommissions: false
      });
    };
  };

  static propTypes = {
    addCommission: PropTypes.func.isRequired
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();

    const newCommission = {
      title: this.state.title,
      description: this.state.description,
      price: this.state.price
    };

    this.props.addCommission(newCommission);

    this.setState({
      title: "",
      description: "",
      price: "",
      redirectToCommissions: true
    })
  };

  render() {
    const redirectToCommissions = this.state.redirectToCommissions;
    return (
      <div>
        { redirectToCommissions ? <Redirect to="/" /> : null }
        <Form style={styles.container} autoFocus={false} onSubmit={this.handleSubmit}>
          <h1 style={styles.title}>Upload a new Commission</h1>
          {/* Image later */}
          <FormGroup row>
            <Label for="title" sm={2}>Title</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="title"
                id="title"
                maxLength="22"
                required
                onChange={this.handleChange}
                value={this.state.title}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="description" sm={2}>Description</Label>
            <Col sm={10}>
              <Input
                type="textarea"
                name="description"
                id="description"
                required
                onChange={this.handleChange}
                value={this.state.description}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="price" sm={2}>Price</Label>
            <Col sm={10}>
              <Input
                type="number"
                name="price"
                id="price"
                min={0}
                onChange={this.handleChange}
                value={this.state.price}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col sm={10}>
              <Button outline color="info" style={styles.submitButton}>Submit</Button>
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
    paddingBottom: 50
  },
  submitContainer: {
    paddingTop: 50,
    paddingLeft: 'auto',
    paddingRight: 'auto',
    display: 'flex',
    justifyContent: 'center'
  },
  submitButton: {
    fontSize: '1.2em',
    backgroundColor: 'black',
    color: 'white'
  }
};

const mapStateToProps = state => ({
  commissions: state.commission.commissions,
  loading: state.commission.loading
});

export default connect(mapStateToProps, {addCommission})(NewCommissionForm);