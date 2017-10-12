
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
    console.log(' CAN I GET THE STORE HERE ?', this.props);
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
      console.log(' CHECKING FOR TOKEN!?');
      const token = localStorage.getItem('jwt_token');
      if (!token || token === '') {
        console.info(' NO TOKEN FOUND!');
        return dispatch(userTokenNotFound());
      }
      console.info('FOUND A TOKEN!', token);
      dispatch(checkUserToken(token));
    },
  }))(AppContainer);
