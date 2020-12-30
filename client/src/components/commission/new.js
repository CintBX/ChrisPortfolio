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
import axios from 'axios';
import e from 'cors';

class NewCommissionForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setDefaultImage = this.setDefaultImage.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.state = {
      title: "",
      description: "",
      price: "",
      image: "https://via.placeholder.com/250",
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
    addCommission: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    
    this.uploadImage(e, "multer");

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

  setDefaultImage(uploadType) {
    if(uploadType === "multer") {
      this.setState({
        image: "https://via.placeholder.com/250"
      });
    };
  };

  uploadImage(e, method) {
    let imageFormObj;
    if(method === "multer") {
      imageFormObj = new FormData();
      imageFormObj.append("imageName", "multer-image-" + Date.now());
      imageFormObj.append("imageData", e.target.files[0]);
    };

    this.setState({
      image: URL.createObjectURL(e.target.files[0])
    });

    axios
      .post("/images/uploadmulter", imageFormObj)
      .then(data => {
        if(data.data.success) {
          alert("Image has been uploaded using multer");
          this.setDefaultImage("multer");
        };
      })
      .catch(err => {
        alert(`Error uploading image with multer: ${err}`);
        this.setDefaultImage("multer");
      });
  };

  render() {
    const redirectToCommissions = this.state.redirectToCommissions;
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
          { redirectToCommissions ? <Redirect to="/" /> : null }
          <Form style={styles.container} autoFocus={false} onSubmit={this.handleSubmit}>
            <h1 style={styles.title}>Upload a new Commission</h1>
            
            <FormGroup row>
              <Label for="title" sm={2}>Title</Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  maxLength="22"
                  autoFocus
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
              <Label for="image" sm={2}>Image</Label>
              <Col sm={10}>
                <Input
                  type="file"
                  name="image"
                  id="image"
                  required
                  onChange={e => this.uploadImage(e, "multer")}
                />
                <img
                  src={this.state.image}
                  alt="upload-image"
                  style={{marginTop:15}}
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
    }
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
  },
  accessDenied: {
    textAlign:'center',
    paddingTop:50,
    paddingBottom:50
  }
};

const mapStateToProps = state => ({
  commissions: state.commission.commissions,
  loading: state.commission.loading,
  user: state.user
});

export default connect(mapStateToProps, {addCommission})(NewCommissionForm);