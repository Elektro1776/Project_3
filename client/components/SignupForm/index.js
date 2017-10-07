import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import PropTypes from 'prop-types';

class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(prop, value) {
    this.setState({ [prop]: value });
  }
  render() {
    return (
      <form>
        <Input
          type="text"
          label="Name"
          name="name"
          value={this.state.name}
          onChange={(name) => this.handleChange('name', name)}
          maxLength={16}
        />
        <Input
          type="text"
          label="Email"
          value={this.state.email}
          onChange={(email) => this.handleChange('email', email)}
          maxLength={16 }
        />
        <Input
          type="password"
          value={this.state.password}
          label="Password"
          required
          onChange={(password) => this.handleChange('password', password)}
          icon={<span>J</span>}
        />
      </form>
    );
  }
}

export default SignupForm;
