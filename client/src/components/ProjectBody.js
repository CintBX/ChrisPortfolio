import React, { Component } from 'react';
import {
  Jumbotron
} from 'reactstrap';
import { getProjects, editProject, deleteProject } from '../actions/projectActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ProjectBody extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  };

  static propTypes = {
    getProjects: PropTypes.func.isRequired,
    editProject: PropTypes.func,
    deleteProject: PropTypes.func,
    project: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getProjects();
  };

  handleDelete(id) {
    this.props.deleteProject(id);
  };

  render() {
    const { loading, projects } = this.props.project;
    if(loading) {
      return <h1>Your projects are loading.  Please wait..</h1>
    } else {
      return (
        <div>
            {
              projects && projects.map(project => (
                <div style={styles.container}>
                <Jumbotron style={styles.container}>
                  <Link to={ project.url }>
                    <img style={styles.image} src={ project.image ? project.image : "https://via.placeholder.com/400"} alt="project" />
                    <br />
                    <h1>{ project.title }</h1>
                    <p>{ project.description }</p>
                  </Link>
                </Jumbotron>
                </div>
              ))
            }
        </div>
      );
    };
  };
};

const styles = {
  container: {
    // padding: 50,
    backgroundColor: 'blue'
  },
  image: {
    display: 'flex',
    justifyContent: 'center',
    width: '80%',
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}

const mapStateToProps = state => ({
  project: state.project
});

export default connect(mapStateToProps, { getProjects, editProject, deleteProject })(ProjectBody);