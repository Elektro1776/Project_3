import React, { Component } from 'react';
import eventData from './EVENT_FEED3';
import { Card, Button } from 'react-toolbox/lib/card';
import styles from './card_styles.css';
import { convertDate, repoName } from './logical_solutions';

class EventGenerator extends Component {
  state = {
    displayed: 4,
  }

  displayMore = () => {
    this.setState({ displayed: this.state.displayed + 5 });
  }

  handleEvent = (e) => {
    switch (e.type) {
      case 'PushEvent': {
        const branch = e.payload.ref.replace('refs/heads/', '');
        return (
          <div key={e.id}>
            <Card className={styles.card}>
              <p>{`${convertDate(e.created_at)} ${e.actor.display_login} pushed a commit to ${repoName(e.repo.name)} at branch ${branch} with a commit mesage of `} <span className={styles.commentText}>{`${e.payload.commits[0].message}`}</span></p>
            </Card>
          </div>
        );
        break;
      }
      case 'IssuesEvent': {
        const labelCondenser = () => {
          if (e.payload.issue.labels.length === 0) {
            return 'Labels: None';
          }
          let cycles = e.payload.issue.labels.length;
          let index = 0;
          let labelsString = e.payload.issue.labels.length > 1 ? 'Labels: ' : 'Label: ';
          function whatAreOurLabels() {
            if (cycles !== 0) {
              labelsString = `${labelsString}  ${e.payload.issue.labels[index].name}`;
              cycles -= 1;
              index += 1;
              whatAreOurLabels();
            }
          }
          whatAreOurLabels();
          return labelsString;
        };
        const assigneeCondenser = () => {
          if (e.payload.issue.assignees.length === 0) {
            return 'Assignees: None';
          }
          let cycles = e.payload.issue.assignees.length;
          let index = 0;
          let assigneeString = e.payload.issue.assignees.length > 1 ? 'Assignees: ' : 'Assignee: ';
          function whoAreOurAssignees() {
            if (cycles !== 0) {
              assigneeString = `${assigneeString}  ${e.payload.issue.assignees[index].login}`;
              // console.log('assignnee string', assigneeString);
              cycles -= 1;
              index += 1;
              // console.log('cycles', cycles, 'index', index);
              whoAreOurAssignees();
            }
          }
          whoAreOurAssignees();
          return assigneeString;
        };

        const body = !e.payload.issue.body ? '' : ` saying ${e.payload.issue.body}`;
        return (
          <div key={e.id}>
            <Card className={styles.card}>
              <p>{`${convertDate(e.created_at)} ${e.actor.display_login} ${e.payload.action} issue #${e.payload.issue.number} titled `} <span className={styles.commentText}>{`${e.payload.issue.title}${body}`}</span> {`on ${repoName(e.repo.name)}, ${labelCondenser()}, ${assigneeCondenser()}`}</p>
            </Card>
          </div>
        );
        break;
      }
      case 'IssueCommentEvent': {
        return (
          <div key={e.id}>
            <Card className={styles.card}>
              <p>{`${convertDate(e.created_at)} ${e.actor.display_login} commented on issue #${e.payload.issue.number} titled ${e.payload.issue.title} saying `} <span className={styles.commentText}>{`${e.payload.comment.body}`}</span>{` on the repository ${repoName(e.repo.name)}`}</p>
            </Card>
          </div>
        );
        break;
      }
      case 'CreateEvent': {
        if (e.payload.ref === null) {
          return (
            <div key={e.id}>
              <Card className={styles.card}>
                <p>{`${convertDate(e.created_at)} ${e.actor.display_login} created a repository.`}</p>
              </Card>
            </div>
          );
          break;
        }
        if (e.payload.ref === 'master') {
          if (e.payload.description === null) {
            return (
              <div key={e.id}>
                <Card className={styles.card}>
                  <p>{`${convertDate(e.created_at)} ${e.actor.display_login} created a repository titled ${repoName(e.repo.name)}`}</p>
                </Card>
              </div>
            );
            break;
          }

          return (
            <div key={e.id}>
              <Card className={styles.card}>
                <p>{`${convertDate(e.created_at)} ${e.actor.display_login} created a repository titled ${repoName(e.repo.name)} described as `}<span className={styles.commentText}>{`${e.payload.description}`}</span></p>
              </Card>
            </div>
          );
          break;
        }

        return (
          <div key={e.id}>
            <Card className={styles.card}>
              <p>{`${convertDate(e.created_at)} ${e.actor.display_login} created a ${e.payload.ref_type} titled ${e.payload.ref}`}</p>
            </Card>
          </div>
        );

        break;
      }
      case 'PullRequestEvent': {
        const reviewers = () => {
          if (e.payload.pull_request.requested_reviewers.length === 0) {
            return 'None';
          }
          let cycles = e.payload.pull_request.requested_reviewers.length;
          let index = 0;
          let reviewerString = '';
          function whoAreOurReviewers() {
            if (cycles !== 0) {
              reviewerString = `${reviewerString} ${e.payload.pull_request.requested_reviewers[index].login}`;
              cycles -= 1;
              index += 1;
              whoAreOurReviewers();
            }
          }
          whoAreOurReviewers();
          return reviewerString;
        };
        const files = e.payload.pull_request.changed_files === 1 ? `${e.payload.pull_request.changed_files} changed file` : `${e.payload.pull_request.changed_files} changed files`;
        return (
          <div key={e.id}>
            <Card className={styles.card}>
              <p>{`${convertDate(e.created_at)} ${e.actor.display_login} ${e.payload.action} a pull request (#${e.payload.number}) titled ${e.payload.pull_request.title} in the repository ${repoName(e.repo.name)} attempting to merge ${e.payload.pull_request.head.ref} with ${e.payload.pull_request.base.ref}.  There are ${e.payload.pull_request.commits} commits with ${e.payload.pull_request.additions} additions, ${e.payload.pull_request.deletions} deletions, and ${files}.  Reviewers requested: ${reviewers()}`}</p>
            </Card>
          </div>
        );
      }
        break;
      case 'DeleteEvent': {
        return (
          <div key={e.id}>
            <Card className={styles.card}>
              <p>{`${convertDate(e.created_at)} ${e.actor.display_login} deleted a ${e.payload.ref_type} titled ${e.payload.ref}`}</p>
            </Card>
          </div>
        );
        break;
      }
      case 'CommitCommentEvent': {
        return (
          <div key={e.id}>
            <Card className={styles.card}>
              <p>{`${convertDate(e.created_at)} ${e.actor.login} created a commit comment saying `}<span className={styles.commentText}>{`${e.payload.comment.body}`}</span>{` on commit id ${e.payload.comment.commit_id} on the repository named ${repoName(e.repo.name)}`}</p>
            </Card>
          </div>
        );
        break;
      }
      case 'ForkEvent': {
        return (
          <div key={e.id}>
            <Card className={styles.card}>
              <p>{`${convertDate(e.created_at)} ${e.actor.login} forked a repository named ${repoName(e.repo.name)}`}</p>
            </Card>
          </div>
        );
        break;
      }
      case 'WatchEvent': {
        const action = e.payload.action === 'started' ? 'Starred' : 'Unstarred';
        const repoNameVar = repoName(e.repo.name);
        const owner = e.repo.name.replace(`/${repoNameVar}`, '');
        return (
          <div key={e.id}>
            <Card className={styles.card}>
              <p>{`${convertDate(e.created_at)} ${e.actor.login} ${action} a repository named ${repoNameVar} owned by ${owner}`}</p>
            </Card>
          </div>
        );
        break;
      }
      case 'MemberEvent': {
        return (
          <div key={e.id}>
            <Card className={styles.card}>
              <p>{`${convertDate(e.created_at)} ${e.actor.login} ${e.payload.action} ${e.payload.member.login} as a collaborator on the repository ${repoName(e.repo.name)}`}</p>
            </Card>
          </div>
        );
        break;
      }
      default:
        return (
          <div>
            <Card className={styles.card}>
              I am sorry, this event type is not yet supported.
            </Card>
          </div>
        );
    }
  }
  render() {
    return (
      <div>
        <h1 className={styles.headerText}>Your Recent Events:</h1>
        {this.props.eventData.map((event, i) => {
          if (i <= this.state.displayed) {
            return (
              <div key={event.id}>
                {this.handleEvent(event)}
              </div>
            );
          }
        })}
        <div className={`row`}>
          <button className={`${styles.displayMore} btn col-xs-4 col-xs-offset-4`} onClick={this.displayMore}> Click for More </button>
        </div>
      </div>
    );
  }
}

export default EventGenerator;
