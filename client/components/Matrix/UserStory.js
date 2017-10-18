import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './matrix.css';

class UserStory extends Component {
  state = {}
  render() {
    console.log(this.props);
    return (
      <div>
        <input
          type="checkbox"
          value={label}
          checked={isChecked}
          onChange={this.toggleCheckboxChange}
        />
        {this.props.data.title}
        {this.props.data.date}
      </div>
    );
  }
}

UserStory.propTypes = {
  data: PropTypes.object.isRequired,
};

UserStory.defaultProps = {
  data: {
    title: ['Working as expected']
  },
};

export default UserStory;