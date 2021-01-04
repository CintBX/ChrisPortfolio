import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Spinner
} from 'reactstrap';
import { showCommission, deleteCommission } from '../../actions/commissionActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

class CommissionShowPage extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      redirectToCommissions: false
    };
  };

  static propTypes = {
    showCommission: PropTypes.func.isRequired,
    deleteCommission: PropTypes.func,
    commission: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.showCommission(id);
    if(this.state.redirectToCommissions) {
      this.setState({
        redirectToCommissions: false
      });
    };
  };

  handleDelete(id) {
    const result = window.confirm("Delete this commission?");
    if(result) {
      this.props.deleteCommission(id);
      this.setState({
        redirectToCommissions: true
      });
    };
  };

  render() {
    const redirectToCommissions = this.state.redirectToCommissions;
    const { _id, imageData, title, price, description } = this.props.commission.showCommission;
    const { loading } = this.props.commission;
    const { isAuthenticated } = this.props.user;

    if(loading) {
      return <h1 style={styles.loading}><Spinner style={styles.spinner} color="primary" /></h1>
    } else {
      return (
        <div style={styles.container}>
          <Container>
            <Row>
              <Col sm={12} lg={6} xl={6}>
                <img
                  src={`../../${imageData}`}
                  alt="Commission Display"
                  style={styles.image}
                />
              </Col>
              <Col className="show-pg-adjust">
                <h1><span style={styles.softenTone}>Title: </span>{ title }</h1>
                <h3><span style={styles.softenTone}>Sold for: </span>${ price }</h3>
                <h3><span style={styles.softenTone}>About this piece: </span></h3>
                <p>
                  { description }
                </p>
                <br/>
                {
                  isAuthenticated ?
                  <div>
                    <Link to={`/edit-commission/${_id}`}>
                      <Button
                        style={styles.userButton}
                        outline
                        color="warning"
                        className="user-btn"
                      >Edit Details
                        </Button>
                    </Link>
                    <Button
                      style={styles.userButton}
                      outline
                      color="danger"
                      className="user-btn"
                      onClick={() => this.handleDelete(_id)}
                    >Delete this Commission
                    </Button>
                  </div>
                  : null
                }
              </Col>
            </Row>
          </Container>
          { redirectToCommissions ? <Redirect to="/" /> : null }
        </div>
      )
    }
  };
};

const styles = {
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: 50
  },
  spinner: {
    width: '4em',
    height: '4em'
  },
  container: {
    padding: '5%'
  },
  userButton: {
    padding: 20
  },
  softenTone: {
    color: "#A7ACB1"
  },
  image: {
    width: '100%'
  }
};

const mapStateToProps = state => ({
  commission: state.commission,
  user: state.user
});

export default connect(mapStateToProps, { showCommission, deleteCommission })(CommissionShowPage);