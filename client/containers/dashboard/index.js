
/*  eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import EventFeed from '../../components/EventFeed';
import ModalGitAuth from '../../components/Modal';
import { fetchGitProfile } from '../../actions/githubActions/fetchProfile';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: 'Fuck yea!!!',
      active: false,
      github_authorized: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  componentDidMount() {
    if (this.props.gitAuth.githubAuthentication) {
      if (!this.props.gitAuth.git_profile) {
        this.props.fetchGitProfile(this.props.gitAuth.github_token);
      }
      return this.setState({ github_authorized: true });
    }
    this.setState({ github_authorized: false })
  }
  componentWillReceiveProps(nextProps) {
    const { githubAuthentication } = nextProps.gitAuth;
    if (githubAuthentication) {
      this.setState({ github_authorized: true });
    }
  }
  handleToggle() {
    this.setState({ active: !this.state.active });
  }
  handleGithubAuth = () => {
    fetch('/auth/github');
  }
  render() {
    const { github_authorized } = this.state;
    if (!github_authorized) {
      return (
        <div className="col-lg-12">
          <ModalGitAuth
            authorized={this.state.github_authorized}
            authorizeMe={this.handleGithubAuth}
          />
        </div>
      );
    }
    return (

      <div
        className="container-fluid"
        style={{ backgroundColor: 'black' }}
      >

        <div className="col-lg-12">
          <EventFeed />
        </div>
      </div>
    );
  }
}
export default connect((state) => ({
  gitAuth: state.auth,
}), (dispatch) => ({
  fetchGitProfile: (token) => dispatch(fetchGitProfile(token)),
}))(Dashboard);
