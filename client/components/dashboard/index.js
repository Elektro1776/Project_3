
/*  eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
// import { connect } from 'react-redux';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className="container-fluid"
        style={{ backgroundColor: 'blue' }}
      >
        <h1>Hello World</h1>
      </div>
    );
  }
}

// function mapStateToProps(state, ownProps) {
//   return {};
// }
//
// function bindActions(dispatch) {
//   return {};
// }
export default Dashboard;
