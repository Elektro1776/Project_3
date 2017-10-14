import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './matrix.css';


class Quadrant extends Component {
  state = {}
  render() {
    return (
      <div className={'quadrant'} >
        {this.props.userStories.map((i) => {
          return (
            <div key={i.key}> {i} </div>
          );
        })}
      </div>
    );
  }
}

Quadrant.propTypes = {
  userStories: PropTypes.array.isRequired,
};

Quadrant.defaultProps = {
  userStories: ['Working as expected'],
};

export default Quadrant;
