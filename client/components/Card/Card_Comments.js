import React, { Component } from 'react';
import { CardText } from 'react-toolbox/lib/card';
import styles from './cardComments.css';
import { convertDate } from '../EventFeed/logical_solutions';

class CardComments extends Component {
  render() {
    return (
      <div>
        { this.props.comments.map((comment, i) => (
          <div key={comment.id}>
            <CardText>
              <h6 className={styles.byWho}>{ `Comment by ${comment.user.login}${convertDate(comment.created_at)}` }</h6>
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
