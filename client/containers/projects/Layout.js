import React, { Component } from 'react';
import styles from './project_style.css';
import IssueCard from '../../components/Card/index';
import issueData from './GET_ALL_ISSUES_REPO_SPECIFIC';
import commentData from './GET_COMMENTS_FOR_SPECIFIC_ISSUE';
import ReadMe from '../../components/Readme/Readme_Render';

class ProjLayout extends Component {
  whatStateToUse(state) {
    if (state.issuesButt === true) {
      return (
        <div>
          <IssueCard issues={issueData} comments={commentData} />
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
    else {
      return (
          <div>
            Houston....We have a problem.
          </div>
      )
    }
  }
  render() {
    return (
      <div className={styles.layout}>
      {this.whatStateToUse(this.props.state)}
      </div>
    );
  }
}

export default ProjLayout;
