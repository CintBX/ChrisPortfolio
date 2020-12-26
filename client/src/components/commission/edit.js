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
import { showCommission, editCommission } from '../../actions/commissionActions';
import { Redirect } from 'react-router-dom';

class EditCommissionForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      title: "",
      description: "",
      price: "",
      redirectToShowPage: false
    };
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.showCommission(id);
    if(this.state.redirectToShowPage) {
      this.setState({
        redirectToShowPage: false
      });
    };
  };

  static propTypes = {
    editCommission: PropTypes.func.isRequired
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();

    const { showCommission } = this.props.commission;
    showCommission.title = this.state.title;
    showCommission.description = this.state.description;
    showCommission.price = this.state.price;

    this.props.editCommission(showCommission);

    this.setState({
      title: "",
      description: "",
      price: "",
      redirectToShowPage: true
    })
  };

  render() {
    const redirectToShowPage = this.state.redirectToShowPage;
    const { _id, title, description, price } = this.props.commission.showCommission;
    return (
      <div>
        { redirectToShowPage ? <Redirect to={`/show-commission/${_id}`} /> : null }
        <Form style={styles.container} autoFocus={false} onSubmit={this.handleSubmit}>
          <h1 style={styles.title}>Edit Commission</h1>
          <FormGroup row>
            <Label for="title" sm={2}>Title</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="title"
                id="title"
                maxLength="22"
                autoFocus
                onChange={this.handleChange}
                value={this.state.title}
                placeholder={title}
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
                onChange={this.handleChange}
                value={this.state.description}
                placeholder={description}
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
                onChange={this.handleChange}
                value={this.state.price}
                placeholder={price}
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
  commission: state.commission
});

export default connect(mapStateToProps, {showCommission, editCommission})(EditCommissionForm);