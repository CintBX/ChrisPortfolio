import React, { Component } from 'react';

class Default extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto text-center text-title text-uppercase pb-5">
            <br />
            <h1 className="display-3">404</h1>
            <h1>error</h1><br />
            <h3>
              Cannot find the requested URL
              (<span className="text-danger">{this.props.location.pathname}</span>)
            </h3>
            <h5>please try again</h5>
          </div>
        </div>
      </div>
    );
  };
};

export default Default;