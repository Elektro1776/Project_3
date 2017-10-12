import React, { Component } from 'react';
import { CardText } from 'react-toolbox/lib/card';
import styles from './cardComments.css';

class CardComments extends Component {
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
    const finalString = ` on ${dateToConvert[0]} ${dateToConvert[1]}-${dateToConvert[2]}-${dateToConvert[3]} at ${convertedTime}`;
    return finalString;
  }
  render() {
    return (
      <div>
        { this.props.comments.map((comment, i) => (
          <div key={comment.id}>
            <CardText>
              <h6 className={styles.byWho}>{ `Comment by ${comment.user.login}${this.convertDate(comment.created_at)}` }</h6>
              <p>{ comment.body }</p>
            </CardText>
          </div>
        ),

        )
        }
      </div>
    );
  }
}

export default CardComments;
