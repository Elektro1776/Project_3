import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './matrix.css';


class Quadrants extends Component {
  state = {}
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.q1} >
          <div className={styles.banner1}>
            {'Important & Urgent'}
          </div>
          {this.props.userStories.q1.map((i) => {
            return (
              <div key={i.key}> {i.title} 11</div>
            );
          })}
        </div>
        <div className={styles.q2} >
          <div className={styles.banner2}>
            {'Important & Not Urgent'}
          </div>
          {this.props.userStories.q2.map((i) => {
            return (
              <div key={i.key}> {i.title} 11</div>
            );
          })}
        </div>
        <div className={styles.q3} >
          <div className={styles.banner3}>
            {'Not Important & Urgent'}
          </div>
          {this.props.userStories.q3.map((i) => {
            return (
              <div key={i.key}> {i.title} 11</div>
            );
          })}
        </div>
        <div className={styles.q4} >
          <div className={styles.banner4}>
            {'Not Important & Not Urgent'}
          </div>
          {this.props.userStories.q4.map((i) => {
            return (
              <div key={i.key}> {i.title} 11</div>
            );
          })}
        </div>
      </div>

    );
  }
}

Quadrants.propTypes = {
  userStories: PropTypes.array.isRequired,
};

Quadrants.defaultProps = {
  userStories: {
    q1: [{
      title: 'Testing here',
      date: 'June 07',
      checked: false,
      comments: [],
      key: '11',
    }],
    q2: [
      {
        title: 'Testing here more',
        date: 'August 07',
        checked: false,
        comments: [],
        key: '22',
      },
      {
        title: 'Testing here very much',
        date: 'December 07',
        checked: false,
        comments: ['Comments'],
        key: '33',
      },
      {
        title: 'Testing here tons',
        date: 'June 07',
        checked: true,
        comments: [],
        key: '44',
      },
    ],
    q3: [],
    q4: [],
  },
};

export default Quadrants;
