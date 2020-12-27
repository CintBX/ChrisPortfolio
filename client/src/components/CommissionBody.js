import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardDeck,
  CardBody,
  CardText,
  Row,
  Col,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import { getCommissions, deleteCommission } from '../actions/commissionActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
    commission: PropTypes.object.isRequired
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
          { pager.pages && pager.pages.length &&
            <Pagination size="lg" style={styles.paginationContainer}>
              <PaginationItem disabled={pager.currentPage === 1 ? true : false}>
                {/* <PaginationLink first href={{ search: `?page=1` }} /> */}
                <PaginationLink first href={`?page=1`} />
              </PaginationItem>
              <PaginationItem disabled={pager.currentPage === 1 ? true : false}>
                <PaginationLink previous href={`?page=${pager.currentPage - 1}`} />
              </PaginationItem>
              {
                pager.pages && pager.pages.map(page => (
                  <PaginationItem key={page} active={pager.currentPage === page ? true : false}>
                    <PaginationLink href={`?page=${page}`}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))
              }
              <PaginationItem disabled={pager.currentPage === pager.totalPages ? true : false}>
                <PaginationLink next href={`?page=${pager.currentPage + 1}`} />
              </PaginationItem>
              <PaginationItem disabled={pager.currentPage === pager.totalPages ? true : false}>
                <PaginationLink last href={`?page=${pager.totalPages}`} />
              </PaginationItem>
            </Pagination>
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
    backgroundColor: 'lightgrey',
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

const mapStateToProps = state => ({
  commission: state.commission
});

export default connect(mapStateToProps, { getCommissions, deleteCommission })(CommissionBody);