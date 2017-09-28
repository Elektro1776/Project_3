
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AppContainer extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default AppContainer;
