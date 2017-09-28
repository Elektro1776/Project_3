/*
    ./client/components/App.jsx
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { StaticRouter } from 'react-router'

import Dashboard from './dashboard';
import About from './about'
import { meow } from '../actions/dashboardActions';
// import { BrowserRouter as Router } from 'react-router-dom';
// import createHistory from 'history/createBrowserHistory';
// const history = createHistory()

class App extends Component {
  state = {
    answer: 42,
  };

  render() {
    console.log(' WHAT ARE THE PROPS AS WE UPDATE?', this.props.home);
    return (
        // <Router history={history}>
        <div>
        <Switch>
            <Route exact path='/' component={Dashboard} />

        </Switch>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  home: state.home,
});
const bindActions = (dispatch) => ({
  meow: (test) => dispatch(meow(test)),
});
export default App;
