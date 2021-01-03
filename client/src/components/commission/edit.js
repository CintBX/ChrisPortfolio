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
    // this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      title: "",
      description: "",
      price: "",
      redirectToShowPage: false
    };
  };

  static propTypes = {
    editCommission: PropTypes.func.isRequired,
    commission: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
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

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // handleImageChange(e) {
  //   this.setState({
  //     image: URL.createObjectURL(e.target.files[0])
  //   });
  // };

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
    const { _id, imageData, title, description, price } = this.props.commission.showCommission;
    const { isAuthenticated } = this.props.user;

    if(!isAuthenticated) {
      return (
        <h1 style={styles.accessDenied}>
          You don't have access to this page
        </h1>
      );
    } else {
      return (
        <div>
          <Form style={styles.container} onSubmit={this.handleSubmit}>
            <h1 style={styles.title}>Edit this commission</h1>
            <FormGroup row>
              <Label for="title" style={styles.labelText} sm={2}>Title</Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  maxLength="22"
                  onChange={this.handleChange}
                  value={this.state.title}
                  placeholder={title}
                />
              </Col>
            </FormGroup>
  
            <FormGroup row>
              <Label for="description" style={styles.labelText} sm={2}>Description</Label>
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
              <Label for="price" style={styles.labelText} sm={2}>Price</Label>
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
              <Label for="image" style={styles.labelText} sm={2}>Image</Label>
              <Col sm={10}>
                <img
                  src={`../../${imageData}`}
                  alt="Commission Display"
                  style={styles.imagePreview}
                />
              </Col>
            </FormGroup>
  
            <FormGroup row>
              <Col sm={2}>
              </Col>
              <Col sm={10}>
                <Button outline block color="info" style={styles.submitButton}>Submit</Button>
              </Col>
            </FormGroup>
          </Form>
          { redirectToShowPage ? <Redirect to={`/show-commission/${_id}`} /> : null }
        </div>
      );
    }
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
  },
  accessDenied: {
    textAlign:'center',
    paddingTop:50,
    paddingBottom:50
  },
  imagePreview: {
    marginTop: 15,
    width: 300,
    height: 300
  }
};

const mapStateToProps = state => ({
  commission: state.commission,
  user: state.user
});

export default connect(mapStateToProps, {showCommission, editCommission})(EditCommissionForm);