import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './matrix.css';

class UserStory extends Component {
  state = {}
  render() {
    return (
      
    );
  }
}

UserStory.propTypes = {
  userStory: PropTypes.object.isRequired,
};

UserStory.defaultProps = {
  userStories: { "Default": ['Working as expected'] },
};

export default UserStory;