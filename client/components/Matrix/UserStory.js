import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './matrix.css';

class UserStory extends Component {
  state = {
    isChecked: false,
  }

  toggleCheck() {
    this.setState({ isChecked: !this.state.isChecked });
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

    if (this.state.isChecked) {
      this.displayStoryDetails();
    }

    handleCheckBoxChange(title);
  }

  render() {
    const { title, date, key } = this.props;
    const { isChecked } = this.state;
    return (
      <div className={styles.userStory}>
        <span className={styles.regularcheckbox}>
          <input
            id={key}
            onClick={this.toggleCheck}
            type="checkbox"
            checked={isChecked}
            onChange={this.toggleCheckboxChange}
          />
          <span />
        </span>
        <span className={styles.title} >
          {this.truncateText(title)}
        </span>
        <span className={styles.date} >
          {date}
        </span>
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
