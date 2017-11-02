import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chip from './Collab_Chip';
import styles from './collab.css';
import { fetchCollaborators } from '../../actions/githubActions/getCollabAction';

const token = 'b38b9935f766385b9d73a1e7fa964120c2bb4d9b';


class Collaborators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collabs: [],
      repoName: '',
      currentUser: '',
    };
  }
  componentDidMount() {
    // console.log('Collabs just mounted', this.props.currentUser, this.props.repoName, this.props.git_token);
    this.props.fetchCollaborators(this.props.currentUser, this.props.repoName, this.props.git_token);
  }
  componentWillReceiveProps(nextProps) {
    // console.info(' WHAT ARE THE NEXT PROPS,', nextProps.userRepos);
    const { collabs, repoName, currentUser } = nextProps;
    // console.log(' WHAT IS USER REPOS', userRepos);
    if (collabs.length !== 0) {
      this.setState({ collabs, repoName, currentUser });
    }
    if (repoName) {
      if (repoName !== this.props.repoName) {
        this.props.fetchCollaborators(currentUser, repoName, this.props.git_token);
      }
    }
  }
  render() {
    // console.log('Here is my collab state', this.state);
    return (
      <div>
        <Chip collabs={this.state.collabs} />
      </div>
    );
  }
}

export default connect((state, ownProps) => ({
  collabs: state.collabs.collabs,
  git_profile: state.auth.git_profile,
  git_token: state.auth.github_token,
}), (dispatch) => ({
  fetchCollaborators: (userId, repoName, token) => dispatch(fetchCollaborators(userId, repoName, token)),
}))(Collaborators);
