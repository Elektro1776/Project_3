import React, { Component } from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import { NavLink } from 'react-router-dom';
import { IconButton } from 'react-toolbox/lib/button';
import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import styles from './AltNav.css';
import NavDrawer from './drawer';



class AltNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }
  handleDrawerToggle() {
    this.setState({ active: !this.state.active });
  }
  render() {
    return (
      <AppBar title="uTile" >

        <NavDrawer active={this.state.active} handleDrawerToggle={this.handleDrawerToggle} />

      </AppBar>
    );
  }
}

export default AltNavBar;
