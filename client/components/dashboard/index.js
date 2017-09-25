
/*  eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
// import { connect } from 'react-redux';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'Fuck yea!!!'
    };
  }
  componentDidMount() {
    fetch('/test').then(response => response.json()).then(result => {
      console.log(' RESULLLTTT', result);
      this.setState({ data: result.Hello })
    })
  }
  render() {
    return (
      <div
        className="container-fluid"
        style={{ backgroundColor: 'blue' }}
      >
        <h1>{this.state.data}</h1>
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
