import React, { Component } from 'react';
import EventGenerator from './Event_Generator';

class EventHolder extends Component {

  render() {
    return (
        <div>
          <h1>Your Recent Events:</h1>
          <EventGenerator />
        </div>
    );
  }
}

export default EventHolder;
