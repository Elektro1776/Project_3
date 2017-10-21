import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './project_style.css';
import IssueCard from '../../components/Card/index';
import ReadMe from '../../components/Readme/Readme_Render';
import CodeEditorParent from '../../components/CodeEditor';
import { fetchUserIssues } from '../../actions/githubActions/getIssuesAction';
import { fetchUserReadme } from '../../actions/githubActions/getReadmeAction';
import Matrix from '../../components/Matrix/Matrix';

class ProjLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      readme: null,
      repoName: '',
      currentUser: '',
    };
  }
  componentDidMount() {
    // console.log('WHEN DOES THIS FUKCER MUNT-STATE', this.props.git_profile, this.props.git_token);
    this.props.fetchUserReadme(this.props.git_profile.login, this.props.repoName, this.props.git_token);
    this.props.fetchUserIssues(this.props.git_profile.login, this.props.repoName, this.props.git_token);
  }
  componentWillReceiveProps(nextProps) {
    const { userIssues, readme, repoName, git_profile } = nextProps;
    console.log(' WHAT ARE THE NEXT PROPS/??', git_profile);
    // this.setState({ issues: userIssues });
    if (readme.length !== 0) {
      // console.log(' IS THIS README CHECK FIRING ?????');
      this.setState({ readme, repoName, currentUser: git_profile.login });
    }
    if (repoName) {
      if (repoName !== this.props.repoName) {
        console.log(' FIRING FETCH README!!!!!!::::::::::');
        this.props.fetchUserReadme(git_profile.login, repoName, this.props.git_token);
        this.props.fetchUserIssues(git_profile.login, repoName, this.props.git_token);
      }
    }
    if (readme !== null) {
      // console.log(' WE SHOULD BE SETTING THE READ ME');
      // this.setState({ readme });
    }
    if (userIssues !== null) {
      // console.log(' WHAT IS OUR READ ME ?????', readme);
      this.setState({ issues: userIssues, readme });
    }
  }
  whatStateToUse = (screen) => {
    switch (screen) {
      case 'readmeButt':
        return (
          <div>
            <ReadMe
              repoName={this.state.repoName}
              userName={this.state.currentUser}
              readme={this.state.readme === null ? '' : this.state.readme}
            />
          </div>
        );
      case 'issuesButt':
        return (
          <div>
            <IssueCard issues={this.state.issues} repoName={this.state.repoName} repoOwner={this.props.git_profile.login} />
          </div>
        );
      case 'matrixButt':
        return (
          <div>
            <Matrix />
          </div>
        );
      case 'codeButt':
        return (
          <div>
            <CodeEditorParent />
          </div>
        );
      default:
        return (
          <div>
              Houston....We have a problem.
          </div>
        );
    }
  }
  render() {
    return (
      <div className={styles.layout}>
        {this.whatStateToUse(this.props.currentScreen)}
      </div>
    );
  }
}


export default connect((state, ownProps) => ({
  userIssues: state.issues.repoIssues,
  readme: state.readme.readme,
  git_profile: state.auth.git_profile,
  git_token: state.auth.github_token,
}), (dispatch) => ({
  fetchUserIssues: (userId, repoName, token) => dispatch(fetchUserIssues(userId, repoName, token)),
  fetchUserReadme: (userId, repoName, token) => dispatch(fetchUserReadme(userId, repoName, token)),
}))(ProjLayout);
