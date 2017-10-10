import React, { Component } from 'react';
import LoginForm from '../../components/LoginForm';

class Login extends Component {

  render() {
    return (
      <div className="container">
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pull-right">
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default Login;
