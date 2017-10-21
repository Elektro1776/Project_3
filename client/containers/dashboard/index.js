
/*  eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import axios from 'axios';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EventFeed from '../../components/EventFeed';
import ModalGitAuth from '../../components/Modal';

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
  handleGithubAuth = () => {
    console.log('send of AUth');
    fetch('/auth/github')
      .then((response) => response.json())
      .then((data) => {
        console.log(' ARE WE GETTING A RESPONSE?', data);
        const { url } = JSON.parse(data);
        console.log(' WHAT IS OUR URL?', typeof url);
        window.location.assign(url);
        console.log(' WHAT IS THE WINDOW LOCATION?', window.location);

      })
      .catch((err) => {
        console.info("We have an errr huston on github", err);
      })
  }
  render() {
    return (

      <div
        className="container-fluid"
        style={{ backgroundColor: 'black' }}
      >

        <div className='col-lg-12'>
          <ModalGitAuth
            authorized={this.state.github_authorized}
            authorizeMe={this.handleGithubAuth} />
          <EventFeed />
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
