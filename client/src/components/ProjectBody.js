import React, { Component } from 'react';
import {
  Jumbotron
} from 'reactstrap';
// import { getProjects, editProject, deleteProject } from '../actions/projectActions';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import InfiniteExodus from '../images/InfiniteExodus.png';
import LifeSkillPoints from '../images/LifeSkillPoints.png';

class ProjectBody extends Component {
  // constructor(props) {
  //   super(props);
  //   this.handleDelete = this.handleDelete.bind(this);
  // };

  // static propTypes = {
  //   getProjects: PropTypes.func.isRequired,
  //   editProject: PropTypes.func,
  //   deleteProject: PropTypes.func,
  //   project: PropTypes.object.isRequired
  // };

  // componentDidMount() {
  //   this.props.getProjects();
  // };

  // handleDelete(id) {
  //   this.props.deleteProject(id);
  // };

  render() {
    // const { loading, projects } = this.props.project;
    // if(loading) {
    //   return <h1>Your projects are loading.  Please wait..</h1>
    // } else {
    //   return code
    // };
      return (
        <div>
          <Jumbotron fluid style={styles.exodusContainer}>
            <a href="https://infiniteexodus.com/" target="_blank" rel="noopener noreferrer">
              <img style={styles.exodus} src={InfiniteExodus} alt="Visit the world of Infinite Exodus" />
            </a>
            <div style={styles.text}>
              <h1>Infinite Exodus</h1>
              <p>
                If you lived in a fantasy world, what would you be like?
                Exodus is a collaborative story and roleplay universe where fantasy and futurism collide.
                In addition to the many stories in the series, creators from around the world can come together
                in a tabletop-like setting to experience Exodus in their own unique way.
              </p>
              <p>
                Exodus has been in development by myself and my brothers for over ten years.
                At the time, I felt both my writing and artistic skills lacked too much to properly publish
                Exodus the way we wanted to. During development however, people kept asking us about the
                project with growing interest because they wanted to have "characters in the story".
                As more and more people inquired, my enthusiasm grew. 
                Overtime, my love for roleplay along with the curse of forever-DMing blended in with our comic
                plans. This led us to evolve Exodus into a universal roleplaying experience
                that not even I could have imagined.
              </p>
            </div>
          </Jumbotron>

          <hr />

          <Jumbotron fluid style={styles.lifeskillpointsContainer}>
            <a href="http://lifeskillpoints.com/" target="_blank" rel="noopener noreferrer">
              <img style={styles.lifeskillpoints} src={LifeSkillPoints} alt="Improve yourself with Life Skill Points" />
            </a>
            <div style={styles.text}>
              <h1>Life Skill Points, LLC.</h1>
              <p>
                Who are you, really? 
                We all go through life with the vague notion of what we want to do, and the things we like, 
                but what is it that makes us... Us?
              </p>
              <p>
                Lifeskillpoints(LSP) is the story of the journey of our lives. 
                No matter what you do, there is someone ahead of you who you can learn from and someone behind 
                who can learn from you. 
                LSP bridges those roads in a way that educates and entertains, breaking our life down into the 
                game that it is.
              </p>
            </div>
          </Jumbotron>
        </div>
      );
  };
};

const styles = {
  exodusContainer: {
    color: "black",
    padding: 10
  },
  exodus: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: 400,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  lifeskillpointsContainer: {
    color: "black"
  },
  lifeskillpoints: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  text: {
    padding: 60,
    textAlign: 'center'
  },
};

// const mapStateToProps = state => ({
//   project: state.project
// });

// export default connect(mapStateToProps, { getProjects, editProject, deleteProject })(ProjectBody);

export default ProjectBody;