
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import * as RouteMap from './static';
import AppContainer from '../containers/AppContainer';

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
        </div>
      </AppContainer>

    );
  }
}


Routes.propTypes = {
  location: PropTypes.object.isRequired,
};
export default Routes;
