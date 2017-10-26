import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventGenerator from './Event_Generator';
import { fetchUserEvents } from '../../actions/githubActions/getEventAction';
import styles from './card_styles.css';

class EventFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
    };
  }
  componentDidMount() {
    // if (this.props.git_profile.login) {
    //   console.log(' WE SHOULD BE FETCHING THE EVENT FEED!!!!!', this.props.git_profile);
    //   this.props.fetchUserEvents(this.props.git_profile.login, this.props.git_token);
    //
    // }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.git_profile.login && nextProps.git_profile.login !== this.props.git_profile.login) {
      const { login } = nextProps.git_profile;
      // console.log(login);
      this.props.fetchUserEvents(login, nextProps.git_token);

    }
    const { events } = nextProps;
    if (events.length !== 0) {
      this.setState({ events });
    }
  }
  render() {
    if (this.state.events !== null) {
      return (
        <div>
          <div className={`row`}>
            <button className={`${styles.refreshButt} btn center-block`} onClick={()=>this.props.fetchUserEvents(this.props.git_profile.login, this.props.git_token)}><i className="material-icons pull-right" style={{color: 'black'}}>refresh</i></button>
          </div>
          <EventGenerator eventData={this.state.events} />
        </div>
      );
    }
    return (
      <div>
        <div className={styles.loaderContainer}>
          <img className={`center-block ${styles.loaderImage}`} src="./images/uTile_black_loader_100.gif" alt="loader" />
          <h1 className={styles.loaderText} style={{color:'white'}}>Loading...</h1>
        </div>
      </div>
    );
  }
}

export default connect((state, ownProps) => ({
  events: state.events.events,
  git_profile: state.auth.git_profile,
  git_token: state.auth.github_token,
}), (dispatch) => ({
  fetchUserEvents: (userId, token) => dispatch(fetchUserEvents(userId, token)),
}))(EventFeed);
