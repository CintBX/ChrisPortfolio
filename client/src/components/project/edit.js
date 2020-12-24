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
import { showProject, editProject } from '../../actions/projectActions';
import { Redirect } from 'react-router-dom';

class EditProjectForm extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      title: "",
      description: "",
      url: "",
      redirectToShowPage: false
    };
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.showProject(id);
    if(this.state.redirectToShowPage) {
      this.setState({
        redirectToShowPage: false
      });
    };
  };

  static propTypes = {
    editProject: PropTypes.func.isRequired
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();

    const { showProject } = this.props.project;
    showProject.title = this.state.title;
    showProject.description = this.state.description;
    showProject.url = this.state.url;

    this.props.editProject(showProject);

    this.setState({
      title: "",
      description: "",
      url: "",
      redirectToShowPage: true
    });
  };

  render() {
    const redirectToShowPage = this.state.redirectToShowPage;
    const { _id, title, description, url } = this.props.project.showProject;
    return (
      <div>
        { redirectToShowPage ? <Redirect to={`/show-project/${_id}`} /> : null }
        <Form style={styles.container} autoFocus={false} onSubmit={this.handleSubmit}>
          <h1 style={styles.title}>Edit Project</h1>
          <FormGroup row>
            <Label for="title" sm={2}>Title</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="title"
                id="title"
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
            <Label for="url" sm={2}>Site URL</Label>
            <Col sm={10}>
              <Input
                type="text"
                name="url"
                id="url"
                onChange={this.handleChange}
                value={this.state.url}
                placeholder={url}
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
  project: state.project
});

export default connect(mapStateToProps, {showProject, editProject})(EditProjectForm);