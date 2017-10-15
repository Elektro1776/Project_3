import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import PropTypes from 'prop-types';



class SignupForm extends Component {
  render() {
    const { username, email, password } = this.props.userInfo
    return (
      <form>
        <Input
          type="text"
          label="Name"
          name="name"
          value={username}
          onChange={(name) => this.props.handleChange('username', name)}
          maxLength={16}
        />
        <Input
          type="text"
          label="Email"
          name="email"
          value={email}
          onChange={(userEmail) => this.props.handleChange('email', userEmail)}
        />
        <Input
          type="password"
          value={password}
          label="Password"
          required
          onChange={(pass) => this.props.handleChange('password', pass)}
          icon={<span>J</span>}
        />
        <Button onClick={this.props.handleSignup} label="Sign Up" raised ripple primary />

      </form>
    );
  }
}
SignupForm.propTypes = {
  userInfo: PropTypes.object,
  username: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleSignup: PropTypes.func.isRequired,
};
SignupForm.defaultProps = {
  username: '',
  userInfo: {},
  email: '',
  password: '',
};
export default SignupForm;
