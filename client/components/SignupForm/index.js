import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from 'react-toolbox/lib/input';
import Dropdown from 'react-toolbox/lib/dropdown';
import { Button, IconButton } from 'react-toolbox/lib/button';
import PropTypes from 'prop-types';
import { signupUser } from '../../actions/signupActions';

class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      user_name: '',
      email: '',
      password: '',
    };
  }
  handleChange = (prop, value) => {
    this.setState({ [prop]: value });
  }
  handleSignup = (e) => {
    e.preventDefault();
    console.info(' WHAT IS OUR STATE?', this.state);
    this.props.signupUser(this.state);
  }
  render() {
    return (
      <form>
        <Input
          type="text"
          label="Name"
          name="name"
          value={this.state.user_name}
          onChange={(name) => this.handleChange('user_name', name)}
          maxLength={16}
        />
        <Input
          type="text"
          label="Email"
          name="email"
          value={this.state.email}
          onChange={(email) => this.handleChange('email', email)}
        />
        <Input
          type="password"
          value={this.state.password}
          label="Password"
          required
          onChange={(password) => this.handleChange('password', password)}
          icon={<span>J</span>}
        />
        <Button onClick={this.handleSignup} label="Sign Up" raised ripple primary />

      </form>
    );
  }
}
SignupForm.propTypes = {
  signupUser: PropTypes.func.isRequired,
};
function bindActions(dispatch) {
  return {
    signupUser: (userData) => dispatch(signupUser(userData)),
  };
}
export default connect(null, bindActions)(SignupForm);
