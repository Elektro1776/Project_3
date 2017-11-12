import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserStory from './UserStory';
import styles from './matrix.css';


class Quadrants extends Component {
  state = {}

  toggleCheckbox = (title) => {
    // console.log(title);
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.q1} >
          <div className={styles.banner1}>
            {'Important & Urgent'}
          </div>
          <div className={styles.quadrant}>
            {this.props.userStories.q1.map((i) => {
              return (
                <div key={i.title}>
                  <UserStory
                    title={i.title}
                    date={i.date}
                    comments={i.comments}
                    handleCheckBoxChange={this.toggleCheckbox}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.q2} >
          <div className={styles.banner2}>
            {'Important & Not Urgent'}
          </div>
          <div className={styles.quadrant}>
            {this.props.userStories.q2.map((i) => {
              return (
                <div key={i.title}>
                  <UserStory
                    title={i.title}
                    date={i.date}
                    comments={i.comments}
                    handleCheckBoxChange={this.toggleCheckbox}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.q3} >
          <div className={styles.banner3}>
            {'Not Important & Urgent'}
          </div>
          <div className={styles.quadrant}>
            {this.props.userStories.q3.map((i) => {
              return (
                <div key={i.title}>
                  <UserStory
                    title={i.title}
                    date={i.date}
                    comments={i.comments}
                    handleCheckBoxChange={this.toggleCheckbox}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.q4} >
          <div className={styles.banner4}>
            {'Not Important & Not Urgent'}
          </div>
          <div className={styles.quadrant}>
            {this.props.userStories.q4.map((i) => {
              return (
                <div key={i.title}>
                  <UserStory
                    title={i.title}
                    date={i.date}
                    comments={i.comments}
                    handleCheckBoxChange={this.toggleCheckbox}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

    );
  }
}

Quadrants.propTypes = {
  userStories: PropTypes.object.isRequired,
};

Quadrants.defaultProps = {
  userStories: {
    q1: [{
      title: 'Testing here1',
      date: 'June 07',
      comments: [],
      key: '1',
    }],
    q2: [
      {
        title: 'Testing here m3ore',
        date: 'August 07',
        comments: [],
        key: '2',
      },
      {
        title: 'Testing he4re very much',
        date: 'December 07',
        comments: ['Comments'],
        key: '3',
      },
      {
        title: 'Testi5ng here tons',
        date: 'June 07',
        comments: [],
        key: '4',
      },
      {
        title: 'Tes11ting here more',
        date: 'August 07',
        comments: [],
        key: '5',
      },
      {
        title: 'Test123ing he very much',
        date: 'December 07',
        comments: ['Comments'],
        key: '6',
      },
      {
        title: 'Testing 123here tons',
        date: 'June 07',
        comments: [],
        key: '7',
      },
      {
        title: 'Testing h4ere more',
        date: 'August 07',
        comments: [],
        key: '8',
      },
      {
        title: 'Testing 4here more',
        date: 'August 07',
        comments: [],
        key: '9',
      },
      {
        title: 'Testing 111here more',
        date: 'August 07',
        comments: [],
        key: '10',
      },
    ],
    q3: [],
    q4: [],
  },
};

export default Quadrants;
