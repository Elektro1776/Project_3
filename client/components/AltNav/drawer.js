import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-toolbox/lib/button';
import Drawer from 'react-toolbox/lib/drawer';
import styles from './AltNav.css';
import { NavLink } from 'react-router-dom';
import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';



class NavDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  handleToggle = () => {
    this.setState({ active: !this.state.active });
  };

  render() {

    return (
      <div>
        <Button style={{color: "white"}} icon="explore" onClick={this.handleToggle} />
        <Drawer type="right" active={this.state.active} onOverlayClick={this.handleToggle}>
          {/* <MenuItem value='log in' icon='favorite' caption='log in'><NavLink to="/about"></NavLink> </MenuItem> */}

          <div className={styles.drawerOne}>
            <NavLink to="/about">ABOUT </NavLink>
          </div>
          <hr></hr>
          <div className={styles.drawerTwo}>
            <NavLink to="/login">LOGIN </NavLink>
          </div>
          <hr></hr>
        </Drawer>
      </div>
    );
  }
}

export default NavDrawer;
