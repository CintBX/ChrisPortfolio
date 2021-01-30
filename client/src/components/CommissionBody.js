import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardDeck,
  CardBody,
  CardText,
  Row,
  Col,
  Spinner
} from 'reactstrap';
import { getCommissions } from '../actions/commissionActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CommissionBody extends Component {
  constructor(props) {
    super(props);
    this.loadPage = this.loadPage.bind(this);
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
    console.log(this.props.commission)
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

  render() {
    const { loading } = this.props.commission;
    const { pager, pageOfCommissions } = this.state;
    if(loading) {
      return <h1 style={styles.loading}><Spinner style={styles.spinner} color="primary" /></h1>
    } else {
      return (
        <div>
          <CardDeck style={styles.cardGroup}>
            {
              pageOfCommissions && pageOfCommissions.map(commission => (
                <Row key={ commission._id }>
                  <Col style={styles.cardWrap}>
                    <Card style={styles.card} className="commission-card body-adjust">
                      <Link to={`/show-commission/${commission._id}`}>
                        {
                          commission && commission.imageData.slice(commission.imageData.length - 3) !== "mp4" ?
                          <CardImg
                            top
                            style={styles.image}
                            src={commission.imageData}
                            alt="Commission Image" 
                          />
                          :
                          <video
                            src={commission.imageData}
                            alt="Commission Video"
                            style={styles.video}
                            autoPlay={true}
                            loop
                          />
                        }
                        <CardBody>
                          <CardText style={styles.text}>
                            <span style={styles.title}>{ commission.title }</span>
                            <span style={styles.price}>
                              { commission.price ? "$" + commission.price : null }
                            </span>
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
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: 50
  },
  spinner: {
    width: '4em',
    height: '4em'
  },
  cardGroup: {
    color: 'black',
    justifyContent: 'center'
  },
  cardWrap: {
    padding: 25
  },
  card: {
    width: 250,
    marginTop: 20,
    marginBottom: 20
  },
  image: {
    height: 275,
    width: 250
  },
  video: {
    width: '100%',
  },
  text: {
    color: 'black',
    paddingBottom: 15
  },
  title: {
    float: 'left',
    fontWeight: 600,
  },
  price: {
    float: 'right',
    fontStyle: 'italic',
    fontSize: '1.1em',
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

export default connect(mapStateToProps, { getCommissions })(CommissionBody);