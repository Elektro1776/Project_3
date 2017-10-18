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
    const bootStrap = 'col-xs-12';
    const styles = {
      basic: {
        width: '100vw',
        background: '#545454',
        height: '50px',
        bottom: '0',
        position: 'fixed',
        gridRowStart: 2,
        gridRowEnd: 3,
      },
      icons: {
        height: '10px',
        fontSize: 12,
        color: '#ddd',
        margin: 'auto',
        padding: '5px',

      },

    };

    return (
      <div style={styles.basic}>

        <Button icon="copyright" label="copyright 2017" className={bootStrap} style={styles.icons} />

      </div>
    );
  }
}



export default AltFooter;
