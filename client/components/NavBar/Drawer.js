import React, { Component } from 'react';
import {Button} from 'react-toolbox/lib/button';
import repoData from './repodata';
import styles from '../NavBar/NavBar.css'

import Drawer from 'react-toolbox/lib/drawer';

class RepoDrawer extends React.Component {
  state = {
    active: false
  };

  handleToggle = () => {
    this.setState({active: !this.state.active});
  };

  render () {
    return (
      <div>
        <Button className={styles.repoButton} label='Repos' onClick={this.handleToggle} />
        <Drawer active={this.state.active} onOverlayClick={this.handleToggle}>

          {repoData.map((repo)=>{
        return(
          <div key={repo.id}>

            <Button className={styles.button} label={repo.name} raised ripple primary />

          </div>
        );
      })}
        </Drawer>
      </div>
    );
  }
}

export default RepoDrawer;
