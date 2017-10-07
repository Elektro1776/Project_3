import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import PropTypes from 'prop-types';

class SignupForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',

    }
  }
  handleChange() {
    
  }
  render() {
    console.log(' RENDERING INPUTS');
    return (
      <form>
          <Input type='text' label='Name' name='name' value={this.state.name} onChange={this.handleChange.bind(this, 'name')} maxLength={16 } />
          {/* <Input type='text' label='Disabled field' disabled />
          <Input type='email' label='Email address' icon='email' value={this.state.email} onChange={this.handleChange.bind(this, 'email')} />
          <Input type='tel' label='Phone' name='phone' icon='phone' value={this.state.phone} onChange={this.handleChange.bind(this, 'phone')} />
          <Input type='text' value={this.state.hint} label='Required Field' hint='With Hint' required onChange={this.handleChange.bind(this, 'hint')} icon={<span>J</span>} /> */}
      </form>
    );
  }
}

export default SignupForm;
