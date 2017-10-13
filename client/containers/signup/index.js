import React, { Component } from 'react';
import SignupForm from '../../components/SignupForm';
import { signupUser } from '../../actions/signupActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }
  handleChange = (prop, value) => {
    console.info(' WHAT IS OUR STATE?', this.props);
    this.setState({ [prop]: value });
  }
  handleSignup = (e) => {
    e.preventDefault();
    this.props.signupUser(this.state);
  }
  componentWillReceiveProps(nextProps) {
    console.log(' WHAT ARE THE NEXTPROPS???', nextProps.isAuthenticated);
    console.log(' WHAT ARE THIS PROPS?', this.props);
    const { history } = this.props;
    if (nextProps.isAuthenticated !== this.props.isAuthenticated && nextProps.isAuthenticated) {
      history.replace('/dashboard')
    }
  }
  render() {
    const userState = this.state;
    return (
      <div className="container">
        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pull-right">
          <SignupForm
            userInfo={userState}
            handleChange={this.handleChange}
            handleSignup={this.handleSignup}
          />
        </div>
      </div>
    );
  }
}
Signup.propTypes = {
  signupUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.object,
};
function mapStateToProps(state, ownProps) {
  console.log(' WHAT IS OUR STATE in sign up ???', state);
    return {
      isAuthenticated: state.auth,
    }
}

function bindActions(dispatch) {
  return {
    signupUser: (userData) => dispatch(signupUser(userData)),
  };
}
const ConnectedSignup = connect(mapStateToProps, bindActions)(Signup)
export default ConnectedSignup;
