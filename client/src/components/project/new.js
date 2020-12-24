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
import { addProject } from '../../actions/projectActions';
import { Redirect } from 'react-router-dom';

class NewProjectForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      title: "",
      description: "",
      url: "",
      redirectToProjects: false
    };
  };
  
  componentDidMount() {
    if(this.state.redirectToProjects) {
      this.setState({
        redirectToProjects: false
      });
    };
  };

  static propTypes = {
    addProject: PropTypes.func.isRequired
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();

    const newProject = {
      title: this.state.title,
      description: this.state.description,
      url: this.state.url
    };

    this.props.addProject(newProject);

    this.setState({
      title: "",
      description: "",
      url: "",
      redirectToProjects: true
    });
  };

  render() {
    const redirectToProjects = this.state.redirectToProjects;
    return (
      <div>
        { redirectToProjects ? <Redirect to="/project-list" /> : null }
        <Form style={styles.container} autoFocus={false} onSubmit={this.handleSubmit}>
          <h1 style={styles.title}>New Big Project?</h1>
          <FormGroup row>
            <Label for="title" sm={2}>What's it called?</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="title"
                id="title"
                autoFocus
                required
                onChange={this.handleChange}
                value={this.state.title}
              />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="description" sm={2}>Talk about it</Label>
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
            <Label for="url" sm={2}>Site URL</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="url"
                id="url"
                required
                onChange={this.handleChange}
                value={this.state.url}
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
  projects: state.project.projects,
  loading: state.project.loading
});

export default connect(mapStateToProps, { addProject })(NewProjectForm);