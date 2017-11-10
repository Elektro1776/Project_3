import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './project_style.css';
import IssueCard from '../../components/Card/index';
import ReadMe from '../../components/Readme/Readme_Render';
import CodeEditorParent from '../../components/CodeEditor';
import { fetchUserIssues } from '../../actions/githubActions/getIssuesAction';
import { fetchUserReadme } from '../../actions/githubActions/getReadmeAction';
import Matrix from '../../components/Matrix/Matrix';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { createUserIssue } from '../../actions/githubActions/createIssueAction';
import { getRepoBranches } from '../../actions/githubActions/getBranchesAction';

class ProjLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      readme: null,
      repoName: '',
      currentRepoOwner: null,
      issuePullModalShowing: false,
      // branches: null,
    };
  }
  componentDidMount() {
    // console.log('What do we send for read me and issues', this.props.currentRepoOwner, this.props.repoName, this.props.git_token);
    this.props.fetchUserReadme(this.props.currentRepoOwner, this.props.repoName, this.props.git_token);
    this.props.fetchUserIssues(this.props.currentRepoOwner, this.props.repoName, this.props.git_token);
    // this.props.getRepoBranches(this.props.currentRepoOwner, this.props.repoName, this.props.git_token);
  }
  componentWillReceiveProps(nextProps) {
    // console.log('Current layout state in receive props', this.state);
    // console.log('Next Props coming in', nextProps);
    const { userIssues, readme, repoName, git_profile, currentRepoOwner } = nextProps;
    // console.log(' issues received by Layout', userIssues);
    // console.log("helpful console log", currentRepoOwner, this.state.currentRepoOwner, this.state.repoName);
    // console.log('IssueState', this.state.issues.length);
    // console.log('New Props', userIssues.length);
    if (this.props.issues !== userIssues) {
      // console.log('FIRING SET STATE IN LAYOUT?????');
      this.setState({ issues: userIssues });
    }
    if (currentRepoOwner !== null || currentRepoOwner !== this.state.currentRepoOwner) {
      this.setState({ currentRepoOwner });
      // console.log('receive props after set state of current repo owner', this.state.currentRepoOwner);
      if (repoName) {
        if (repoName !== this.state.repoName) {
          // console.log('Going to get new stuff');
          this.props.fetchUserReadme(currentRepoOwner, repoName, this.props.git_token);
          this.props.fetchUserIssues(currentRepoOwner, repoName, this.props.git_token);
          // this.props.getRepoBranches(currentRepoOwner, repoName, this.props.git_token);
        }
      }
    }
    if (readme.length !== 0) {
      // console.log(' IS THIS README CHECK FIRING ?????');
      this.setState({ readme, repoName });
    }
    if (userIssues !== null) {
      this.setState({ issues: userIssues, readme });
    }
  }
  handleRefresh = () => {
    console.log('What we are sending REFRESH', this.state.currentRepoOwner, this.state.repoName, this.props.git_token);
    this.props.fetchUserIssues(this.state.currentRepoOwner, this.state.repoName, this.props.git_token);
  }
  handleCreateIssueData = (title, body, assignees) => {
    // console.log('WHAT ARE WE SENDING TO CREATE', this.state.currentRepoOwner, this.state.repoName, this.props.git_token, title, body, assignees);
    this.props.createUserIssue(this.state.currentRepoOwner, this.state.repoName, this.props.git_token, title, body, assignees);
    this.handleIssuePullClose();
  }
  handleIssuePullClick = () => {

    this.setState({ issuePullModalShowing: true });
  }
  handleIssuePullClose = () => {
    this.setState({ issuePullModalShowing: false });
  }
  whatStateToUse = (screen) => {
    switch (screen) {
      case 'readmeButt':
        return (
          <div>
            <ReadMe
              repoName={this.state.repoName}
              userName={this.state.currentRepoOwner}
              readme={this.state.readme === null ? '' : this.state.readme}
            />
          </div>
        );
      case 'issuesButt':
        return (
          <div>
            <div className={styles.issueButtons}>
              <MuiThemeProvider>
                <Card className={styles.buttonPos} style={{ width: 350 }}>
                  <CardActions>
                    <FlatButton label="New" onClick={this.handleIssuePullClick} />
                  </CardActions>

                </Card>

              </MuiThemeProvider>
              <MuiThemeProvider>
                <Card className={styles.buttonPos} style={{ width: 350, cursor: 'pointer' }} onClick={this.handleRefresh}>
                  <CardActions>
                    <FlatButton label="Refresh" onClick={this.handleRefresh} />
                  </CardActions>

                </Card>

              </MuiThemeProvider>

            </div>
            <div>
              <IssueCard handleCreateIssueData={this.handleCreateIssueData} handleIssuePullClose={this.handleIssuePullClose} issueModalState={this.state.issuePullModalShowing} handleIssuePullClick={this.handleIssuePullClick} issues={this.state.issues} repoName={this.state.repoName} repoOwner={this.state.currentRepoOwner} />
            </div>
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
    // console.log('Here re my branches?????', this.state.branches);
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
  // branches: state.branches.branches ,
}), (dispatch) => ({
  fetchUserIssues: (userId, repoName, token) => dispatch(fetchUserIssues(userId, repoName, token)),
  fetchUserReadme: (userId, repoName, token) => dispatch(fetchUserReadme(userId, repoName, token)),
  getRepoBranches: (userId, repoName, token) => dispatch(getRepoBranches(userId, repoName, token)),
  createUserIssue: (userId, repoName, token, title, body, assignees) => dispatch(createUserIssue(userId, repoName, token, title, body, assignees)),
}))(ProjLayout);
