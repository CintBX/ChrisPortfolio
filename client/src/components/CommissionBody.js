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
import { getCommissions, deleteCommission } from '../actions/commissionActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CommissionBody extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  };

  static propTypes = {
    getCommissions: PropTypes.func.isRequired,
    deleteCommission: PropTypes.func,
    commission: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getCommissions();
  };

  handleDelete(id) {
    this.props.deleteCommission(id);
  };

  render() {
    const { loading, commissions } = this.props.commission;
    if(loading) {
      return <h1 style={styles.container}>Your commissions are loading.  Please wait..</h1>
    } else {
      return (
        <div>
          <CardDeck style={styles.cardGroup}>
            {
              commissions && commissions.map(commission => (
                <Row>
                  <Col>
                    <Card style={styles.card} key={ commission._id }>
                      <Button
                        style={styles.deleteButton}
                        close
                        onClick={() => this.handleDelete(commission._id)}
                      />
                      <Link to={`/show-commission/${commission._id}`}>
                        <CardImg top width="100%" src="https://via.placeholder.com/250" alt="Card img" />
                        <CardBody>
                          <CardText>
                            <span style={styles.title}>{ commission.title }</span>
                            <span style={styles.price}>${ commission.price }</span>
                          </CardText>
                        </CardBody>
                      </Link>
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
  price: {
    float: 'right',
    fontStyle: 'italic',
    fontSize: '1.1em'
  },
  deleteButton: {
    paddingLeft: '93%',
    color: 'red'
  }
};

const mapStateToProps = state => ({
  commission: state.commission
});

export default connect(mapStateToProps, { getCommissions, deleteCommission })(CommissionBody);