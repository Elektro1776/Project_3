import React, { Component } from 'react';
import eventData from './EVENT_FEED';
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
    switch (e.type) {
      case 'PushEvent':
        return (
          <div key={e.id}>
            <Card className={styles.card}>
            {`${this.convertDate(e.created_at)} ${e.actor.display_login} pushed a commit to ${e.repo.name} at ${e.payload.ref} with a commit mesage of ${e.payload.commits[0].message}`}
          </Card>
          </div>
        );
        break;
      case 'IssuesEvent':
        return (
          <div key={e.id}>
            <Card className={styles.card}>
            {`${this.convertDate(e.created_at)} ${e.actor.display_login} ${e.payload.action} issue #${e.payload.issue.number} titled ${e.payload.issue.title} on ${e.repo.name}`}
          </Card>
          </div>
        );
        break;
        case 'IssueCommentEvent':
        return (
          <div key={e.id}>
            <Card className={styles.card}>
            {`${this.convertDate(e.created_at)} ${e.actor.display_login} commented on issue #${e.payload.issue.number} titled ${e.payload.issue.title} saying ${e.payload.comment.body} on ${e.repo.name}`}
          </Card>
          </div>
        );
        break;
        case 'CreateEvent':
        return (
          <div>
            <Card className={styles.card}>
          {`${this.convertDate(e.created_at)} ${e.actor.display_login} created a ${e.payload.ref_type} title ${e.repo.name} described as ${e.payload.description}`}
        </Card>
        </div>
        );
        break;
        case 'PullRequestEvent':
        const reviewers = e.payload.pull_request.requested_reviewers === [] ? 'None':e.payload.pull_request.requested_reviewers.map((person)=>{
          `${person.login}`
        });
        const files = e.payload.pull_request.changed_files === 1 ? `${e.payload.pull_request.changed_files} changed file`: `${e.payload.pull_request.changed_files} changed files`;
        return (
          <div key={e.id}>
            <Card className={styles.card}>
          {`${this.convertDate(e.created_at)} ${e.actor.display_login} ${e.payload.action} a pull request (#${e.payload.number}) titled ${e.payload.pull_request.title} in the repository ${e.repo.name} attempting to merge ${e.payload.pull_request.head.ref} with ${e.payload.pull_request.base.ref}.  There are ${e.payload.pull_request.commits} commits with ${e.payload.pull_request.additions} additions, ${e.payload.pull_request.deletions} deletions, and ${files}.  Reviewers requested: ${reviewers}`}
          {/* commits: 3,
          additions: 32,
          deletions: 16,
          changed_files: 1, */}
        </Card>
        </div>
        );
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
          <div>
            {this.handleEvent(event)}
          </div>
        ))}
      </div>
    );
  }
}

export default EventGenerator;
