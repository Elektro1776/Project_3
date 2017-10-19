import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventGenerator from './Event_Generator';
import { fetchUserEvents } from '../../actions/githubActions/getEventAction';
import token from '../../../gittoken';

class EventFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
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
    console.log('what is our event state', this.state);
    return (
        <div>
          <EventGenerator eventData={this.state.events} />
        </div>
    );
  }
}

export default connect((state, ownProps) => ({
  events: state.events.events,
}), (dispatch) => ({
  fetchUserEvents: (userId, token) => dispatch(fetchUserEvents(userId, token)),
}))(EventFeed);
