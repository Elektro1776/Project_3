
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkUserToken } from '../actions/authenticateUserActions';

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

export default connect(null, (dispatch) => (
  {
    loadUserFromToken: () => {
      const token = localStorage.getItem('token');
      if (!token || token === '') {
        console.info(' NO TOKEN FOUND!');
        return null;
      }
      console.info('FOUND A TOKEN!', token);
      dispatch(checkUserToken(token));
    },
  }))(AppContainer);
