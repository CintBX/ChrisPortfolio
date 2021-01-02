import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
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
      return <h1>This commission is loading.  Please wait..</h1>
    } else {
      return (
        <div style={styles.container}>
          { redirectToCommissions ? <Redirect to="/" /> : null }
          <Container>
            <Row>
              <Col>
                <img
                  src={`../../${imageData}`}
                  alt="Commission Display"
                  style={styles.image}
                />
              </Col>
              <Col>
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
                      >Edit
                        </Button>
                    </Link>
                    <Button
                      style={styles.userButton}
                      outline
                      color="danger"
                      onClick={() => this.handleDelete(_id)}
                    >Delete
                    </Button>
                  </div>
                  : null
                }
              </Col>
            </Row>
          </Container>
        </div>
      )
    }
  };
};

const styles = {
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
    height: 415,
    width: 375
  }
};

const mapStateToProps = state => ({
  commission: state.commission,
  user: state.user
});

export default connect(mapStateToProps, { showCommission, deleteCommission })(CommissionShowPage);