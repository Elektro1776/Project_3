import React, { Component } from 'react';
import eventData from './EVENT_FEED3';
import { Card } from 'react-toolbox/lib/card';
import styles from './card_styles.css';

class EventGenerator extends Component {
  convertDate(date) {
    Date.fromISO = (s) => new Date(s);
    const dateToConvert = Date.fromISO(date).toString().split(' ');
    const convertedTime = convertTime(dateToConvert[4].split(':'));
    function convertTime(time) {
      if (time[0] < 12) {
        return `${time[0]}:${time[1]}:${time[2]} a.m.`;
      }

      const newTime = parseInt(time[0]) - 12;
      return `${newTime}:${time[1]}:${time[2]} p.m.`;
    }
    const finalString = `On ${dateToConvert[0]} ${dateToConvert[1]}-${dateToConvert[2]}-${dateToConvert[3]} at ${convertedTime}`;
    return finalString;
  }
  handleEvent(e) {
    const repoName = ()=> {
      const stringIndex = e.repo.name.indexOf('/');
      return e.repo.name.substr(stringIndex + 1, e.repo.name.length  - 1);

    }
    switch (e.type) {
      case 'PushEvent':
      const branch = e.payload.ref.replace('refs/heads/', '');
        return (
          <div key={e.id}>
            <Card className={styles.card}>
              <p>{`${this.convertDate(e.created_at)} ${e.actor.display_login} pushed a commit to ${repoName()} at branch ${branch} with a commit mesage of `} <span className={styles.commentText}>{`${e.payload.commits[0].message}`}</span></p>
            </Card>
          </div>
        );
        break;
      case 'IssuesEvent':
        return (
          <div key={e.id}>
            <Card className={styles.card}>
              <p>{`${this.convertDate(e.created_at)} ${e.actor.display_login} ${e.payload.action} issue #${e.payload.issue.number} titled `} <span className={styles.commentText}>{`${e.payload.issue.title} on ${repoName()}`}</span></p>
            </Card>
          </div>
        );
        break;
      case 'IssueCommentEvent':
        return (
          <div key={e.id}>
            <Card className={styles.card}>
              <p>{`${this.convertDate(e.created_at)} ${e.actor.display_login} commented on issue #${e.payload.issue.number} titled ${e.payload.issue.title} saying `} <span className={styles.commentText}>{`${e.payload.comment.body}`}</span>{` on ${repoName()}`}</p>
            </Card>
          </div>
        );
        break;
      case 'CreateEvent': {
          if (e.payload.ref === null) {
            return (
              <div key={e.id}>
                <Card className={styles.card}>
                  <p>{`${this.convertDate(e.created_at)} ${e.actor.display_login} created a repository.`}</p>
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
                    <p>{`${this.convertDate(e.created_at)} ${e.actor.display_login} created a repository titled ${repoName()}`}</p>
                  </Card>
                </div>
              );
              break;
            }
            else {
              return (
                <div key={e.id}>
                  <Card className={styles.card}>
                    <p>{`${this.convertDate(e.created_at)} ${e.actor.display_login} created a repository titled ${repoName()} described as `}<span className={styles.commentText}>{`${e.payload.description}`}</span></p>
                  </Card>
                </div>
              );
              break;
            }

        }
        else {
          return (
          <div key={e.id}>
            <Card className={styles.card}>
              <p>{`${this.convertDate(e.created_at)} ${e.actor.display_login} created a ${e.payload.ref_type} titled ${e.payload.ref}`}</p>
            </Card>
          </div>
        );
      }
        break;
        }
      case 'PullRequestEvent': {
        const reviewers = () => {
          if (e.payload.pull_request.requested_reviewers.length === 0) {
            return 'None';
          }
          let cycles = e.payload.pull_request.requested_reviewers.length;
          let index = 0;
          var reviewerString = "";
          function whoAreOurReviewers() {
            if (cycles !== 0) {
              reviewerString += `${reviewerString} ${e.payload.pull_request.requested_reviewers[index].login}`;
              console.info('revieers are', reviewerString);
              cycles -= 1;
              index += 1;
              console.log('WHAT IS THE CYCLE', cycles, 'WHAT IS THE INDEX', index);
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
              <p>{`${this.convertDate(e.created_at)} ${e.actor.display_login} ${e.payload.action} a pull request (#${e.payload.number}) titled ${e.payload.pull_request.title} in the repository ${repoName()} attempting to merge ${e.payload.pull_request.head.ref} with ${e.payload.pull_request.base.ref}.  There are ${e.payload.pull_request.commits} commits with ${e.payload.pull_request.additions} additions, ${e.payload.pull_request.deletions} deletions, and ${files}.  Reviewers requested: ${reviewers()}`}</p>
            </Card>
          </div>
        );
      }
        break;
      default:
        return (
          <div>
            <Card className={styles.card}>
          Unknown Event
            </Card>
          </div>
        );
    }
  }
  render() {
    return (
      <div>
        {eventData.map((event) => (
          <div key={event.id}>
            {this.handleEvent(event)}
          </div>
        ))}
      </div>
    );
  }
}

export default EventGenerator;
