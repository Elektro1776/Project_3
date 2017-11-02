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
import FlatButton from 'material-ui/FlatButton';

class ProjLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      readme: null,
      repoName: '',
      currentRepoOwner: null,
    };
  }
  componentDidMount() {
    // console.log('What do we send for read me and issues', this.props.currentRepoOwner, this.props.repoName, this.props.git_token);
    this.props.fetchUserReadme(this.props.currentRepoOwner, this.props.repoName, this.props.git_token);
    this.props.fetchUserIssues(this.props.currentRepoOwner, this.props.repoName, this.props.git_token);
  }
  componentWillReceiveProps(nextProps) {
    // console.log('Current layout state in receive props', this.state);
    // console.log('Next Props coming in', nextProps);
    const { userIssues, readme, repoName, git_profile, currentRepoOwner } = nextProps;
    // console.log(' issues received by Layout', userIssues);
    // console.log("helpful console log", currentRepoOwner, this.state.currentRepoOwner, this.state.repoName);
    // console.log('IssueState', this.state.issues);
    // console.log('New Props', userIssues);
    if (this.state.issues === userIssues) {
      this.setState({ issues: userIssues });
    }
    if(currentRepoOwner !== null || currentRepoOwner !== this.state.currentRepoOwner) {
      this.setState({ currentRepoOwner: currentRepoOwner });
      // console.log('receive props after set state of current repo owner', this.state.currentRepoOwner);
      if (repoName) {
        if (repoName !== this.state.repoName) {
          // console.log('Going to get new stuff');
          this.props.fetchUserReadme(currentRepoOwner, repoName, this.props.git_token);
          this.props.fetchUserIssues(currentRepoOwner, repoName, this.props.git_token);
        }
      }
    }
    if (readme.length !== 0) {
      // console.log(' IS THIS README CHECK FIRING ?????');
      this.setState({ readme, repoName });
    }
    // if (repoName) {
    //   if (repoName !== this.props.repoName) {
    //     // console.log(' FIRING FETCH README!!!!!!::::::::::', this.state.currentRepoOwner, repoName, this.props.git_token);
    //     console.log('IF reponame is true', this.state.currentRepoOwner);
    //     this.props.fetchUserReadme(this.state.currentRepoOwner, repoName, this.props.git_token);
    //     this.props.fetchUserIssues(this.state.currentRepoOwner, repoName, this.props.git_token);
    //   }
    // }
    if (readme !== null) {
      // console.log(' WE SHOULD BE SETTING THE READ ME');
      // this.setState({ readme });
    }
    if (userIssues !== null) {
      // console.log(' WHAT IS OUR READ ME ?????', readme);
      this.setState({ issues: userIssues, readme });
    }
  }
  handleRefresh = () => {
    // console.log('WHAT WE SENDING FOR NEW ISSUES', this.state.currentRepoOwner, this.state.repoName, this.props.git_token);
    this.props.fetchUserIssues(this.state.currentRepoOwner, this.state.repoName, this.props.git_token);
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
            <div>
              <MuiThemeProvider>
              <FlatButton label='New' />
            </MuiThemeProvider>
            <i className="material-icons pull-right" style={{cursor: 'pointer'}} onClick={this.handleRefresh}>refresh</i>
            </div>
            <div>
            <IssueCard issues={this.state.issues} repoName={this.state.repoName} repoOwner={this.state.currentRepoOwner} />
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
    // console.log(this.state.issues, "current issues from state in LAYOUT");
    // console.log('readme', this.state.readme);/
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
