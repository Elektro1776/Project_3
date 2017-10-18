import React, { Component } from 'react';
import AppBar from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import { NavLink } from 'react-router-dom';
import { IconButton } from 'react-toolbox/lib/button';
import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import styles from './AltNav.css';


const MenuTest = () => (
  <IconMenu icon='explore' position='topRight' menuRipple>
    <MenuItem value='download' icon='get_app' caption='Download' />
    <MenuItem value='help' icon='favorite' caption='Favorite' />
    <MenuItem value='settings' icon='open_in_browser' caption='Open in app' />
    <MenuDivider />
    <MenuItem value='signout' icon='delete' caption='Delete' disabled />
  </IconMenu>
);


class AltNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acitve: false,
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
  }
  handleDrawerToggle() {
    this.setState({ active: !this.state.active });
  }
  render() {
    return (
      <AppBar title="uTile" >

        <IconButton icon={<MenuTest />} accent />

      </AppBar>
    );
  }
}

export default AltNavBar;
