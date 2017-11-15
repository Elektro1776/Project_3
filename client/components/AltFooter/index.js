import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AltFooter extends Component {
  constructor() {
    super();
    this.state = {
    };

  }


  render() {
    const styles = {
      basic: {
        width: '100vw',
        background: '#545454',
        height: '50px',
        bottom: '0',
        position: 'fixed',
        color: 'white',
        textAlign: 'center',
        lineHeight: '44px',
      },
    };

    return (
      <div style={styles.basic}>
          <p>&#9400;Copyright 2017 uTile</p>
      </div>
    );
  }
}



export default AltFooter;
