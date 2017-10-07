import React, { Component } from 'react';
import SignupForm from '../../components/SignupForm';

class Signup extends Component {
  render() {
    return (
      <div className="container">
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pull-right">
          <SignupForm />
        </div>
      </div>
    );
  }
}

export default Signup;
