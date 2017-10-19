import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './matrix.css';

class UserStory extends Component {
  state = {
    isChecked: false,
  }

  truncateText = (text) => {
    if (text.length > 20) {
      return `${text.substring(0, 20)}...`;
    }
    return text;
  }

  displayStoryDetails = () => {
    // do story stuff here with sidebar
  }

  toggleCheckboxChange = () => {
    const { title, handleCheckBoxChange } = this.props;

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));

    handleCheckBoxChange(title);
  }

  render() {
    const { title, date, key } = this.props;
    const { isChecked } = this.state;
    return (
      <div className={styles.userStory}>
        <div className={styles.regularcheckbox}>
          <input
            className={styles.checkBox}
            id={key}
            onClick={this.toggleCheckboxChange}
            type="checkbox"
            checked={isChecked}
          />
        </div>
        <div className={styles.title} >
          {this.truncateText(title)}
          <div className={styles.date} >
            {date}
          </div>
        </div>

      </div>
    );
  }
}

UserStory.PropTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

UserStory.defaultProps = {
  title: 'No tasks',
  date: '',
};

export default UserStory;
