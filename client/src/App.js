import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Media } from 'reactstrap';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

function App() {
  return (
    <div style={styles.container}>
      <Container fluid>
        <Header />
        <Body />
        <Footer />
      </Container>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'black',
    color: 'white',
    paddingTop: 100,
    paddingLeft: '7%',
    paddingRight: '7%'
  }
};

export default App;
