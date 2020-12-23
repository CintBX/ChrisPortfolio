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
import { getCommissions } from '../actions/commissionActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CommissionBody = props => {
  const dispatch = useDispatch();
  const { commissions, loading } = useSelector(
    state => ({
      commissions: state.commission.commissions,
      loading: state.commission.loading
    })
  );

  useEffect(() => {
    dispatch(getCommissions());
  }, []);

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
                  <Link to={`/show-commission/${commission._id}`}>
                    <Card style={styles.card} key={ commission._id }>
                      <CardImg top width="100%" src="https://via.placeholder.com/250" alt="Card img" />
                      <CardBody>
                        <CardText>
                          <span style={styles.title}>{ commission.title }</span>
                          <span style={styles.price}>${ commission.price }</span>
                        </CardText>
                      </CardBody>
                    </Card>
                  </Link>
                </Col>
              </Row>
            ))
          }
        </CardDeck>
      </div>
    )
  }
}

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
  }
}

// CommissionBody.propTypes = {
//   getCommissions: PropTypes.func.isRequired,
//   commission: PropTypes.object.isRequired
// }

export default CommissionBody;


/* If you decide to use Class Components just in case
  class Body extends React.Component {
    constructor(props) {
      super(props);
    };

    componentDidMount() {
      this.props.getCommissions();
    };

    render() {
      const { commissions } = this.props.commission;
      return (
        <div style={styles.container}>
        <div style={styles.buttonGroup}>
          <span style={styles.button}>
            <Button color="primary" size="lg">Commissions</Button>
          </span>
          <span style={styles.button}>
            <Button color="primary" size="lg">Projects</Button>
          </span>
        </div>

          <CardDeck style={styles.cardGroup}>
            {
              commissions ? commissions.map(commission => (
                <Row>
                  <Col>
                    <Card style={styles.card} key={ commission.id }>
                      <CardImg top width="100%" src="https://via.placeholder.com/250" alt="Card img" />
                      <CardBody>
                        <CardText>
                          <span style={styles.title}>{ commission.title }</span>
                          <span style={styles.price}>{ commission.price }</span>
                        </CardText>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              )) : null
            }
          </CardDeck>
      </div>
      )
    }
  }

  // const mapStateToProps = state => ({
  //   commissions: state.commission.commissions
  // })

  // export default connect(mapStateToProps, {getCommissions})(Body);
*/