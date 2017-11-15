import React, { Component } from 'react';
import SignupForm from '../../components/SignupForm';
import { signupUser } from '../../actions/signupActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from "./signup.css"


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
      <div className="container-fluid" style={{backgroundColor: "black", height:750}}>
        <div className="row">

          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <img src='./images/utile.gif' className={styles.logo} />
            <h4 className={styles.title}> Your new coding bootcamp best friend. </h4>
            <h5 className={styles.text}> Bootcamps can be overwhelming. With a little help from the uTile platform
            you can stay organized, learn workflow and manage all of your tasks and projects
          in one place. With GitHub integration, your code imagination truly has no limits.  </h5>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pull-right">
            <SignupForm
              userInfo={userState}
              handleChange={this.handleChange}
              handleSignup={this.handleSignup}
            />
          </div>
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
