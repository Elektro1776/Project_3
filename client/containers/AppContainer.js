
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkUserToken, userTokenNotFound } from '../actions/authenticateUserActions';

class AppContainer extends Component {
  // constructor(props) {
  //   super(props);
  // }
  static propTypes = {
    children: PropTypes.element.isRequired,
  }
  componentDidMount() {
    this.props.loadUserFromToken();
  }
  render() {
    return (
      <div style={{backgroundColor: "black", height: '100%'}}>
        {this.props.children}
      </div>
    );
  }
}
AppContainer.propTypes = {
  loadUserFromToken: PropTypes.func.isRequired,
};

const ConnectedAppContainer = connect(null, (dispatch) => (
  {
    loadUserFromToken: () => {
      const token = localStorage.getItem('jwt_token');
      const access_token = localStorage.getItem('access_token');
      if (!token || token === '') {
        return dispatch(userTokenNotFound());
      }
      dispatch(checkUserToken({ token, access_token }));
    },
  }))(AppContainer);
export default ConnectedAppContainer;
