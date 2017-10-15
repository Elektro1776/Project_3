import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import CardComments from './Card_Comments';
import CardAssignees from './Card_Assignees';
import styles from './issueCards.css';
import Collapsible from 'react-collapsible';
import DropdownTrigger from './Dropdown_Card';

class IssueCard extends Component {
  // fetchIssue() {
  //   //grabs issues for specific repos and passes them in as props
  // }
  // addComment() {
  //   //this will be method that allows user to add a comment
  // }
  // closeIssue() {
  //   //this will close an issue
  // }
  // addMatrix() {
  //   //this will add an issue to matrix
  // }
  render() {
    const assigneeData = this.props.issues.map((issue) => issue.assignees);
    // if (!this.props.issues) {
    //   return (
    //     <img src="./uTile_black_loader_50.gif" alt="loader" />
    //   );
    // }

    return (
      <div className={styles.mainCont}>

        { this.props.issues.map((issue, i) => (
          <div key={issue.id}>
            <Collapsible lazyRender={true} trigger={<DropdownTrigger issueTitle={issue.title} issueNumber={issue.number} />}>
            <Card className={styles.child}>
              <CardTitle
                avatar={issue.user.avatar_url}
                title={issue.user.login}
                subtitle={this.props.repoName}
              />
              <CardTitle
                subtitle={issue.body}
              />
              <CardComments comments={this.props.comments} />
              <h6>Assignees</h6>

              <CardAssignees assigneesData={assigneeData} indexValue={i} />

              <CardActions>
                <Button label="Comment" />
                <Button label="Close Issue" />
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

export default IssueCard;
