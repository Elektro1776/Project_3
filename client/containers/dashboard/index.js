
/*  eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import axios from 'axios';
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
    axios.get('/test')
      .then((result) => {
        console.info('What is our response', result);
        this.setState({ data: result.data.Hello });
      }).catch((err) => {
        console.info('Error Huston!', err);
      });
  }
  render() {
    return (
      <div
        className="container-fluid"
        style={{ backgroundColor: 'red' }}
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
