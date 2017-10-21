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
      <div className="container-fluid">
        <div className="row">
          <img src='./images/utile.gif' className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2" />
        </div>
        <div className="row">
          <div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-12">
            <LoginForm
              email={email}
              password={password}
              handleChange={this.handleChange}
              handleLogin={this.handleLogin}
            />
          </div>
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
