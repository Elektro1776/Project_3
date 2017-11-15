import React, { Component } from 'react';
import { Button } from 'react-toolbox/lib/button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Footer extends Component {
  constructor() {
    super();
    this.state = {
    };
    this.projectsButton = this.projectsButton.bind(this);
    this.dashboardButton = this.dashboardButton.bind(this);
  }

  projectsButton = () => {
    // console.log("clicked on projects paths");
  }

  dashboardButton = () => {
    // console.log("clicked on dashboard paths");
  }

  render() {
    const bootStrap = 'col-xs-4';
    const styles = {
      basic: {
        width: '100vw',
        background: '#334299',
        height: '50px',
        position: 'fixed',
        bottom: '0',
      },
      icons: {
        height: '50px',
        fontSize: 25,
        color: '#ddd',
      },
    };
    const { currentRoute } = this.props;
    // console.log(currentRoute);
    return (
      <div style={styles.basic}>
        <Button icon="search" className={bootStrap} style={styles.icons} />
        <Button icon="announcement" className={bootStrap} style={styles.icons} />
        <Button
          onClick={() => currentRoute === '/dashboard' ? this.dashboardButton() : this.projectsButton()}
          icon={currentRoute === '/dashboard' ? 'launch' : 'add_circle'}
          className={bootStrap}
          style={styles.icons}
        />
      </div>
    );
  }
}

Footer.propTypes = {
  currentRoute: PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    currentRoute: state.router.location.pathname,
  };
}
export default connect(mapStateToProps, null)(Footer);
