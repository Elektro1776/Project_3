import React, { Component } from 'react';
import IssueCard from '../../components/Card/index.js';
import issueData from './GET_ALL_ISSUES_REPO_SPECIFIC';
import commentData from './GET_COMMENTS_FOR_SPECIFIC_ISSUE';


class Projects extends Component {
  render() {
    return (
      <div>
        <IssueCard issues={issueData} repoName="Project_3" comments={commentData} />
      </div>
    );
  }
}

// function mapStateToProps (state) {
//  issueData:
// }

// export default connect(mapStateToProps, { fetchIssues })(Projects);


export default Projects;
