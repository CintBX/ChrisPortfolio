import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardDeck,
  CardBody,
  CardText,
  Row,
  Col,
  Button
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
      return <h1 style={styles.container}>Your projects are loading.  Please wait..</h1>
    } else {
      return (
        <div>
          <CardDeck style={styles.cardGroup}>
            {
              projects && projects.map(project => (
                <Row>
                  <Col>
                    <Card style={styles.card} key={ project._id }>
                      <Button
                        style={styles.deleteButton}
                        close
                        onClick={() => this.handleDelete(project._id)}
                      />
                      {/* <Link to={ project.url }> */}
                        <CardImg top width="100%" src="https://via.placeholder.com/250" alt="Card img" />
                        <CardBody>
                          <Link to={`/edit-project/${project._id}`}>
                            <Button style={styles.editButton} close>?</Button>
                          </Link>
                          <CardText>
                            <span style={styles.title}>{ project.title }</span>
                          </CardText>
                        </CardBody>
                      {/* </Link> */}
                    </Card>
                  </Col>
                </Row>
              ))
            }
          </CardDeck>
        </div>
      );
    };
  };
};

const styles = {
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
  editButton: {
    color: "green",
    borderBottom: "1px"
  },
  deleteButton: {
    // paddingLeft: '93%',
    color: 'red'
  }
};

const mapStateToProps = state => ({
  project: state.project
});

export default connect(mapStateToProps, { getProjects, editProject, deleteProject })(ProjectBody);