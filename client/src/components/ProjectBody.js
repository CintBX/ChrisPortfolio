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
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
                sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, 
                adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et 
                dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum 
                exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi 
                consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse 
                quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas 
                nulla pariatur?"
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
                nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                deserunt mollit anim id est laborum.
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