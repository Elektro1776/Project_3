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

  toggleCheckboxChange = () => {
    console.log(this.state);
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
