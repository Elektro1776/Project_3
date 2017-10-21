import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import CardComments from './Card_Comments';
import CardAssignees from './Card_Assignees';
import styles from './issueCards.css';
import Collapsible from 'react-collapsible';
import DropdownTrigger from './Dropdown_Card';
// import token from '../../../gittoke';
import { closeUserIssue } from '../../actions/githubActions/closeIssueAction';

class IssueCard extends Component {
  componentDidMount() {
    console.log('ISSUE CARD OFFICIALLY HAS MOUNTED');
  }
  render() {
    console.log(token, 'here is my tokenn');
    const assigneeData = this.props.issues.map((issue) => issue.assignees);
    return (
      <div className={styles.mainCont}>

        { this.props.issues.map((issue, i) => (
          <div key={issue.id}>
            <Collapsible trigger={<DropdownTrigger issueTitle={issue.title} issueNumber={issue.number} />}>
            <Card className={styles.child}>
              <CardTitle
                avatar={issue.user.avatar_url}
                title={issue.user.login}
                subtitle={this.props.repoName}
              />
              <CardTitle
                subtitle={issue.body}
              />
              <CardComments issueNumberToGet={issue.number} />
              <h6>Assignees</h6>

              <CardAssignees assigneesData={assigneeData} indexValue={i} />

              <CardActions>
                <Button label="Comment" />
                <Button
                  label="Close Issue"
                  onClick={() => this.props.closeUserIssue('901david', 'Flashcard-Fun', '35', token)}
                />
                <Button label="Add to Matrix" />
              </CardActions>
            </Card>
          </Collapsible>
          </div>
        ),

        )
        }
      </div>

    );
  }
}

// export default IssueCard;

export default connect((state, ownProps) => ({
  closedIssData: state.issue,
}), (dispatch) => ({
  closeUserIssue: (userId, repoName, issueNum, token) => dispatch(closeUserIssue(userId, repoName, issueNum, token)),
}))(IssueCard);
