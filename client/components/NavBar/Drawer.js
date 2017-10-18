import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-toolbox/lib/button';
import Drawer from 'react-toolbox/lib/drawer';
import styles from '../NavBar/NavBar.css';
// import repoData from './repodata';
import { fetchUserRepos } from '../../actions/githubActions/getRepoActions';

class RepoDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      repos: [],
    };
  }
  componentDidMount() {
    this.props.fetchUserRepos('901david');
  }
  componentWillReceiveProps(nextProps) {
    console.info(' WHAT ARE THE NEXT PROPS,', nextProps.userRepos);
    const { userRepos } = nextProps;
    console.log(' WHAT IS USER REPOS', userRepos);
    if (userRepos.length !== 0) {
      this.setState({ repos: userRepos });
    }
  }
  handleToggle = () => {
    this.setState({ active: !this.state.active });
  };

  render() {
    const { repos } = this.state;
    console.log(' WHAT IS THE STATE?????', repos);
    return (
      <div>
        <Button className={styles.repoButton} label="Repos" onClick={this.handleToggle} />
        <Drawer active={this.state.active} onOverlayClick={this.handleToggle}>
          {repos.map((repo) => (
            <div key={repo.id}>
              <Button className={styles.button} label={repo.name} raised ripple primary />
            </div>
          ))}
        </Drawer>
      </div>
    );
  }
}

export default connect((state, ownProps) => ({
  userRepos: state.repos.userRepos,
}), (dispatch) => ({
  fetchUserRepos: (userId) => dispatch(fetchUserRepos(userId)),
}))(RepoDrawer);
