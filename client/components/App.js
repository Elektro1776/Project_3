/*
    ./client/components/App.jsx
*/
import React, { Component } from 'react';
import Dashboard from './dashboard';

class App extends Component {
  state = {
    answer: 42,
  };

  async componentDidMount() {
    this.setState({
      answer: await this.asyncFunc(),
    });
  }
  asyncFunc = () => Promise.resolve(37);
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        {/* <h1>Hello uTile! Rawr { this.state.answer }</h1> */}
        <Dashboard />
      </div>
    );
  }
}

export default App;
