import React, { Component } from 'react';
import { connect } from 'react-redux';

import LoginForm from '../../components/LoginForm';
import styles from '../../components/LoginForm/LoginForm.css';
import PropTypes from 'prop-types';

// import image from '../../assets/utile.png'
import { logUserIn } from '../../actions/loginActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { history, successUserLogin } = nextProps;
    if (successUserLogin) {
      history.replace('/dashboard');
    }
  }
  handleChange = (value, prop) => {
    this.setState({ [prop]: value });
  };
  handleLogin = () => {
    const { email, password } = this.state;
    this.props.logUserIn(email, password);
  }
  render() {
    const { email, password } = this.state;
    return (
        <div className={styles.wrapper}>
          {/* <img src={require("../../components/LoginForm/utile.png")} className={styles.img}/> */}
          <div className={styles.box}>
            <LoginForm
              email={email}
              password={password}
              handleChange={this.handleChange}
              handleLogin={this.handleLogin}
            />
          </div>
        </div>
    );
  }
}
Login.propTypes = {
  logUserIn: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  successUserLogin: PropTypes.bool,
};
Login.defaultProps = {
  successUserLogin: false,
};
export default connect((state, ownProps) => ({
  loggingUserIn: state.login.loggingUserIn,
  successUserLogin: state.login.loggedInUser,
}), (dispatch) => ({
  logUserIn: (email, password) => dispatch(logUserIn(email, password)),
}))(Login);
