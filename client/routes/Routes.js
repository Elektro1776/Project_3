
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import * as RouteMap from './static';
import AppContainer from '../containers/AppContainer';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(' WHAT IS THE RESTTTTT', rest);
  return(
    <Route
      {...rest}
      render={(props) => (
        rest.authorized ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: '/',
            state: { from: props.location },
          }}
          />
        )
      )}
    />
  );
};
class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userIsAuthorized: false,
      userNotFound: true,
      loadingUser: true,
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(' WHAT HAPPENS HERE ?', nextProps);
    const { isAuthenticated, loadingUser } = nextProps.auth;
    if (isAuthenticated !== this.props.auth.isAuthenticated) {
      this.setState({ userIsAuthorized: nextProps.auth.isAuthenticated, userNotFound: false });
    } else if (!nextProps.auth.isAuthenticated && !loadingUser) {
      this.setState({ userNotFound: true, loadingUser: false })
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  render() {
    const { location } = this.props;
    const { userIsAuthorized, userNotFound, loadingUser } = this.state;
    console.log(' WHAT IS THE STATE?', this.props);
    if (userNotFound && loadingUser) {
      return (
        <AppContainer>
          <div>Loading Blast Canon.....</div>
        </AppContainer>
      );
    }
    return (
      <AppContainer>
        <div>

          <Route exact location={location} path="/" component={RouteMap.Signup} />
          {/* <Route exact location={location} path="/login" component={RouteMap.Login} /> */}
          <PrivateRoute exact path="/dashboard" component={RouteMap.Dashboard} authorized={userIsAuthorized} />
          {/* <PrivateRoute path="/projects" component={RouteMap.Projects} authorized={userIsAuthorized} /> */}
          {/* <PrivateRoute path="/settings" component={RouteMap.Settings} authorized={userIsAuthorized} /> */}
          <PrivateRoute exact path="/about" component={RouteMap.About} authorized={userIsAuthorized} />
          {/* <Route exact location={location} path="/about" component={RouteMap.About} /> */}
        </div>
      </AppContainer>

    );
  }
}


Routes.propTypes = {
  location: PropTypes.object.isRequired,
};
export default connect(
  (state) => ({
    auth: state.auth,
  }), null)(Routes);
