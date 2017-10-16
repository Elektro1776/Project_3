import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import styles from '../LoginForm/LoginForm.css';

class LoginForm extends Component {
  render() {
    const { email, password } = this.props;
    return (
      <form className={styles.form}>
        <Input
          type="text"
          label="Email"
          name="name"
          value={email}
          onChange={(userEmail) => this.props.handleChange(userEmail, 'email')}
        />
        <Input
          type="password"
          label="Password"
          name="password"
          value={password}
          onChange={(userPassword) => this.props.handleChange(userPassword, 'password')}
        />
        <Button className={styles.button} onClick={this.props.handleLogin} label="Sign In" raised ripple primary />
      </form>


    );
  }
}

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
