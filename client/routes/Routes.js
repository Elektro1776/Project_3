
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, Switch } from 'react-router-dom';
import * as RouteMap from './static';
import AppContainer from '../containers/AppContainer';
import { connect } from 'react-redux';
import styles from '../containers/AppContainer.css';
import PrivateNavBar from '../components/NavBar';
import PrivateFooter from '../components/Footer/Footer';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { Dashboard } = RouteMap;
  const { path, exact, authorized } = { ...rest };
  console.log(' IS THIS FIRNG?', {...rest});
  return (
    <Route
      exact
      path={path}
      render={(props) => (
        authorized ? (
          <div>
            <PrivateNavBar />
            <Component {...props} />
            <PrivateFooter />
          </div>
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
const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => (
        <div>
          {/* <NavBar /> */}
          <Component {...props} />
          {/* <Footer /> */}
        </div>
      )}
    />
  );
};
PrivateRoute.propTypes = {
  // component: PropTypes.object.isRequired,
  // location: PropTypes.object.isRequired,
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
    const { isAuthenticated, loadingUser } = nextProps.auth;
    if (isAuthenticated !== this.props.auth.isAuthenticated) {
      this.setState({ userIsAuthorized: nextProps.auth.isAuthenticated, userNotFound: false });
    } else if (!nextProps.auth.isAuthenticated && !loadingUser) {
      this.setState({ userNotFound: true, loadingUser: false });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  render() {
    const { location } = this.props;
    const { userIsAuthorized, userNotFound, loadingUser } = this.state;
    if (userNotFound && loadingUser) {
      return (
        <AppContainer>
          <div className={styles.loadingWrapper}>
            <div className={styles.loadingText}>Loading Blast Canon.....</div>
            <img className={styles.loadingImage} src="/dist/utile.png" alt="uTile" />
          </div>
        </AppContainer>
      );
    }
    return (
      <AppContainer>
        <div>
          <PublicRoute exact path="/" component={RouteMap.Signup} />
          <PublicRoute exact path="/login" component={RouteMap.Login} />
          <PrivateRoute exact path="/dashboard" component={RouteMap.Dashboard} authorized={userIsAuthorized} />
          <PrivateRoute exact path="/projects" component={RouteMap.Projects} authorized={userIsAuthorized} />
          {/* <PrivateRoute path="/settings" component={RouteMap.Settings} authorized={userIsAuthorized} /> */}
          {/* <PrivateRoute exact path="/about" component={RouteMap.About} authorized={userIsAuthorized} /> */}
          <PublicRoute exact path="/about" component={RouteMap.About} />
        </div>
      </AppContainer>

    );
  }
}


Routes.propTypes = {
  location: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
export default connect(
  (state) => ({
    auth: state.auth,
  }), null)(Routes);
