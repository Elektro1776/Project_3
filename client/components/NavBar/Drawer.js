import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-toolbox/lib/button';
import Drawer from 'react-toolbox/lib/drawer';
import styles from '../NavBar/NavBar.css';
// import repoData from './repodata';
import { fetchUserRepos } from '../../actions/githubActions/getRepoActions';
import { loadCurrentProject } from '../../actions/githubActions/goToProjectAction';

class RepoDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      repos: [],
      currentProject: {},
      currentRepo: '1',
      lastRepoNumber: null,
    };
  }
  componentDidMount() {
    if (this.props.git_profile.login) {
      const { login } = this.props.git_profile;
      this.props.fetchUserRepos(login, this.props.git_token, this.state.currentRepo);
    }
    console.log('SEETTTTTTTTTTTTING LAAAAAASTT NUMMBERRRERER');
    this.setState({ lastRepoNumber: this.props.lastRepoNum });
    // console.log(' WHAT IS OUR LOGIN AND TOKEN ON MOUNT OF DRAWER???', this.props.git_profile, this.props.git_token);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.git_profile.login && (nextProps.git_profile.login !== this.props.git_profile.login)) {
      const { login } = nextProps.git_profile;
      this.props.fetchUserRepos(login, nextProps.git_token, '1');
      this.setState({ currentRepo: '1', lastRepoNumber: this.props.lastRepoNum });
    }
    const { userRepos, currentProject, fetchingRepos } = nextProps;
    if (userRepos.length !== 0 || this.props.userRepos === userRepos) {
      this.setState({ repos: userRepos, currentProject });
    }
  }
  handleToggle = () => {
    this.setState({ active: !this.state.active });
  };
  handleProjectClick = (id) => {
    this.props.loadCurrentProject(id);
    this.handleToggle();
  }
  handleRepoBackClick = () => {
    const pageNumber = this.state.currentRepo === '1' ? this.state.lastRepoNumber : (parseInt(this.state.currentRepo) - 1);
    this.props.fetchUserRepos(this.props.git_profile.login, this.props.git_token, pageNumber);
    this.setState({ currentRepo: pageNumber.toString() });
  }
  handleRepoForwardClick = () => {
    const pageNumber = this.state.currentRepo === this.state.lastRepoNumber ? 1 : (parseInt(this.state.currentRepo) + 1);
    this.props.fetchUserRepos(this.props.git_profile.login, this.props.git_token, pageNumber);
    this.setState({ currentRepo: pageNumber.toString() });
  }
  render() {
    // console.log('current repo number', this.state.currentRepo);
    console.log('last number on Props', this.props.lastRepoNum);
    console.log('lastRepoNumber on State', this.state.lastRepoNumber);
    const { repos } = this.state;
    const backArrow = () => (
      <div>
        <i className="material-icons">arrow_back</i>
      </div>
    );
    const currentUrl = document.URL;
    let specialClass = `${styles.hide}`;
    if (currentUrl.split('/').indexOf('dashboard') === -1) {
      specialClass = `${styles.show}`;
    }
    return (
      <div className={specialClass}>
        <Button className={styles.repoButton} label="Repos" onClick={this.handleToggle} />
        <Drawer active={this.state.active} onOverlayClick={this.handleToggle}>
          <div className={styles.pageButtons} style={{marginTop: '25%'}}>
            <Button
              className={styles.button}
              label="Back"
              raised
              ripple
              primary
              onClick={this.handleRepoBackClick}
            />
            <Button
              className={styles.button}
              label="Forward"
              raised
              ripple
              primary
              onClick={this.handleRepoForwardClick}
            />
          </div>
          {repos.map((repo) => (
            <div key={repo.id}>
              <Button
                className={styles.button}
                label={repo.name}
                raised
                ripple
                primary
                onClick={() => this.handleProjectClick(repo.id)}
              />
            </div>
          ))}
        </Drawer>
      </div>
    );
  }
}

export default connect((state, ownProps) => ({
  userRepos: state.repos.userRepos,
  currentProject: state.repos.currentProject,
  git_profile: state.auth.git_profile,
  git_token: state.auth.github_token,
  fetchingRepos: state.repos,
  lastRepoNum: state.repos.lastRepoNumber,
}), (dispatch) => ({
  fetchUserRepos: (userId, user_token, page) => dispatch(fetchUserRepos(userId, user_token, page)),
  loadCurrentProject: (projectId) => dispatch(loadCurrentProject(projectId)),
}))(RepoDrawer);
