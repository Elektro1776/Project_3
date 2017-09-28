
/*  eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'Fuck yea!!!',
    };
  }
  componentDidMount() {
    console.log(' DOES THIS EVER GET FIRED?');
    fetch('/test').then((response) => response.json()).then((result) => {
      console.info('What is our response', result)
      this.setState({ data: result.Hello });
    }).catch((err) => {
      console.error('Error Huston!', err);
    });
    // fetch('/fuckAll').then((response) => response.json()).then((result) => {
    //   this.setState({ data: result.Fuck });
    // }).catch((err) => {
    //   console.error('Error Huston!');
    // });
  }
  render() {
    return (
      <div
        className="container-fluid"
        style={{ backgroundColor: 'blue' }}
      >
        <h1>{this.state.data}</h1>
        <Link to={'/about'}>
         Rendering with React
        </Link>
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
