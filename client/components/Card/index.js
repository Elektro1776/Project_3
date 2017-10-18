import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import CardComments from './Card_Comments';
import CardAssignees from './Card_Assignees';
import styles from './issueCards.css';
import Collapsible from 'react-collapsible';
import DropdownTrigger from './Dropdown_Card';
import token from '../../../token';

class IssueCard extends Component {
  componentDidMount() {
    console.log('ISSUE CARD OFFICIALLY HAS MOUNTED');
  }
  handleCloseIssue = () => {
    fetch('api/github/closeIssue', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ id: '901david', repoName: 'Flashcard-Fun', issueNum: '35', token }),
      // body: JSON.stringify({ id: issue.user.login, repoName: this.props.repoName, issueNum: issue.number, token }),
    })
      .then(() => {
        console.log('Close completed');
      })
      .catch((err) => {
        // console.info(' WHAT IS OUR ERR RESPONSE', err.response);
      });
  };
  render() {
    console.log(token, 'here is my tokenn');
    const assigneeData = this.props.issues.map((issue) => issue.assignees);
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
              <CardComments issueNumberToGet={issue.number} />
              <h6>Assignees</h6>

              <CardAssignees assigneesData={assigneeData} indexValue={i} />

              <CardActions>
                <Button label="Comment" />
                <Button label="Close Issue" onClick={this.handleCloseIssue.bind(this)} />
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
