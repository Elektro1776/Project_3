import React, { Component } from 'react';
import styles from './project_style.css';
import IssueCard from '../../components/Card/index';
import issueData from './GET_ALL_ISSUES_REPO_SPECIFIC';
import commentData from './GET_COMMENTS_FOR_SPECIFIC_ISSUE';
import ReadMe from '../../components/Readme/Readme_Render';
<<<<<<< HEAD
import Matrix from '../../components/Matrix/Matrix';

=======
import CodeEditorParent from '../../components/CodeEditor';
>>>>>>> 84096232a28b9108989ed099c1b877d9e88bea29

class ProjLayout extends Component {
  whatStateToUse = (state) => {
    if (state.issuesButt === true) {
      return (
        <div>
          <IssueCard issues={issueData} comments={commentData} />
        </div>
      );
    } else if (state.readmeButt === true) {
      return (
        <div>
          <ReadMe />
        </div>
      );
    } else if (state.matrixButt === true) {
      return (
        <div>
          <Matrix />
        </div>
      );
<<<<<<< HEAD
    } else {
=======
    }
    else if (state.codeButt === true) {
      return (
        <div>
          <CodeEditorParent />
        </div>
      );
    }
    else {
>>>>>>> 84096232a28b9108989ed099c1b877d9e88bea29
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
        {this.whatStateToUse(this.props.state)}
      </div>
    );
  }
}

export default ProjLayout;
