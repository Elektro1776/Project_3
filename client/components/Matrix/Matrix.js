import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Quadrant from './Quadrant.js';
import styles from './matrix.css';

class Matrix extends Component {
  state = {}
  render() {
    return (
      <div className={"container"}>
        {this.props.userStories}
        <Quadrant title={'Important & Urgent'} />
        {/* {<Quadrant title={'Important & Not Urgent'} />
        <Quadrant title={'Not Important & Urgent'} />
        <Quadrant title={'Not Important & Not Urgent'} />} */}
      </div>
    );
  }
}

Matrix.propTypes = {
  userStories: PropTypes.array.isRequired,
};

Matrix.defaultProps = {
  userStories: ['Working as expected'],
};

export default Matrix;
