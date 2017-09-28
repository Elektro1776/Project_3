
import React from 'react';
import { PropTypes } from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import Routes from '../routes/Routes';

const ConnectedContainer = ({ history }) => (
  <ConnectedRouter history={history} >
    <Route render={({ location }) => (<Routes location={location} />)} />
  </ConnectedRouter>
);
ConnectedContainer.propTypes = {
  history: PropTypes.object.isRequired,
};
export default ConnectedContainer;
