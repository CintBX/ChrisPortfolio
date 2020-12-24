import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showCommission } from '../../actions/commissionActions';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

// IDEA
// Make this whole thing a modal.  It'll display The IMAGE (if it's larger) and description

// IDEA
// Don't make it a modal.  Add styling based on viewport size (for the image especially)
// Largest size, image 450
// Smallest 325

// Also note you need to fix the bottom links when screen shrinks

const CommissionShowPage = props => {
  const dispatch = useDispatch();
  const { commission, loading } = useSelector(
    state => ({
      commission: state.commission.showCommission,
      loading: state.commission.loading
    })
  );

  useEffect(() => {
    const id = props.match.params.id;
    dispatch(showCommission(id));
  }, []);

  if(loading) {
    return <h1>This commission is loading.  Please wait..</h1>
  } else {
    return (
      <div style={styles.container}>
        <Container>
          <Row>
            <Col lg={5} xl={5}>
              <img
                src={ commission.image ? commission.image : "https://via.placeholder.com/325" }
                alt="Commission Display"
              />
            </Col>
            <Col lg={7} xl={7}>
              <h1><span style={styles.softenTone}>Title: </span>{ commission.title }</h1>
              <h3><span style={styles.softenTone}>Sold for: </span>${ commission.price }</h3>
              <h3><span style={styles.softenTone}>About this piece: </span></h3>
              <p>
                { commission.description }
              </p>
              <br/>
              <Link to={`/edit-commission/${commission._id}`}>
                <Button style={styles.editButton} outline color="warning">Edit</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
};

const styles = {
  container: {
    paddingLeft: '15%',
    paddingRight: '10%',
    color: "white",
  },
  editButton: {
    padding: 20
  },
  softenTone: {
    color: "lightgrey"
  }
}

export default CommissionShowPage;