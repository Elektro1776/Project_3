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
  componentDidMount() {
    if (this.props.isAuthenticated) this.props.history.replace('/dashboard');
  }
  componentWillReceiveProps(nextProps) {
    const { history } = this.props;
    if (nextProps.isAuthenticated !== this.props.isAuthenticated && nextProps.isAuthenticated) {
      history.replace('/dashboard');
    }
  }
  handleChange = (prop, value) => {
    this.setState({ [prop]: value });
  }
  handleSignup = (e) => {
    e.preventDefault();
    this.props.signupUser(this.state);
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
  isAuthenticated: PropTypes.bool,
};
Signup.defaultProps = {
  isAuthenticated: false,
};
function mapStateToProps(state, ownProps) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

function bindActions(dispatch) {
  return {
    signupUser: (userData) => dispatch(signupUser(userData)),
  };
}
const ConnectedSignup = connect(mapStateToProps, bindActions)(Signup)
export default ConnectedSignup;
