import React, { Component, Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../actions/userActions';
import PropTypes from 'prop-types';

class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };

  render() {
    return (
      <Fragment>
        <NavLink style={styles.link} onClick={this.props.logout} href="#">
          Logout
        </NavLink>
      </Fragment>
    );
  };
};

const styles = {
  link: {
    marginLeft: 'auto',
    fontSize: '1.2em',
    color: 'teal'
  }
}

export default connect(null, { logout })(Logout);