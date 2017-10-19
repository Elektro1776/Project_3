import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-toolbox/lib/button';
import Drawer from 'react-toolbox/lib/drawer';
import styles from '../NavBar/NavBar.css';
// import repoData from './repodata';
import { fetchUserRepos } from '../../actions/githubActions/getRepoActions';
import { loadCurrentProject } from '../../actions/githubActions/goToProjectAction';
import token from '../../../gittoken';

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
    this.props.fetchUserRepos('901david', token);
  }
  componentWillReceiveProps(nextProps) {
    // console.info(' WHAT ARE THE NEXT PROPS,', nextProps.userRepos);
    const { userRepos, currentProject } = nextProps;
    console.log(' WHAT IS USER cuurent proj from drawer', currentProject);
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
    // console.log(' WHAT IS THE CURRENT PROJ', this.state.currentProject);
    return (
      <div>
        <Button className={styles.repoButton} label="Repos" onClick={this.handleToggle} />
        <Drawer active={this.state.active} onOverlayClick={this.handleToggle}>
          {repos.map((repo) => (
            <div key={repo.id}>
              <Button className={styles.button} label={repo.name} raised ripple primary
                 onClick={() =>this.handleProjectClick(repo.id)}  />
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
}), (dispatch) => ({
  fetchUserRepos: (userId, token) => dispatch(fetchUserRepos(userId, token)),
  loadCurrentProject: (projectId) =>dispatch(loadCurrentProject(projectId)),
}))(RepoDrawer);
