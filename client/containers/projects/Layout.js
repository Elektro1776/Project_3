import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './project_style.css';
import IssueCard from '../../components/Card/index';
import ReadMe from '../../components/Readme/Readme_Render';
import CodeEditorParent from '../../components/CodeEditor';
import { fetchUserIssues } from '../../actions/githubActions/getIssuesAction';
import { fetchUserReadme } from '../../actions/githubActions/getReadmeAction';
import Matrix from '../../components/Matrix/Matrix';
import token from '../../../gittoken';

class ProjLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      readme: [],
      repoName: '',
      currentUser: '',
    };
  }
  componentDidMount() {
    // console.log('WHEN DOES THIS FUKCER MUNT-STATE', this.state);
    this.props.fetchUserReadme(this.props.currentUser, this.props.repoName, token);
    this.props.fetchUserIssues(this.props.currentUser, this.props.repoName, token);
  }
  componentWillReceiveProps(nextProps) {
    const { userIssues, readme, repoName, currentUser } = nextProps;
    // console.info(' WHAT ARE THE NEXT PROPS,', repoName);
    console.log('Do we ever get a read me ???????:::::', readme);
    // console.log(' WHAT IS USER REPOS', userRepos);
    if (userIssues.length !== 0 && userIssues.length !== this.props.userIssues.length) {
      // console.log(' RE SET STATE:::::', userIssues.length);
      // this.setState({ issues: userIssues });
        this.setState({ issues: userIssues });
    }
    if (readme.length !== 0) {
      this.setState({ readme, repoName, currentUser });
    }
    if (repoName) {
      if (repoName !== this.props.repoName) {
        console.log(' FIRING FETCH README!!!!!!::::::::::');
        this.props.fetchUserReadme(currentUser, repoName, token);
        this.props.fetchUserIssues(currentUser, repoName, token);
      }
    }
  }
  whatStateToUse = (state) => {
    if (state.issuesButt === true) {
      return (
        <div>
          <IssueCard issues={this.state.issues} />
        </div>
      );
    } else if (state.readmeButt === true) {
      return (
        <div>
          <ReadMe repoName={this.state.repoName} userName={this.state.currentUser} readme={this.state.readme} />
        </div>
      );
    } else if (state.matrixButt === true) {
      return (
        <div>
          <Matrix />
        </div>
      );
    } else if (state.codeButt === true) {
      return (
        <div>
          <CodeEditorParent />
        </div>
      );
    }

    return (
      <div>
            Houston....We have a problem.
      </div>
    );
  }
  render() {
    // console.log('what is my state of my layout', this.state);
    return (
      <div className={styles.layout}>
        {this.whatStateToUse(this.props.state)}
      </div>
    );
  }
}


export default connect((state, ownProps) => ({
  userIssues: state.issues.repoIssues,
  readme: state.readme.readme,
}), (dispatch) => ({
  fetchUserIssues: (userId, repoName, token) => dispatch(fetchUserIssues(userId, repoName, token)),
  fetchUserReadme: (userId, repoName, token) =>  dispatch(fetchUserReadme(userId, repoName, token)),
}))(ProjLayout);
