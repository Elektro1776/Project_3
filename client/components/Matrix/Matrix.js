import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Quadrants from './Quadrants';
import styles from './matrix.css';

class Matrix extends Component {
  state = {}
  render() {
    return (
      <div>
        <Quadrants />
      </div>
    );
  }
}

Matrix.propTypes = {
  userStories: PropTypes.array.isRequired,
};

Matrix.defaultProps = {
  userStories: ['You have no tasks'],
};

export default Matrix;
