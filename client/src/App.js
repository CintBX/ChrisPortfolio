import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css'
import { Container, Media } from 'reactstrap';
import { Provider } from 'react-redux';
import store from './store';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import CommissionBody from './components/CommissionBody';
import ProjectBody from './components/ProjectBody';
import NewCommissionForm from './components/commission/new';
import CommissionShowPage from './components/commission/show';
import EditCommissionForm from './components/commission/edit';
import Footer from './components/Footer';

function App() {
  return (
    <Provider store={store}>
      <Container fluid style={styles.container}>
        <Header />
        <Switch>
          <Route path="/edit-commission/:id" component={EditCommissionForm} />
          <Route path="/show-commission/:id" component={CommissionShowPage} />
          <Route path="/new-commission" component={NewCommissionForm} />
          <Route path="/project-list" component={ProjectBody} />
          <Route exact path="/" component={CommissionBody} />
        </Switch>
        <Footer />
      </Container>
    </Provider>
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
