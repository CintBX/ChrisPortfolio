import React, { Component } from 'react';
import {
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Spinner
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCommission } from '../../actions/commissionActions';
import ImagePreview from '../../images/ImagePreview.png';

class NewCommissionForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      title: "",
      description: "",
      price: "",
      image: ImagePreview,
      uploadType: "",
      redirectToCommissions: false
    };
  };

  static propTypes = {
    addCommission: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };
  
  componentDidMount() {
    if(this.state.redirectToCommissions) {
      this.setState({
        redirectToCommissions: false
      });
    };
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleImageChange(e) {
    const filename = e.target.files[0].name;
    this.setState({
      image: URL.createObjectURL(e.target.files[0]),
      uploadType: filename.slice(filename.length - 3)
    });
  };

  handleSubmit(e) {
    e.preventDefault();

    let imageFormObj = {};
    imageFormObj = new FormData();
    imageFormObj.append("imageName", "multer-image-" + Date.now());
    imageFormObj.append("imageData", e.target.elements.image.files[0]);
    imageFormObj.append("title", this.state.title);
    imageFormObj.append("description", this.state.description);
    imageFormObj.append("price", this.state.price);
    this.props.addCommission(imageFormObj);

    this.setState({
      title: "",
      description: "",
      price: "",
      image: ImagePreview,
      uploadType: "",
      redirectToCommissions: true
    });

    const history = this.props.history;
    setTimeout(function() {
      history.push("/");
    }, 500);
  };

  render() {
    const redirectToCommissions = this.state.redirectToCommissions;
    const { isAuthenticated } = this.props.user;

    if(redirectToCommissions) {
      return (
        <h1 style={styles.loading}>
          <Spinner style={styles.spinner} color="primary" />
        </h1>
      );
    };
    if(!isAuthenticated) {
      return (
        <h1 style={styles.accessDenied}>
          You don't have access to this page
        </h1>
      );
    } else {
      return (
        <div>
          <Form style={styles.container} autoFocus={false} onSubmit={this.handleSubmit}>
            <h1 style={styles.title}>Upload a new Commission</h1>
            
            <FormGroup row>
              <Label for="title" style={styles.labelText} sm={2}>Title</Label>
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
              <Label for="description" style={styles.labelText} sm={2}>Description</Label>
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
              <Label for="price" style={styles.labelText} sm={2}>Price (optional)</Label>
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
              <Label for="image" style={styles.labelText} sm={2}>Image</Label>
              <Col sm={10}>
                <Input
                  type="file"
                  name="image"
                  id="image"
                  required
                  onChange={e => this.handleImageChange(e)}
                />
                {
                  this.state.uploadType === "mp4" ?
                  <video
                    src={this.state.image}
                    alt="Commission Preview"
                    style={styles.imagePreview}
                    autoPlay={true}
                    loop
                  />
                  :
                  <img
                    src={this.state.image}
                    alt="Commission Preview"
                    style={styles.imagePreview}
                  />
                }
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
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: 50
  },
  spinner: {
    width: '4em',
    height: '4em'
  }
};

const mapStateToProps = state => ({
  commissions: state.commission.commissions,
  loading: state.commission.loading,
  user: state.user
});

export default connect(mapStateToProps, { addCommission })(NewCommissionForm);