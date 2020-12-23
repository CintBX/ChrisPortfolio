import React, { useEffect } from 'react';
import {
  Card,
  CardImg,
  CardDeck,
  CardBody,
  CardText,
  Row,
  Col
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
// import { getProjects } from '../actions/projectActions';
import PropTypes from 'prop-types';

const ProjectBody = props => {
  // const dispatch = useDispatch();
  // const { projects, loading } = useSelector(
  //   state => ({
  //     projects: state.project.projects,
  //     loading: state.project.loading
  //   })
  // );

  // useEffect(() => {
  //   dispatch(getProjects());
  // }, []);

  // if(loading) {
  //   return <h1>Your projects are loading.  Please wait..</h1>
  // } else {
    return (
      <div style={styles.container}>
        <h1>Projects area</h1>
      </div>
    )
  // }
}

const styles = {
  container: {
    paddingTop: 50
  },
  cardGroup: {
    color: 'black',
    justifyContent: 'center',
    textAlign: 'center'
  },
  card: {
    width: 250,
    marginTop: 20,
    marginBottom: 20
  },
  title: {
    float: 'left',
    fontWeight: 600
  },
  price: {
    float: 'right',
    fontStyle: 'italic',
    fontSize: '1.1em'
  }
}

ProjectBody.propTypes = {
  getCommissions: PropTypes.func.isRequired,
  commission: PropTypes.object.isRequired
}

export default ProjectBody;