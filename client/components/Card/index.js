import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import CardComments from './Card_Comments';
import CardAssignees from './Card_Assignees';


class IssueCard extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    // if(!this.props.issues) {
    //   return (
    //     <img src='./uTile_black_loader_50.gif' alt='loader image' />
    //   );
    // }
    // console.log(' WHAT ARE THE PROPS ON DATA', this.props.issues);
    return (
      <div>
        {this.props.issues.map((issue, i) => {
          return (
            <div>
            <Card
            key={issue.id + i}
            style={{width: '350px'}}
            >
            <CardTitle
                avatar={issue.user.avatar_url}
                title={issue.user.login}
                subtitle={issue.repoName}
            />

            <CardTitle
                title={issue.title + ' #' + issue.number}
                subtitle={issue.body}
            />

            <CardComments comments={this.props.comments} />
            <h6>Assignees</h6>
            <CardAssignees assigneeData={this.props.issues.assignees} />

            <CardActions>
                <Button label="Comment" />
                <Button label="Close Issue" />
                <Button label="Add to Matrix" />
            </CardActions>
            </Card>
          </div>
          );
          }

        )
      }
    </div>

    );
  }
}

export default IssueCard;
