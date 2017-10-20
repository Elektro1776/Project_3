import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventGenerator from './Event_Generator';
import { fetchUserEvents } from '../../actions/githubActions/getEventAction';
import token from '../../../gittoken';
import styles from './card_styles.css';

class EventFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: null,
    };
  }
  componentDidMount() {
    this.props.fetchUserEvents('901david', token);
  }
  componentWillReceiveProps(nextProps) {
    // console.info(' WHAT ARE THE NEXT PROPS,', nextProps.userRepos);
    const { events } = nextProps;
    // console.log(' WHAT IS USER REPOS', userRepos);
    if (events.length !== 0) {
      this.setState({ events });
    }
  }
  render() {
    if (this.state.events !== null) {
      return (
        <div>
          <div className={`row`}>
            <button className={`${styles.refreshButt} btn center-block`} onClick={()=>this.props.fetchUserEvents('901david', token)}><i className="material-icons pull-right" style={{color: 'black'}}>refresh</i></button>
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
}), (dispatch) => ({
  fetchUserEvents: (userId, token) => dispatch(fetchUserEvents(userId, token)),
}))(EventFeed);
