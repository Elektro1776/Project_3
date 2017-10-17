import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './project_style.css';
import IssueCard from '../../components/Card/index';
import commentData from './GET_COMMENTS_FOR_SPECIFIC_ISSUE';
import ReadMe from '../../components/Readme/Readme_Render';
import CodeEditorParent from '../../components/CodeEditor';
import { fetchUserIssues } from '../../actions/githubActions/getIssuesAction';

class ProjLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
    }

  }
  componentDidMount() {
    this.props.fetchUserIssues('901david', 'Flashcard-Fun');
  }
  componentWillReceiveProps(nextProps) {
    // console.info(' WHAT ARE THE NEXT PROPS,', nextProps.userRepos);
    const { userIssues } = nextProps;
    // console.log(' WHAT IS USER REPOS', userRepos);
    if (userIssues.length !== 0) {
      this.setState({ issues: userIssues });
    }
  }
  whatStateToUse(state) {
    if (state.issuesButt === true) {
      return (
        <div>
          <IssueCard issues={this.state.issues} comments={commentData} />
        </div>
      )
    }
    else if (state.readmeButt === true) {
      return (
        <div>
        <ReadMe />
      </div>
      );
    }
    else if (state.matrixButt === true) {
      return (
        <div>
          Our Matrix
        </div>
      );
    }
    else if (state.codeButt === true) {
      return (
        <div>
          <CodeEditorParent />
        </div>
      );
    }
    else {
      return (
          <div>
            Houston....We have a problem.
          </div>
      )
    }
  }
  render() {
    // console.log('what is my state', this.state);
    return (
      <div className={styles.layout}>
      {this.whatStateToUse(this.props.state)}
      </div>
    );
  }
}

export default connect((state, ownProps) => ({
  userIssues: state.issues.repoIssues,
}), (dispatch) => ({
  fetchUserIssues: (userId, repoName) => dispatch(fetchUserIssues(userId, repoName)),
}))(ProjLayout);
