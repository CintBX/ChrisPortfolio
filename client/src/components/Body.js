import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardDeck,
  CardSubtitle,
  CardBody,
  CardText,
  Container,
  Row,
  Col
} from 'reactstrap';

const Body = () => {
  const [commissions, setCommissions] = useState(
    [
      { id: uuidv4(), title: "Artwork1", price: "$75"},
      { id: uuidv4(), title: "Artwork2", price: "$125"},
      { id: uuidv4(), title: "Artwork3", price: "$100"},
      { id: uuidv4(), title: "Artwork4", price: "$50"},
      { id: uuidv4(), title: "Artwork5", price: "$45"},
      { id: uuidv4(), title: "Artwork6", price: "$155"},
      { id: uuidv4(), title: "Artwork7", price: "$85"},
      { id: uuidv4(), title: "Artwork8", price: "$250"},
      { id: uuidv4(), title: "Artwork9", price: "$99"},
      { id: uuidv4(), title: "Artwork10", price: "$105"},
      { id: uuidv4(), title: "Artwork11", price: "$25"},
      { id: uuidv4(), title: "Artwork12", price: "$180"}
    ]
  );

  return (
    <div style={styles.container}>
      <div style={styles.buttonGroup}>
        <span style={styles.button}>
          <Button size="lg">Commissions</Button>
        </span>
        <span style={styles.button}>
          <Button size="lg">Projects</Button>
        </span>
      </div>

        <CardDeck style={styles.cardGroup}>
          {
            commissions.map(commission => (
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
            ))
          }
        </CardDeck>
    </div>
  )
}

const styles = {
  container: {
    paddingTop: 50
  },
  buttonGroup: {
    paddingBottom: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    paddingLeft: 20,
    paddingRight: 20
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

export default Body;