import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import styles from '../LoginForm/LoginForm.css'


class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  // handleChange(prop, value) {
  //   this.setState({ [prop]: value });
  // }

  handleChange = (name, value) => {
  this.setState({...this.state, [name]: value});
};


  render() {
    return (


      <form className= {styles.form}>

        <Input
          type="text"
          label="User Name"
          name="name"
          value={this.state.name}
          onChange={this.handleChange.bind(this, 'name')} 
          maxLength={16}

        />

        <Input
          type="text"
          label="Password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange.bind(this, 'password')}
          maxLength={16}
        />

      </form>


    );
  }
}

export default LoginForm;
