
/*  eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import axios from 'axios';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EventFeed from '../../components/EventFeed';
import Chat from '../chat';
import ModalGitAuth from '../../components/Modal';
import CodeEditor from '../../components/CodeEditor';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'Fuck yea!!!',
      active: false,
      github_authorized: ""
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  componentDidMount() {
    this.setState({ github_authorized: false })

  }
  handleToggle() {
    this.setState({ active: !this.state.active });
  }
  handleGithubAuth () {
    console.log('send of AUth');
    // axios.get('/authorize')
    //   .then((result) => {
    //     console.info('What is our response', result);
    //     this.setState({ github_authorized: true });
    //   }).catch((err) => {
    //     console.info('Error Huston!', err);
    //   });

  }
  render() {
    return (

      <div
        className="container-fluid"
        style={{ backgroundColor: 'red' }}
      >

        <div className='col-lg-6'>
          <ModalGitAuth authorized={this.state.github_authorized} authorizeMe = {this.handleGithubAuth} />

          <EventFeed />
        </div>
        <div className='col-lg-6'>
          <Chat/>
          <CodeEditor />

      </div>
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
