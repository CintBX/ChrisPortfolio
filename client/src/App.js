import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css'
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import store from './store';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import CommissionBody from './components/CommissionBody';
import NewCommissionForm from './components/commission/new';
import CommissionShowPage from './components/commission/show';
import EditCommissionForm from './components/commission/edit';
import ProjectBody from './components/ProjectBody';
// import NewProjectForm from './components/project/new';
// import EditProjectForm from './components/project/edit';
import Footer from './components/Footer';
import ContactMe from './components/ContactMe';
import Default from './components/Default';
import { loadUser } from './actions/userActions';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  
  return (
    <Provider store={store}>
      <Container fluid style={styles.container}>
        <Header />
        <Switch>
          {/* <Route path="/edit-project/:id" component={EditProjectForm} /> */}
          {/* <Route path="/new-project" component={NewProjectForm} /> */}
          <Route path="/contact-me" component={ContactMe} />
          <Route path="/project-list" component={ProjectBody} />
          <Route path="/edit-commission/:id" component={EditCommissionForm} />
          <Route path="/show-commission/:id" component={CommissionShowPage} />
          <Route path="/new-commission" component={NewCommissionForm} />
          <Route exact path="/" component={CommissionBody} />
          <Route component={Default} />
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
