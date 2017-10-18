import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './matrix.css';

class UserStory extends Component {
  state = {
    isChecked: false,
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
    const { title, date } = this.props;
    const { isChecked } = this.state;
    return (
      <div className={styles.userStory}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={isChecked}
          onChange={this.toggleCheckboxChange}
        />
        <span className={styles.title} >
          {title}
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
  handleCheckboxChange: PropTypes.func.isRequired,
};

UserStory.defaultProps = {
  title: 'No tasks',
  date: '',
};

export default UserStory;
