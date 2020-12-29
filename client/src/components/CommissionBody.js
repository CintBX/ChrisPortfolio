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
import { Link, StaticRouter } from 'react-router-dom';

class CommissionBody extends Component {
  constructor(props) {
    super(props);
    this.loadPage = this.loadPage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.state = {
      pager: {},
      pageOfCommissions: []
    };
  };

  static propTypes = {
    getCommissions: PropTypes.func.isRequired,
    deleteCommission: PropTypes.func,
    commission: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getCommissions();
    this.loadPage();
  };

  componentDidUpdate() {
    this.loadPage();
  };

  loadPage() {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page')) || 1;
    if(page !== this.state.pager.currentPage) {
      fetch(`/commissions?page=${page}`, { method: 'GET' })
        .then(res => res.json())
        .then(({ pager, pageOfCommissions }) => {
          this.setState({ pager, pageOfCommissions });
        })
        .catch(err => console.log(`CommissionBody.loadPage() err: ${err}`));
    };
  };

  handleDelete(id) {
    this.props.deleteCommission(id);
  };

  render() {
    const { loading } = this.props.commission;
    const { isAuthenticated } = this.props.user;
    const { pager, pageOfCommissions } = this.state;
    if(loading) {
      return <h1 style={styles.container}>Your commissions are loading.  Please wait..</h1>
    } else {
      return (
        <div>
          <CardDeck style={styles.cardGroup}>
            {
              pageOfCommissions && pageOfCommissions.map(commission => (
                <Row>
                  <Col>
                    <Card style={styles.card} key={ commission._id }>
                      {
                        isAuthenticated ?
                        <Button
                          style={styles.deleteButton}
                          close
                          onClick={() => this.handleDelete(commission._id)}
                        /> : null
                      }
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
          { pager.pages && pager.pages.length &&
            <ul className="pagination" style={styles.paginationContainer}>
              <li className={`page-item first-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                <Link
                  to={{ search: `?page=1` }}
                  className="page-link"
                  style={styles.paginationLink}
                >
                  &#x022D8;
                </Link>
              </li>
              <li className={`page-item previous-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                <Link
                  to={{ search: `?page=${pager.currentPage - 1}` }}
                  className="page-link"
                  style={styles.paginationLink}
                >
                  &#x0003C;
                </Link>
              </li>

              {
                pager.pages.map(page => (
                  <li key={page} className={`page-item number-item ${pager.currentPage === page ? 'active' : ''}`}>
                    <Link
                      to={{ search: `?page=${page}` }}
                      className="page-link"
                      style={styles.paginationLink}
                    >
                      {page}
                    </Link>
                  </li>
                ))
              }

              <li className={`page-item next-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                <Link
                  to={{ search: `?page=${pager.currentPage + 1}` }}
                  className="page-link"
                  style={styles.paginationLink}
                >
                  &#x0003E;
                </Link>
              </li>
              <li className={`page-item last-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                <Link
                  to={{ search: `?page=${pager.totalPages}` }}
                  className="page-link"
                  style={styles.paginationLink}
                >
                  &#x022D9;
                </Link>
              </li>
            </ul>
          }
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
  },
  paginationContainer: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  paginationLink: {
    color: 'lightgrey',
    fontSize: '1.1em'
  }
};

const mapStateToProps = state => ({
  commission: state.commission,
  user: state.user
});

export default connect(mapStateToProps, { getCommissions, deleteCommission })(CommissionBody);