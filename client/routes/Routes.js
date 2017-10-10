
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import * as RouteMap from './static';
import AppContainer from '../containers/AppContainer';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location },
        }}
        />
      )
    )}
  />
);
class Routes extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { location } = this.props;
    return (
      <AppContainer>
        <div>
          <Route exact location={location} path="/" component={RouteMap.Dashboard} />
          <Route exact location={location} path="/about" component={RouteMap.About} />
          <Route exact location={location} path="/signup" component={RouteMap.Signup} />

        </div>
      </AppContainer>

    );
  }
}


Routes.propTypes = {
  location: PropTypes.object.isRequired,
};
export default Routes;
