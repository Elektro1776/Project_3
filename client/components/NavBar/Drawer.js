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
    };
  }
  componentDidMount() {
    if (this.props.git_profile.login) {
      const { login } = this.props.git_profile;
      this.props.fetchUserRepos(login, this.props.git_token);
    }
    // console.log(' WHAT IS OUR LOGIN AND TOKEN ON MOUNT OF DRAWER???', this.props.git_profile, this.props.git_token);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.git_profile.login && (nextProps.git_profile.login !== this.props.git_profile.login)) {
      const { login } = nextProps.git_profile;
      this.props.fetchUserRepos(login, nextProps.git_token);
    }
    const { userRepos, currentProject, fetchingRepos } = nextProps;
    if (userRepos.length !== 0) {
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
  render() {
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
          <div className={styles.pageButtons}>
            <Button
              className={styles.button}
              label="Back"
              raised
              ripple
              primary
            />
            <Button
              className={styles.button}
              label="Forward"
              raised
              ripple
              primary
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

}), (dispatch) => ({
  fetchUserRepos: (userId, user_token) => dispatch(fetchUserRepos(userId, user_token)),
  loadCurrentProject: (projectId) => dispatch(loadCurrentProject(projectId)),
}))(RepoDrawer);
